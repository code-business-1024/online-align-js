import { useState, useEffect, useMemo, useLayoutEffect } from 'react';

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return [{ value, onChange: (e) => setValue(e.target.value) }, () => setValue(initialValue)];
};

export const useInputs = (initalValues) => {
  const [value1, setValue1] = useState();
};

export const useListenerKey = () => {
  const [state, setState] = useState();
  useEffect(() => {
    window.addEventListener('keydown', setState(true));
    // console.log();
    return () => window.removeEventListener('keydown', setState(false));
  }, [,]);
};

export const useListenerFocusElement = () => {
  useEffect(() => {
    // console.log(document.activeElement);
  });
};
