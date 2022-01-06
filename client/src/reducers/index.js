import { combineReducers,applyMiddleware } from "redux";
import userReducer from "./userReducer.js";
import { createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import familyReducer from "./familyReducer.js";
import UIreducer from "./UIreducer.js";

const rootReducer = combineReducers({
    user:userReducer,
    family:familyReducer,
    UI:UIreducer
})


export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
