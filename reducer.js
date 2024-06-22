// Three core concepts of Redux - store, action, reducer

// Store - holds the state of the application
// Action - payload that triggers a state change
// Reducer - function that takes the current state and an action, and returns a new state
// Dispatch - function that sends an action to the reducer
// Subscribe - function that listens for state changes
// Unsubscribe - function that stops listening for state changes

// config redux in js file
const redux = require("redux");
const createStore = redux.createStore;

// helper function to bind the actions into an object with same keys
const bindActionCreators = redux.bindActionCreators;

//  define constant for action type
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTORED = "CAKE_RESTORED";

// create action
function orderCake() {
  return {
    type: "CAKE_ORDERED",
    payload: 1,
  };
}

function restoreCake(qty = 1) {
  return {
    type: "CAKE_RESTORED",
    payload: qty,
  };
}

// create initial state for cake
const cakeInitialState = {
  noOfCakes: 10,
  flavour: "redVelvet",
};

// create reducer -> state(initialState), action
const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case "CAKE_ORDERED":
      return {
        ...cakeInitialState,
        noOfCakes: state.noOfCakes - 1,
      };
    case "CAKE_RESTORED":
      return {
        ...cakeInitialState,
        noOfCakes: state.noOfCakes + action.payload,
      };
    default:
      return state;
  }
};

// create redux store
const store = createStore(cakeReducer); // passed reducer here bcz it holds the state of the app
console.log("Initial State ", store.getState());

// create subscriber for registering listners
const unsubscribe = store.subscribe(() =>
  console.log("Update State ", store.getState())
);

// dispatch action to reducer
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(restoreCake(3));

// alterenate way using bindActionCreators (not recommended now)
const actions = bindActionCreators({ orderCake, restoreCake }, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restoreCake(3);

unsubscribe();
