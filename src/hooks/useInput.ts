import * as React from 'react';

export const useInput = (
  initialValue?: string | undefined
): [string, (e: any) => void, React.Dispatch<React.SetStateAction<string>>] => {
  if (!initialValue) initialValue = '';
  const [value, setValue] = React.useState(initialValue);
  const handleOnChange = React.useCallback((e: any) => {
    setValue(e.target.value);
  }, []);

  return [value, handleOnChange, setValue];
};

export default useInput;
