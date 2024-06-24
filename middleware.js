// MiddleWare - suggested way to extend redux with custom functionalities
// - if we want to execute some functions before executing reducers and after dispatch then we use middlewares
// - example: logging, performing asyn tasks

const redux = require("redux");
const axios = require("axios");
const thunkMiddleware = require("redux-thunk").thunk;

// redux methods
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.createStore;

// async action using middleware
const initialState = {
  loading: false,
  users: [],
  error: "",
};

// action types
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEDED = "FETCH_USERS_SUCCEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

// action creators
function fetch_user_request() {
  return {
    type: FETCH_USERS_REQUESTED,
  };
}
function fetch_user_success(users) {
  return {
    type: FETCH_USERS_SUCCEDED,
    payload: users,
  };
}
function fetch_user_fail(error) {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
}

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEDED:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILED:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

//  Thunk action creator
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetch_user_request());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.username);
        dispatch(fetch_user_success(users));
      })
      .catch((error) => {
        dispatch(fetch_user_fail(error.message));
      });
  };
};

// store with middleware
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// subscribe to store updates
store.subscribe(() => console.log(store.getState()));

// dispatch fetchUsers acction
store.dispatch(fetchUsers());

// using unsubscribe it stopes the execution and doesn't give any store updates
// unsubscribe();
