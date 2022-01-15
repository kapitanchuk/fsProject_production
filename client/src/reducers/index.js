import { combineReducers,applyMiddleware } from "redux";
import userReducer from "./userReducer.js";
import { createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import familyReducer from "./familyReducer.js";
import UIreducer from "./UIreducer.js";
import optionsReducer from "./optionsReducer.js";

const rootReducer = combineReducers({
    user:userReducer,
    family:familyReducer,
    UI:UIreducer,
    options:optionsReducer
})


export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
