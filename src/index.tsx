import React, {Fragment, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
/* 
type xxx 类型变量，便于在组件中使用, type是对某种类型的引用, 类型在<>中
interface是创建一个新的类型， 可以直接写在<>中
interface可以扩展， 但是type不可以
：代表返回值的类型
viod代表没有返回值
*/
type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: string,
  complete: boolean
}
//ITodo2扩展了ITodo
interface ITodo2 extends ITodo {
  tags: string[]
}

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  const handleSubmit = (e:FormElem):void => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  const addTodo = (text: string):void => {
    const newTodos: ITodo[] = [...todos, {text, complete: false}]
    setTodos(newTodos)
  }
  
  const completeTodo = (index: number):void => {
    const newTodos: ITodo[] = todos.slice();
          newTodos[index].complete = !newTodos[index].complete
          setTodos(newTodos)
  }
  const removeTodo = (index:number):void => {
    const newTodos: ITodo[] = todos.slice();
    newTodos.splice(index, 1);
    setTodos(newTodos)

  }
  return (
    <Fragment>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} required />
        <button type="submit">Add Todo</button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => {
          return (
                    <Fragment key={index}>
                      <div style={{ textDecoration: todo.complete ? 'line-through' : '' }}>{todo.text}</div>
                      <button type="button" onClick={() => completeTodo(index)}>
                        {' '}
                        {todo.complete ? 'Incomplete' : 'Complete'}
                      </button>
                      <button type='button' onClick={() => removeTodo(index)}>X</button>
                    </Fragment>
                )
        })}
      </section>
    </Fragment>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
