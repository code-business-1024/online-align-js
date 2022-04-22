import { useState, useEffect, useMemo, useLayoutEffect } from 'react';

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return [{ value, onChange: (e) => setValue(e.target.value) }, () => setValue(initialValue)];
};

export const useInputs = (initalValues) => {
  const [value1, setValue1] = useState();
};

export const useListenerKey = () => {
  const [, forceRender] = useState();
  useEffect(() => {
    window.addEventListener('keydown', forceRender);
    // console.log('xxx');
    return () => window.removeEventListener('keydown', forceRender);
  }, [,]);
};
