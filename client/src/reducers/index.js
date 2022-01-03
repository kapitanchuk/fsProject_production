import { combineReducers,applyMiddleware } from "redux";
import userReducer from "./userReducer.js";
import { createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import familyReducer from "./familyReducer.js";

const rootReducer = combineReducers({
    user:userReducer,
    family:familyReducer
})


export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
