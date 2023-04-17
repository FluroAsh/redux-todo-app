import { useState } from 'react'
import { css } from '@emotion/react'
import { useDispatch } from 'react-redux'

import type { TodoProps, TodoStatus } from '../lib/types'
import { AiOutlineClose } from 'react-icons/ai'
import { deleteTodo, toggleTodo } from '../lib/slices/todoSlice'
import { COMPLETED } from '../constants'

const TodoContainer = (status: TodoStatus) => css`
  color: black;
  display: flex;
  // TODO: Add a stacked background-image ontop of this one...
  background: linear-gradient(45deg, hsl(0, 0%, 90%), hsl(0, 0%, 50%));
  opacity: ${status === COMPLETED ? 0.5 : 1};
  width: 600px;
  padding-left: 12px;
  overflow-y: hidden;

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
  display: flex;
  align-items: center;
  padding: 15px;
  background: linear-gradient(
    45deg,
    hsla(0, 0%, 35%, 0.7),
    hsla(0, 0%, 35%, 0.3)
  );
  /* transition: 0.5s; */

  &:hover {
    background: linear-gradient(
      45deg,
      hsla(0, 0%, 70%, 0.7),
      hsla(0, 0%, 70%, 0.3)
    );
    box-shadow: 0 -5px 8px hsla(0, 0%, 30%, 0.5);

    cursor: pointer;

    > svg {
      fill: hsl(0, 0%, 100%);
    }
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
    dispatch(toggleTodo({ id, status }))
    setChecked(!checked)
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
      <button
        css={DeleteTodo}
        onClick={() => dispatch(deleteTodo({ id }))}
        type="button"
      >
        <AiOutlineClose size={20} fill="hsl(0, 0%, 80%)" />
      </button>
    </div>
  )
}
