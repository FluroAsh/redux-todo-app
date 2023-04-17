import type { NextPage } from 'next'
import Head from 'next/head'
import { css } from '@emotion/react'

import { Suspense } from 'react'

import { Todos } from '../components/Todos'
import { TodoField } from '../components/TodoField'

const pageContainer = css`
  background-color: hsl(200, 30%, 20%);
  /* padding: 0 2rem; */
`

const mainContainer = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding: 4rem 0; */
`

const todosContainer = css`
  max-width: 900px;
`

const Home: NextPage = () => {
  return (
    <div css={pageContainer}>
      <Head>
        <title>Redux Todo Filtering</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainContainer}>
        <div css={todosContainer}>
          <TodoField />
          <Todos />
          <div
            style={{
              width: 600,
              height: 30,
              background: '#fff',
              marginTop: 12,
              color: '#000'
            }}
          >
            Filters
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
