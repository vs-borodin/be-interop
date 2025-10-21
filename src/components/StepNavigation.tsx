import { useStepNavigation } from '../hooks/useStepNavigation';

export function StepNavigation() {
  const { goToStep } = useStepNavigation();

  const steps = [
    { number: 1, title: 'Define a data fetching method in a service' },
    { number: 2, title: 'DataList options and initial state' },
    { number: 3, title: 'Understand the DataList contract, query and updaters' },
    { number: 4, title: 'Component Integration' },
    { number: 5, title: 'Integration with Data Grid' },
    { number: 6, title: 'Debug Mode' },
  ];

  return (
    <div className="sticky top-4 z-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Navigation</h3>
      <div className="flex flex-wrap gap-2">
        {steps.map((step) => (
          <button
            key={step.number}
            onClick={() => goToStep(step.number)}
            className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-colors"
          >
            {step.number}. {step.title}
          </button>
        ))}
      </div>
    </div>
  );
}
