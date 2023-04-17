import { useState } from 'react'
import { css } from '@emotion/react'
import { TodoStatus } from './Todos'
import { TodoProps } from '../lib/types'
import { useDispatch } from 'react-redux'
import { toggleTodo, updateTodo } from '../lib/slices/todoSlice'

const TodoContainer = (status: TodoStatus) => css`
  color: black;
  display: flex;
  background: linear-gradient(45deg, hsl(0, 0%, 100%), hsl(0, 0%, 50%));
  opacity: ${status === 'Completed' ? 0.5 : 1};
  width: 600px;
  padding-left: 12px;

  > div,
  label {
    padding: 18px 0;
    user-select: none;
  }

  label > div {
    flex: 1 1 100%;
  }

  label:hover,
  input:hover {
    cursor: pointer;
  }
`

const DeleteTodo = css`
  all: unset;
  padding: 12px;

  &:hover {
    cursor: pointer;
  }
`

const TodoLabel = css`
  display: flex;
  flex-grow: 1;

  > div {
    flex: 1 1 auto;
  }
`

export const Todo: React.FC<TodoProps> = ({ id, todo, status }) => {
  const [checked, setChecked] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleCheckboxChange = () => {
    // dispatch update to todo item in state
    // update in local storage
    dispatch(toggleTodo({ id, status }))
    setChecked(!checked)
  }

  const handleRemove = () => {
    // dispatch update to todo item in state
    // update in local storage
  }

  return (
    <div css={TodoContainer(status)}>
      <input
        id={`${id}-todo`}
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <label css={TodoLabel} htmlFor={`${id}-todo`}>
        {/* TODO: Text Area (edit)*/}
        <div>{todo}</div>
        <div>{status}</div>
      </label>
      <button css={DeleteTodo} onClick={handleRemove} type="button">
        X
      </button>
    </div>
  )
}
