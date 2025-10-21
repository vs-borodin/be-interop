import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useStepNavigation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  // Get step from URL on mount and when URL changes
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const stepNumber = parseInt(stepParam, 10);
      if (stepNumber >= 1 && stepNumber <= 6) {
        setCurrentStep(stepNumber);
        // Scroll to the step after a short delay to ensure DOM is ready
        setTimeout(() => {
          scrollToStep(stepNumber);
        }, 100);
      }
    }
  }, [searchParams]);

  const scrollToStep = (stepNumber: number) => {
    const stepElement = stepRefs.current[stepNumber - 1];
    if (stepElement) {
      stepElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const goToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= 6) {
      setCurrentStep(stepNumber);
      setSearchParams({ step: stepNumber.toString() });
      scrollToStep(stepNumber);
    }
  };

  const copyStepLink = (stepNumber: number) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('step', stepNumber.toString());
    
    navigator.clipboard.writeText(currentUrl.toString()).then(() => {
      // You could add a toast notification here
      console.log('Link copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy link:', err);
    });
  };

  const setStepRef = (stepNumber: number) => (element: HTMLElement | null) => {
    stepRefs.current[stepNumber - 1] = element;
  };

  return {
    currentStep,
    goToStep,
    copyStepLink,
    setStepRef,
    scrollToStep
  };
}
