import { useState } from 'react'
import { css } from '@emotion/react'
import { useDispatch } from 'react-redux'

import type { TodoProps, TodoStatus } from '../lib/types'
import { AiOutlineClose } from 'react-icons/ai'
import { deleteTodo, toggleTodo } from '../lib/slices/todoSlice'
import { COMPLETED, TBC } from '../constants'

import Checkmark from './Checkmark'

const TodoContainer = (status: TodoStatus) => css`
  color: black;
  display: flex;
  max-width: 100%;
  // TODO: Add a stacked background-image ontop of this one...
  background: linear-gradient(45deg, hsl(0, 0%, 90%), hsl(0, 0%, 50%));
  opacity: ${status === COMPLETED ? 0.5 : 1};
  padding-left: 12px;
  overflow-y: hidden;

  > div,
  label {
    padding: 18px 0;
    user-select: none;
  }

  input[type='checkbox'] {
    display: none;
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
  align-items: center;
  flex: 1 1 auto;

  > div {
    word-wrap: break-all;
    flex: 1 1 auto;
    margin-right: 5px;
  }
`

export const Todo: React.FC<TodoProps> = ({ id, todo, status }) => {
  const [checked, setChecked] = useState<boolean>(status === COMPLETED)
  const dispatch = useDispatch()

  const handleCheckboxChange = () => {
    dispatch(toggleTodo({ id, status }))
    setChecked(!checked)
  }

  return (
    <div css={TodoContainer(status)}>
      <label css={TodoLabel} htmlFor={`${id}-todo`}>
        <Checkmark checked={checked} />
        <input
          id={`${id}-todo`}
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        {/* TODO: Text Area (edit)*/}
        <div>{todo}</div>
        {/* <div>{status}</div> */}
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
