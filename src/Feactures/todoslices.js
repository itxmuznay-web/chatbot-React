import {createslices,nanoid} from "@reduxjs/toolkit"
const initialState={
    todos:[
        {
            id:1,
            text:"learn Redux Toolkit",
            completed:false
        },
         {
            id:2,
            text:"Buy Milk",
            completed:false,
        }
    ]
}
export const todoSlices=createslices({
    name:"todos",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            console.log("payload",action.payload);
            const todo={
                id:nanoid(),
                text:action.payload,
                completed:false,
            };
            state.todos.push(todo);
        },
        removeTodo:( state,action)=>{
            state.todos=state.todos.filter((todo)=>todo.id!==action.payload);

        },
    },
});
export const {addTodo,removeTodo}=todoSlices.action;
export default todoSlices.reducer;