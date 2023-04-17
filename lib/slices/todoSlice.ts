import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TodoProps, TodoStatus } from '../types'

export interface ITodoState {
  todos: TodoProps[] | []
}

const initialState: ITodoState = {
  todos: []
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    initializeTodos: (state) => {
      const data = localStorage.getItem('todos')
      if (!data) return

      const todos = JSON.parse(data)
      state.todos = todos
    },
    createTodo: (state, action: PayloadAction<TodoProps>) => {
      const newTodo = action.payload
      const requiredKeys = ['id', 'todo', 'status']

      try {
        const hasRequiredKeys = Object.keys(newTodo).every((key) =>
          requiredKeys.includes(key)
        )

        if (!hasRequiredKeys)
          throw Error(
            'ERROR: Looks like the payload contains invalid keys. Contact a developer if you think this is a bug'
          )

        localStorage.setItem('todos', JSON.stringify([...state.todos, newTodo]))
        state.todos = [...state.todos, newTodo]
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    },
    toggleTodo: (
      state,
      action: PayloadAction<Pick<TodoProps, 'id' | 'status'>>
    ) => {
      try {
        const toggledStatus: TodoStatus =
          action.payload.status === 'TBC' ? 'Completed' : 'TBC'
        const todoIndex = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        )

        if (todoIndex === -1) {
          throw Error('ERROR: No todo that matches that id found.')
        }

        const updatedTodo = {
          ...state.todos[todoIndex],
          status: toggledStatus
        }

        // Update the Redux state first to maintain the correct todo order, THEN overwrite localStorage todos...
        state.todos[todoIndex] = updatedTodo
        localStorage.setItem('todos', JSON.stringify(state.todos))
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    },
    updateTodo: (state, action) => {
      // takes an id (todo.id -> comes from the UI)
      // if todo exists (.find((todo.id) => todo.id === id))
      // then update
      // else return
    },
    deleteTodo: (state, action) => {
      // find the todo by id
      // remove from local storage
      // remove from state
    },
    filterTodos: (state, action) => {
      // get todos by status (filter) -> todo.status === (status)
    }
  }
})

export const {
  initializeTodos,
  createTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
  filterTodos
} = todoSlice.actions
export default todoSlice.reducer
