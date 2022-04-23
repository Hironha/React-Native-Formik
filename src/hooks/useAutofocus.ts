import { useState, useCallback } from "react";

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
