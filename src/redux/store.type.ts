import { Action, AnyAction, Dispatch } from "redux";

import reducers from "./reducers";

export type AppState = ReturnType<typeof reducers>;

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}
