import type { GenericFocusInput } from "../index";

type GenericFocusInputEntry = [string, boolean];

const getNextFocusedKey = (focusStateEntries: GenericFocusInputEntry[]) => {
  const focusedIndex = focusStateEntries.findIndex(([_key, value]) => value === true);

  const isLastFocus = focusedIndex === focusStateEntries.length - 1;
  const nextFocusedIndex = focusedIndex + 1;

  return isLastFocus ? null : focusStateEntries[nextFocusedIndex][0];
};

const clearFocusState = (focusStateEntries: GenericFocusInputEntry[]) => {
  const cleanEntries = focusStateEntries.map(([key]) => [key, false]);

  return Object.fromEntries(cleanEntries);
};

export const setFocusStateByKey = <T extends GenericFocusInput>(
  focusStateEntries: GenericFocusInputEntry[],
  focusKey: keyof T
) => {
  const settedFocusStateEntries = focusStateEntries.map(([key, value]) =>
    key === focusKey ? [key, true] : [key, false]
  );

  return Object.fromEntries(settedFocusStateEntries);
};

export const getNextFocusState = <T extends GenericFocusInput>(focusState: T) => {
  const focusStateEntries = Object.entries(focusState);
  const nextFocusedKey = getNextFocusedKey(focusStateEntries);

  if (nextFocusedKey === null) return clearFocusState(focusStateEntries);

  return setFocusStateByKey(focusStateEntries, nextFocusedKey);
};
