import { ChevronDown, HelpCircle, ArrowRight, Search } from "lucide-react";

const guides = [
  {
    title: "How to Upload a CSV File",
    description: "Import your bank or finance data from a CSV file.",
    steps: [
      "Open Settings from the sidebar.",
      "Find the Data Source section.",
      "Click the Upload CSV File card.",
      "Choose whether to Replace existing data or Append new data.",
      "Review the imported transactions on the dashboard.",
    ],
    visualTitle: "Data Source walkthrough",
    callouts: ["Upload CSV File", "Replace / Append", "Load Demo Data"],
  },
  {
    title: "How Demo Data Works",
    description: "Use sample data to explore FinBoard without uploading your own file.",
    steps: [
      "Open Settings.",
      "Go to the Data Source section.",
      "Click Load Demo Data.",
      "Explore Dashboard, Budgets, Goals, and Insights using sample transactions.",
    ],
    visualTitle: "Demo data loading",
    callouts: ["Demo Data Card", "Load Demo Data", "Dashboard Preview"],
  },
  {
    title: "How to Add Transactions Manually",
    description: "Create income or expense entries one by one.",
    steps: [
      "Open Transactions.",
      "Select a transaction date.",
      "Choose a category.",
      "Enter a description.",
      "Select Income or Expense.",
      "Enter the amount and save the transaction.",
    ],
    visualTitle: "Manual entry form",
    callouts: ["Date Field", "Category Dropdown", "Income / Expense", "Amount", "Add Transaction"],
  },
  {
    title: "Understanding Income vs Expense",
    description: "Know how FinBoard separates money coming in and going out.",
    steps: [
      "Use Income for salary, freelance earnings, refunds, or deposits.",
      "Use Expense for shopping, bills, food, travel, and subscriptions.",
      "Review the dashboard charts to compare income and spending.",
    ],
    visualTitle: "Income and expense labels",
    callouts: ["Income", "Expense", "Monthly Summary"],
  },
  {
    title: "How Budgets Work",
    description: "Set spending limits and compare them with your actual expenses.",
    steps: [
      "Open Budgets from the sidebar.",
      "Create category-wise budget limits.",
      "Compare your spending with the budget chart.",
      "Adjust your budget based on actual spending patterns.",
    ],
    visualTitle: "Budget tracking",
    callouts: ["Category", "Budget Limit", "Spent Amount", "Comparison Chart"],
  },
  {
    title: "How Goals Work",
    description: "Track financial goals such as savings, travel, or emergency funds.",
    steps: [
      "Open Goals.",
      "Add a goal name and target amount.",
      "Track progress visually.",
      "Update your goal as you save more.",
    ],
    visualTitle: "Goal management",
    callouts: ["Goal Name", "Target Amount", "Progress"],
  },
  {
    title: "Understanding Insights",
    description: "Use analytics to understand spending trends and financial patterns.",
    steps: [
      "Open Insights.",
      "Review spending charts and summaries.",
      "Compare income, expenses, and monthly trends.",
      "Use observations to make better financial decisions.",
    ],
    visualTitle: "Insights dashboard",
    callouts: ["Charts", "Trends", "Key Observations"],
  },
  {
    title: "Managing Profile & Settings",
    description: "Manage preferences, currency, data source, and account settings.",
    steps: [
      "Open Settings.",
      "Update currency and preferences.",
      "Upload CSV or load demo data.",
      "Clear data only when you are sure.",
    ],
    visualTitle: "Settings management",
    callouts: ["Currency", "Data Source", "Clear Data"],
  },
];

function VisualGuide({ title, callouts }) {
  return (
    <div
      className="mt-5 rounded-2xl border p-4 overflow-hidden"
      style={{
        borderColor: "var(--color-fin-border)",
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--color-fin-accent) 8%, transparent), transparent)",
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-semibold text-[var(--color-fin-text)]">{title}</p>
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-fin-muted)]">
          Visual Guide
        </span>
      </div>

      <div
        className="relative rounded-xl border p-4 min-h-44"
        style={{ borderColor: "var(--color-fin-border)" }}
        aria-label={`${title} annotated walkthrough`}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {callouts.map((callout, index) => (
            <div
              key={callout}
              className="relative rounded-xl border px-4 py-3 text-sm font-semibold text-[var(--color-fin-text)]"
              style={{
                borderColor:
                  index === 0
                    ? "var(--color-fin-accent)"
                    : "var(--color-fin-border)",
                boxShadow:
                  index === 0
                    ? "0 0 0 3px color-mix(in srgb, var(--color-fin-accent) 18%, transparent)"
                    : "none",
              }}
            >
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-fin-accent)] text-xs font-bold text-white">
                {index + 1}
              </span>
              {callout}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--color-fin-muted)]">
          <ArrowRight size={16} className="text-[var(--color-fin-accent)]" />
          Highlighted controls show the order users should follow.
        </div>
      </div>
    </div>
  );
}

export default function HelpCenter() {
  return (
    <main className="p-4 md:p-8 space-y-6">
      <section className="theme-card p-6 rounded-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <HelpCircle className="text-[var(--color-fin-accent)]" />
              <h1 className="text-2xl font-bold text-[var(--color-fin-text)]">
                Help Center / User Guide
              </h1>
            </div>
            <p className="text-[var(--color-fin-muted)]">
              Learn how to use FinBoard with beginner-friendly guides,
              visual callouts, and step-by-step walkthroughs.
            </p>
          </div>

          <div
            className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm text-[var(--color-fin-muted)]"
            style={{ borderColor: "var(--color-fin-border)" }}
          >
            <Search size={16} />
            Search guides visually from this hub
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {guides.map((guide, index) => (
          <details key={guide.title} className="theme-card rounded-2xl p-5 group">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-[var(--color-fin-text)]">
              <span>
                {index + 1}. {guide.title}
              </span>
              <ChevronDown
                className="transition-transform group-open:rotate-180"
                size={18}
              />
            </summary>

            <p className="mt-3 text-sm text-[var(--color-fin-muted)]">
              {guide.description}
            </p>

            <ol className="mt-4 space-y-2 text-sm text-[var(--color-fin-muted)] list-decimal list-inside">
              {guide.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            <VisualGuide title={guide.visualTitle} callouts={guide.callouts} />
          </details>
        ))}
      </section>
    </main>
  );
}