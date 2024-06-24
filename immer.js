// IMMER -  library that simplifies updating states when there are more nested states

const { createStore } = require("redux")
const produce =  require('immer').produce

// create nested state
const initialState = {
    name: "Alex ",
    address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
    }
}


// define constant for action type
const STREET_UPDATED = "STREET_UPDATED"


// action creator that returns action object
function update_street (street){
    return {
        type: STREET_UPDATED,
        payload: street
    }
}


// create reducer
const reducer = (state = initialState, action) => {
    switch (action.type){
        case "STREET_UPDATED":
        // return {
        //     ...state,
        //     address: {
        //         ...state.address,
        //         street: action.payload
        //     }

        // }
        return produce (state,(draft) => {
            draft.address.street = action.payload
        })
        default:
            return state
    }
}

// create store
const store = createStore(reducer)
console.log("Initial State ", store.getState())

const unsubscribe = store.subscribe(() => {
    console.log("Updated State ", store.getState())
})
store.dispatch(update_street('456 Main St'))

unsubscribe()