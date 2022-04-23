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

type GenericInput = {
  [key: string]: boolean;
};

export const useAutofocus = <T extends GenericInput>(
  initialState: T
): [T, (key: keyof T) => void, () => void] => {
  const [focusState, setFocusState] = useState(initialState);

  const getNextFocusedState = useCallback((focusState: T) => {
    const getNextFocusedIndex = (entriesLength: number, focusedIndex: number) => {
      if (focusedIndex === -1) return 0;
      if (focusedIndex === entriesLength - 1) return null;
      return focusedIndex + 1;
    };

    const entries = Object.entries(focusState);
    const focusedIndex = entries.findIndex((entry) => entry[1] === true);
    const nextIndex = getNextFocusedIndex(entries.length, focusedIndex);

    if (nextIndex === null) {
      entries[entries.length - 1][1] = false;
    } else {
      entries[nextIndex][1] = true;
    }

    return Object.fromEntries(entries) as T;
  }, []);

  const focusNext = useCallback(() => {
    setFocusState((prevState) => getNextFocusedState(prevState));
  }, [getNextFocusedState]);

  const setFocus = useCallback((key: keyof T) => {
    setFocusState((prev) => {
      const entries = Object.entries(prev);

      return Object.fromEntries(
        entries.map((entry) => (entry[0] === key ? [entry[0], true] : [entry[0], false]))
      ) as T;
    });
  }, []);

  return [focusState, setFocus, focusNext];
};
