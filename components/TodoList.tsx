import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'

import type { RootState } from '../lib/store'
import type { TodoProps, TodoStatus } from '../lib/types'
import { ALL } from '../constants'

import { Todo } from './Todo'
import { TodoFilter } from './TodoFilter'
import { initializeTodos } from '../lib/slices/todoSlice'

const TodosContainer = css`
  > div:first-of-type {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  > div:not(:first-of-type) {
    margin-top: 3px;
  }

  > div:last-of-type {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`

const NoTodosContainer = css`
  border-radius: 5px;
  background: hsl(0, 0%, 100%);
  color: hsl(0, 0%, 10%);
  padding: 18px 0;
  text-align: center;
`

const NoTodosMessage = ({ filter }: { filter: TodoStatus }) => {
  if (filter === ALL) {
    return <div css={NoTodosContainer}>Add some todos...</div>
  } else {
    return <div css={NoTodosContainer}>No todos found...</div>
  }
}

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todoSlice.todos)

  const [filter, setFilter] = useState<TodoStatus>(ALL)
  const filteredTodos =
    filter === ALL ? todos : todos.filter((todo) => todo.status === filter)

  const noTodos = !todos.length || !filteredTodos.length
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeTodos())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div css={TodosContainer}>
        {filteredTodos?.map(({ id, todo, status }: TodoProps) => (
          <Todo key={id} id={id} todo={todo} status={status} />
        ))}
      </div>
      {noTodos && <NoTodosMessage filter={filter} />}
      <TodoFilter filter={filter} setFilter={setFilter} />
    </>
  )
}
