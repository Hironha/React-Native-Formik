import { useState, useCallback } from "react";

import { getNextFocusState, setFocusStateByKey } from "./util";

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

export const useAutofocus = <T extends GenericFocusInput>(
  initialState: T
): [T, (key: keyof T) => void, () => void] => {
  const [focusState, setFocusState] = useState(initialState);

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
