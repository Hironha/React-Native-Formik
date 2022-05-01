import { useState, useCallback } from "react";

/*
  ** Considerações **
  1 -> Este é um hook criado para utilizar junto ao componente InputTextFormik. Sua função é basicamente
    focar o próximo Input ao selecionar Next ou Confirmado do keyboard;
  
  2 -> Este hook depende da ordem dos dados passados pro initialState, então tenha certeza de
    passar a ordem correta dos inputs para que funcione corretamente;

  3 -> Existe uma função auxiliar retornada pelo hook, o setFocus. Essa função torna possível setar um
    input para focus, independente do input atual;

  4 -> Para que funcione corretamente, passe um estado inicial, isto é, um objeto da forma { inputName: boolean, ... };
    na ordem em que os inputs são declarados no JSX.
*/

export type GenericFocusInput = {
  [key: string]: boolean;
};

type GenericFocusInputEntry = [string, boolean];

const getNextFocusedKey = (focusStateEntries: GenericFocusInputEntry[]) => {
  const focusedIndex = focusStateEntries.findIndex(([_key, value]) => value === true);

  const isLastFocus = focusedIndex === focusStateEntries.length - 1;
  const nextFocusedIndex = focusedIndex + 1;

  return isLastFocus ? null : focusStateEntries[nextFocusedIndex][0];
};

const setFocusStateByKey = <T extends GenericFocusInput>(
  focusStateEntries: GenericFocusInputEntry[],
  focusKey: keyof T
) => {
  const settedFocusStateEntries = focusStateEntries.map(([key, value]) =>
    key === focusKey ? [key, true] : [key, false]
  );

  return Object.fromEntries(settedFocusStateEntries);
};

const clearFocusState = (focusStateEntries: GenericFocusInputEntry[]) => {
  const cleanEntries = focusStateEntries.map(([key]) => [key, false]);

  return Object.fromEntries(cleanEntries);
};

export const useAutofocus = <T extends GenericFocusInput>(
  initialState: T
): [T, (key: keyof T) => void, () => void] => {
  const [focusState, setFocusState] = useState(initialState);

  const getNextFocusState = useCallback((focusState: T) => {
    const focusStateEntries = Object.entries(focusState);
    const nextFocusedKey = getNextFocusedKey(focusStateEntries);

    if (nextFocusedKey === null) return clearFocusState(focusStateEntries);

    return setFocusStateByKey(focusStateEntries, nextFocusedKey);
  }, []);

  const focusNext = useCallback(() => {
    setFocusState((prevFocusState) => getNextFocusState(prevFocusState));
  }, [getNextFocusState]);

  const setFocus = useCallback((focusStateKey: keyof T) => {
    setFocusState((prevFocusState) => {
      const entries = Object.entries(prevFocusState);

      return setFocusStateByKey(entries, focusStateKey) as T;
    });
  }, []);

  return [focusState, setFocus, focusNext];
};
