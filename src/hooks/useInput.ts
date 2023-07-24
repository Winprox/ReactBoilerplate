import { ChangeEvent, useCallback, useReducer } from 'react';

enum Actions {
  INPUT,
  BLUR,
  RESET
}

type ActionType = { type: Actions; val?: string };
type StateType = { val: string; touched: boolean };
const dState: StateType = { val: '', touched: false };

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case Actions.INPUT:
      return { ...state, val: action.val ?? '' };
    case Actions.BLUR:
      return { ...state, touched: true };
    default:
      return dState;
  }
};

export const useInput = (validate: (val: string) => boolean, defaultVal?: string) => {
  const [state, dispatch] = useReducer(reducer, { val: defaultVal ?? '', touched: false });
  const { val: value, touched } = state;
  const valid = validate(value);
  const hasError = !valid && touched;

  const setValue = useCallback((v: string) => dispatch({ type: Actions.INPUT, val: v }), []);
  const resetState = useCallback(() => dispatch({ type: Actions.RESET }), []);
  const onBlur = useCallback(() => dispatch({ type: Actions.BLUR }), []);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: Actions.INPUT, val: e.target.value }),
    []
  );

  return {
    value,
    touched,
    valid,
    hasError,
    setValue,
    resetState,
    handlers: { onBlur, onChange }
  };
};
