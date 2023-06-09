export type TodoStatus = 'Completed' | 'TBC' | 'All'
export type TodoProps = { id: string; todo: string; status: TodoStatus }
export type TodosData = TodoProps[]
