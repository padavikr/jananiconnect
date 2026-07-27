const steps = [
  { id: 1, label: "Personal" },
  { id: 2, label: "Health" },
  { id: 3, label: "Location" },
  { id: 4, label: "Preferences" },
];

type ProgressIndicatorProps = {
  currentStep: number;
};

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-medium text-foreground/70">
          Step {currentStep} of {steps.length}
        </span>
        <span className="font-semibold text-lavender-600">
          {Math.round(progress)}% complete
        </span>
      </div>

      <div className="relative h-2 overflow-hidden rounded-full bg-lavender-100">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-lavender-500 to-pink-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? "bg-gradient-to-br from-lavender-500 to-pink-400 text-white shadow-md shadow-lavender-200/50"
                    : isCurrent
                      ? "border-2 border-lavender-400 bg-white text-lavender-600 shadow-sm ring-4 ring-lavender-100"
                      : "border border-lavender-100 bg-lavender-50/50 text-foreground/30"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`text-center text-xs font-medium transition-colors ${
                  isCurrent
                    ? "text-lavender-600"
                    : isCompleted
                      ? "text-foreground/60"
                      : "text-foreground/35"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
