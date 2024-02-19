import Auth from "./components/auth";
import { useState, useEffect } from "react";
import { db } from './config/firebase-config'
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import Footer from './components/Footer'
import './App.css'
import Checkbox from "./components/Checkbox";


const App = () => {

  const [todoList, settodoList] = useState([])
  const [ title, setTitle ] = useState('')
  const todoListRef = collection(db, 'todoList')
  const [count, setCount ] = useState(0)

  const getTodoList = async () => {
    try {
      const data = await getDocs(todoListRef)
     
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), id: doc.id,
      }))

      settodoList(filteredData)
      setCount(filteredData.length)
    } catch (err) {
      console.error(err);
    }

  }

  const deleteTask = async (id) => {
    const movieDoc = doc(db, "todoList", id)
    await deleteDoc(movieDoc)
    getTodoList();
  }

  const onSubmitTask = async () => {
    try {
      await addDoc(todoListRef, {
        title: title,
        done: false
      })
      getTodoList();
      setTitle()
    } catch (err) { console.error('ezaz' + err) }
  }

  useEffect(() => {
    getTodoList();
  }, [])



  return (

    <div className="App">
      <Auth />
      <nav>
        <div className="header">
          <h1>TODO</h1>
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z" />
            </svg>
          </div>
        </div>

        <div className="task-input">

          <input
            type="text"
            value = {title}
            placeholder="Create a new todo ..."
            onChange={(e) => setTitle(e.target.value)}
          />

          <button className="submit-button"
            onClick={onSubmitTask}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z" /><path fill="#fff" d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z" />
            </svg>
          </button>

        </div>
      </nav>

      <ul className="task-list">
        {todoList.map((item) => (

          <li key={item.id} className="list-item">
            <Checkbox index={item.id} count ={count} title={item.title}/>
             <button
              className='delete-button'
              onClick={() => deleteTask(item.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg>
            </button>
          </li>
        ))}
      </ul>


      <Footer />
    </div>


  );
}

export default App;