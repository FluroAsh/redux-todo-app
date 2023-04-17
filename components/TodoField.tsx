import { css } from '@emotion/react'
import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { UUID } from 'uuidjs'
import { useDispatch } from 'react-redux'
import { createTodo } from '../lib/slices/todoSlice'

const TodoForm = css`
  display: flex;

  > input[type='text'] {
    flex: 1 1 auto;
    height: 40px;
    margin-bottom: 12px;
    padding: 0 8px;
    border: none;
    outline: none;
    box-shadow: 3px 3px 8px hsl(0, 0%, 20%);
    border-radius: 5px;

    &:focus {
      outline: 2px solid hsl(200, 80%, 50%);
    }
  }
`

export const TodoField = () => {
  const [todoValue, setTodoValue] = useState<string>('')

  const dispatch = useDispatch()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (todoValue !== '') {
      const id = UUID.generate()
      dispatch(createTodo({ id, todo: todoValue, status: 'TBC' }))
      setTodoValue('')
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTodoValue(event.target.value)

  return (
    <form onSubmit={handleSubmit} css={TodoForm}>
      <input
        id="todo-input"
        placeholder="Create a new todo..."
        value={todoValue}
        onChange={handleChange}
        autoComplete="false"
        type="text"
      />
    </form>
  )
}
