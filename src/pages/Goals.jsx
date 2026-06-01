import React from "react";
import { DataContext } from "../context/AppContext";
import { useModal } from "../context/ModalContext";

export default function Goals() {
  const { transactions, currency } = React.useContext(DataContext);
  const { showModal } = useModal();

  const [goals, setGoals] = React.useState(() => {
    const saved = localStorage.getItem("savingsGoals");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = React.useState({
    name: "",
    target: "",
    deadline: "",
  });

  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("savingsGoals", JSON.stringify(goals));
  }, [goals]);

  const totalSavings = transactions?.reduce((acc, t) => {
    return acc + Number(t.Amount);
  }, 0) || 0;

  const avgMonthlySavings = React.useMemo(() => {
    if (!transactions || transactions.length === 0) return 0;
    const months = {};
    transactions.forEach((t) => {
      const [day, month, year] = t.Date.split("/");
      const key = `${year}-${month}`;
      months[key] = (months[key] || 0) + Number(t.Amount);
    });
    const values = Object.values(months);
    return values.reduce((a, b) => a + b, 0) / values.length;
  }, [transactions]);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!form.name || !form.target || !form.deadline) return;

    const newGoal = {
      id: Date.now(),
      name: form.name,
      target: Number(form.target),
      deadline: form.deadline,
    };

    setGoals([...goals, newGoal]);
    setForm({ name: "", target: "", deadline: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    showModal({
      type: "confirm",
      message: "Are you sure you want to delete this goal?",
      onConfirm: () => {
        setGoals(goals.filter((g) => g.id !== id));
      },
    });
  };

  const getProgress = (target) => {
    if (totalSavings <= 0) return 0;
    return Math.min((totalSavings / target) * 100, 100);
  };

  const getMonthsLeft = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const months =
      (end.getFullYear() - now.getFullYear()) * 12 +
      (end.getMonth() - now.getMonth());
    return Math.max(0, months);
  };

  const getMonthlyNeeded = (target, deadline) => {
    const months = getMonthsLeft(deadline);
    if (months === 0) return target - totalSavings;
    return Math.max(0, (target - totalSavings) / months);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-fin-text">
            Savings Goals
          </h1>
          <p className="text-sm text-fin-muted mt-1">
            Track your financial targets
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-fin-accent px-5 py-2.5 text-sm font-black uppercase text-black"
        >
          {showForm ? "Cancel" : "+ New Goal"}
        </button>
      </div>

      {/* ADD GOAL FORM */}
      {showForm && (
        <div className="w-full rounded-[24px] border border-fin-border bg-[#141414] p-6">
          <h2 className="text-fin-accent font-black uppercase tracking-widest text-lg mb-6">
            New Goal
          </h2>
          <form onSubmit={handleAddGoal} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-fin-muted">
                Goal Name
              </label>
              <input
                type="text"
                placeholder="e.g. New Laptop"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-fin-border bg-fin-surface p-4 text-fin-text"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-fin-muted">
                Target Amount ({currency.symbol})
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 50000"
                value={form.target}
                onChange={(e) => setForm({ ...form, target: e.target.value })}
                className="w-full rounded-xl border border-fin-border bg-fin-surface p-4 text-fin-text"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-fin-muted">
                Target Date
              </label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="w-full rounded-xl border border-fin-border bg-fin-surface p-4 text-fin-text"
                required
              />
            </div>
            <div className="md:col-span-3">
              <button
                type="submit"
                className="rounded-xl bg-fin-accent px-7 py-3 font-black uppercase text-black"
              >
                Add Goal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CURRENT SAVINGS BANNER */}
      <div className="w-full rounded-[24px] border border-fin-success/20 bg-[#0a1a12] p-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-fin-muted">
            Current Total Savings
          </p>
          <p className="text-3xl font-black text-fin-success mt-1">
            {currency.symbol}{totalSavings.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-widest text-fin-muted">
            Avg Monthly Savings
          </p>
          <p className={`text-xl font-black mt-1 ${avgMonthlySavings >= 0 ? "text-fin-success" : "text-fin-error"}`}>
            {currency.symbol}{Math.abs(avgMonthlySavings).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>

      {/* GOALS LIST */}
      {goals.length === 0 ? (
        <div className="w-full rounded-[24px] border border-fin-border bg-[#141414] p-12 flex flex-col items-center text-center">
          <p className="text-4xl mb-4">🎯</p>
          <h2 className="text-fin-text font-black uppercase tracking-wider text-xl mb-2">
            No Goals Yet
          </h2>
          <p className="text-fin-muted text-sm">
            Click "+ New Goal" to set your first savings target.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => {
            const progress = getProgress(goal.target);
            const monthsLeft = getMonthsLeft(goal.deadline);
            const monthlyNeeded = getMonthlyNeeded(goal.target, goal.deadline);
            const isAchieved = totalSavings >= goal.target;

            return (
              <div
                key={goal.id}
                className="w-full rounded-[24px] border border-fin-border bg-[#141414] p-6 space-y-4 hover:border-fin-accent/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-fin-text font-black uppercase tracking-wider">
                      {goal.name}
                    </h3>
                    <p className="text-xs text-fin-muted mt-1">
                      Target: {currency.symbol}{goal.target.toLocaleString()} · Due {new Date(goal.deadline).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(goal.id)}
                    className="text-fin-muted hover:text-red-400 transition-colors text-xs uppercase font-bold"
                  >
                    Delete
                  </button>
                </div>

                {/* PROGRESS BAR */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-fin-muted">
                    <span>{progress.toFixed(1)}% saved</span>
                    <span>{currency.symbol}{Math.min(totalSavings, goal.target).toLocaleString()} / {currency.symbol}{goal.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-fin-border">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        isAchieved ? "bg-fin-success" : "bg-fin-accent"
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* INSIGHTS */}
                {isAchieved ? (
                  <p className="text-fin-success text-xs font-bold uppercase tracking-wider">
                    🎉 Goal Achieved!
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-fin-surface p-3">
                      <p className="text-xs text-fin-muted uppercase tracking-wider">Months Left</p>
                      <p className="text-fin-text font-black text-lg">{monthsLeft}</p>
                    </div>
                    <div className="rounded-xl bg-fin-surface p-3">
                      <p className="text-xs text-fin-muted uppercase tracking-wider">Need/Month</p>
                      <p className="text-fin-accent font-black text-lg">
                        {currency.symbol}{monthlyNeeded.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}