import React from "react";
import { Provider, connect } from "react-redux";
import { Dispatch, createStore, Action } from "redux";

// #########################################################################
//  Action definitions
// #########################################################################

type ActionTypes = 'ADD' | 'DISPLAY';
  
type Actions = { type: 'ADD'; amount: number } | { type: 'DISPLAY'; prefix: string };

// #########################################################################
//  State
// #########################################################################

interface State {
  count: number;
  display: string;
}
const initialState = { count: 0, display: "" };

// #########################################################################
//  Reducer
// #########################################################################

function reducer(state: State | undefined = initialState, action: Action<ActionTypes> & Actions): State {
  switch (action.type) {
    case 'ADD':
      return { ...state, count: state.count + action.amount };
    case 'DISPLAY':
      return { ...state, display: action.prefix + ": " + state.count };
  }
  return state;
}

// #########################################################################
//  Counter component
// #########################################################################

function renderCounter(props: { dispatch: Dispatch<Actions> }): React.ReactElement {
  const add = (): Action<ActionTypes> => props.dispatch({ type: 'ADD', amount: 2 });
  const display = (): Action<ActionTypes> => props.dispatch({ type: 'DISPLAY', prefix: "The count" });
  return (
    <div>
      <button onClick={add}>Add</button>
      <button onClick={display}>Show result</button>
    </div>
  );
};

const Counter = connect()(renderCounter); // default: Dispatch is being mapped to props as dispatch.

// #########################################################################
//  DisplayMessage component
// #########################################################################
function mapDisplayMessageToProps (state: State) {
  return { displayMessage: state.display };
} 

function renderDisplayMessage({ displayMessage }:{displayMessage:string}):React.ReactElement {
  return <div>{displayMessage}</div>;
};

const DisplayMessage = connect(mapDisplayMessageToProps)(renderDisplayMessage);

// #########################################################################
//  App
// #########################################################################

const store = createStore(reducer);

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter />
        <DisplayMessage />
      </div>
    </Provider>
  );
}

export default App;
