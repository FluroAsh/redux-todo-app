import { css } from '@emotion/react'
import { useRef, useState } from 'react'
import { UUID } from 'uuidjs'
import { useDispatch } from 'react-redux'
import type { FormEvent, ChangeEvent } from 'react'

import { createTodo } from '../lib/slices/todoSlice'
import { TBC } from '../constants'

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
  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useDispatch()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (todoValue !== '') {
      const id = UUID.generate()
      dispatch(createTodo({ id, todo: todoValue, status: TBC }))
      setTodoValue('')
      inputRef.current?.focus()
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
        ref={inputRef}
      />
    </form>
  )
}
