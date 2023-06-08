'use client'

import { useRef, useEffect, useState } from 'react';

const MyComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('')
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
    }
  }, [text]);

  return (
    <div>
      <button onClick={() => setText('haha')}>Click</button>
      <input ref={inputRef} type="text" value="12345" />
    </div>
  );
};

export default MyComponent;
