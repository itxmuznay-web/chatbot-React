import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Feactures/todoslices";
 export const store= configureStore({
    reducer:{
        todos: todoReducer,
    },
 }) 