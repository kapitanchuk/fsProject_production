import { combineReducers,applyMiddleware } from "redux";
import userReducer from "./userReducer.js";
import { createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    user:userReducer
})


export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
