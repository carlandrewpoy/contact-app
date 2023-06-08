import { useEffect, useRef } from 'react';

export const useAutoSelectInput = (params: boolean): React.RefObject<HTMLInputElement> => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      const inputLength = inputRef.current.value.length;
      inputRef.current.type = 'text';
      inputRef.current.setSelectionRange(inputLength, inputLength);
      // inputRef.current.select();
    }
  }, [params]);

  return inputRef;
}

export const useAutoSelectInputNumber = (params: boolean): React.RefObject<HTMLInputElement> => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [params]);

  return inputRef;
};
