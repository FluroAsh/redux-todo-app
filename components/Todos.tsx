import { Todo } from './Todo'
import { css } from '@emotion/react'
import type { TodosData, TodoProps } from '../lib/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import { initializeTodos } from '../lib/slices/todoSlice'
import { useEffect } from 'react'

const todosContainer = css`
  div:first-of-type {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  div:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  > div:not(:first-of-type) {
    margin-top: 3px;
  }
`

const addTodos = css`
  border-radius: 5px;
  background: hsl(0, 0%, 100%);
  color: hsl(0, 0%, 0%);
  padding: 8px;
  text-align: center;
`

export const Todos = () => {
  const { todos } = useSelector((state: RootState) => state.todoSlice)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeTodos())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!todos.length) {
    return <div css={addTodos}>Add some todos...</div>
  }

  return (
    <div css={todosContainer}>
      {todos?.map(({ id, todo, status }: TodoProps) => (
        <Todo key={id} id={id} todo={todo} status={status} />
      ))}
    </div>
  )
}
