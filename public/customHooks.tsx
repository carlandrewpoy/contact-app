import { useEffect, useRef } from 'react';

export const useAutoSelectInput = (params: boolean): React.RefObject<HTMLInputElement> => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      const inputLength = inputRef.current.value.length;
      inputRef.current.setSelectionRange(inputLength, inputLength);
      // inputRef.current.select();
    }
  }, [params]);

  return inputRef;
}

export const useAutoSelectButton = (params: boolean): React.RefObject<HTMLButtonElement> => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && buttonRef.current) {
        buttonRef.current.focus();
      }
    };

    if (buttonRef.current) {
      buttonRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [params]);

  return buttonRef;
};




