// Multiple Reducers - used to manage different parts of the application state
// - each reducer is responsible for its own state and cann't make changes into another reducer's state

// config redux in js file
const redux = require("redux");

//  define constant for action type
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTORED = "CAKE_RESTORED";

// crate actions for cake 
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


//  create actions for ice cream
function orderIcecream() {
    return {
      type: "ICECREAM_ORDERED", 
      payload: 1,
    };
  }
  
  function restoreIcecream(qty = 1) {
    return {
      type: "ICECREAM_RESTOCKED",
      payload: qty,
    };
  }



// create initial state for cake
const cakeInitialState = {
  noOfCakes: 10,
  flavour: "redVelvet",
};

//  create another state for ice cream
const icecreamInitialState = {
  noOfIceCream : 20,
  flavour : "Chocolate"
}

// create reducer for cake
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

// creating another reducer for ice cream
const iceCreamReducer = (state = icecreamInitialState , action) => {
  switch (action.type){
    case "ICECREAM_ORDERED":
      return{
        ...icecreamInitialState,
        noOfIceCream : state.noOfIceCream - 1
      }
      case "ICECREAM_RESTOCKED":
        return{
          ...icecreamInitialState,
          noOfIceCream : state.noOfIceCream + action.payload
        }
        default:
          return state
  }
    
}


// combine the multiple reducers
const rootReducer =  redux.combineReducers({
  cake: cakeReducer,
  icecream : iceCreamReducer

})


// create combinedStore for both of them
const combinedStore = redux.createStore(rootReducer)
console.log("Initial Store ", combinedStore.getState())

// create subscriber
const unsubscribe = combinedStore.subscribe(() =>
  console.log("Update State ", combinedStore.getState())
);

// dispatch action to reducer
combinedStore.dispatch(orderCake());
combinedStore.dispatch(orderCake());
combinedStore.dispatch(orderCake());
combinedStore.dispatch(restoreCake(3));

combinedStore.dispatch(orderIcecream());
combinedStore.dispatch(orderIcecream());
combinedStore.dispatch(restoreIcecream(10));

unsubscribe();
