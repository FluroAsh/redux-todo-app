import React from 'react'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import { ALL, COMPLETED, TBC } from '../constants'
import { TodoStatus } from '../lib/types'

const TodoFilterContainer = css`
  display: flex;
  justify-content: center;
  gap: 15px;
  max-width: 100%;
  padding: 5px;
  background: #fff;
  margin-top: 12px;
  color: #000;

  > button {
    height: 30px;
    min-width: 100px;
  }
`

const FilterButton = (active: boolean) => css`
  height: 30px;
  min-width: 100px;
  color: ${active && '#000'};
  background-color: ${active && 'hsl(0, 0%, 80%)'};
`

export const TodoFilter = ({
  filter,
  setFilter
}: {
  filter: TodoStatus
  setFilter: (status: TodoStatus) => void
}) => {
  const statuses: TodoStatus[] = [ALL, COMPLETED, TBC]

  return (
    <div css={TodoFilterContainer}>
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          css={FilterButton(filter === status)}
        >
          {status}
        </button>
      ))}
    </div>
  )
}
