export type StateInput = {
  single: string;
  popper: string;
};

export type Suggestion = {
  label: string;
}

export interface AutoSelect {
  suggestions: Suggestion[];
  stateInput: StateInput;
  setStateInput: Function;
}
