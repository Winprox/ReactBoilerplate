import { useCallback, useReducer, ChangeEvent } from 'react';
import './useInput';

enum Actions {
  INPUT,
  BLUR,
  RESET,
}

type ActionType = { type: Actions; value?: string };
type StateType = { value: string; touched: boolean };
const defaultState: StateType = { value: '', touched: false };

const inputReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case Actions.INPUT:
      return { ...state, value: action.value ?? '' };
    case Actions.BLUR:
      return { ...state, touched: true };
    default:
      return defaultState;
  }
};

export const useInput = (
  validate: (value: string) => boolean,
  defaultValue?: string
) => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: defaultValue ?? '',
    touched: false,
  });

  const value = state.value;
  const valid = validate(value);
  const touched = state.touched;
  const hasError = !valid && touched;

  const blurHandler = useCallback(() => dispatch({ type: Actions.BLUR }), []);
  const resetHandler = useCallback(() => dispatch({ type: Actions.RESET }), []);
  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: Actions.INPUT, value: e.target.value }),
    []
  );
  const setValue = useCallback(
    (value: string) => dispatch({ type: Actions.INPUT, value: value }),
    []
  );

  return {
    value,
    setValue,
    valid,
    hasError,
    touched,
    changeHandler,
    blurHandler,
    resetHandler,
  };
};
