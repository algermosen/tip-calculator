import { useState } from 'react';

export function useInput(initialValue: number | null) {
  const [value, setValue] = useState<number | null>(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return {
    value: value ?? 0,
    onChange: handleChange,
    reset: () => setValue(null),
  };
}