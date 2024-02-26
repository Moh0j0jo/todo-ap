import Auth from "./components/auth";
import { useState, useEffect } from "react";
import { db } from './config/firebase-config'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Footer from './components/Footer'
import './App.css'
import Checkbox from "./components/Checkbox";


const App = () => {

  const [todoList, settodoList] = useState([])
  const [checkedState, setCheckedState] = useState({});
  const [ title, setTitle ] = useState('')
  const todoListRef = collection(db, 'todoList')
  const [count, setCount] = useState(0); 
  const [booleanFieldValue, setBooleanFieldValue] = useState(null);
  const [ isDark, setIsDark ] = useState(true)


  const getTodoList = async () => {
    try {
      const data = await getDocs(todoListRef)
     
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), id: doc.id,
      }))

      settodoList(filteredData)
      setCount(data.docs.length)
    } catch (err) {
      console.error(err);
    }
  }

  const updateBooleanField = async (itemId) => {
   
      const itemRef = doc(db,'todoList',  itemId);
      setBooleanFieldValue(itemRef.done);
      
      updateDoc(itemRef,{
        done: !booleanFieldValue
      } )

      setBooleanFieldValue(!booleanFieldValue);
    }

  const handleCheckboxChange = (itemId) => {
      setCheckedState((prevState) => ({
        ...prevState,
        [itemId]: !prevState[itemId] // Toggle the checked state
      })    
    );
    
    updateBooleanField(itemId);
  };

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
      setTitle('')
    } catch (err) { console.error('ezaz' + err) }
  }

  const ToggleTheme = () =>{
    setIsDark(!isDark)
  }

  useEffect(() => {
    getTodoList();
  }, [])



  return (

    <div className="App" data-theme={ isDark ? "dark" : "light"}>
      <Auth />
      <nav>
        <div className="header">
          <h1>TODO</h1>
          <div className="icon"
            onClick={ToggleTheme}>
            {isDark ? 
              <svg xmlns="http://www.w3.org/2000/svg" 
                width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z" />
              </svg>
            :
              <svg xmlns="http://www.w3.org/2000/svg" 
                width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/>
              </svg>
            }




          </div>
        </div>

        <div className="task-input">

          <input
            type="text"
            value = {title}
            placeholder="Create a new todo ..."
            onChange={e=> setTitle(e.target.value)}
          />

          <button className="submit-button"
            onClick={onSubmitTask}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z" /><path fill="#fff" d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z" />
            </svg>
          </button>

        </div>
      </nav>

      <ul className="task-list">
      {todoList.map((todoItem) => (
        <div 
          key={todoItem.id}
          className="list-item"
        >
          <Checkbox
            index={todoItem.id} 
            title={todoItem.title}
            id={todoItem.id}
            checked={!!checkedState[todoItem.id]}          
               // Pass checked state as prop
            onChange={() => handleCheckboxChange(todoItem.id)} // Pass onChange handler
          />
          <button
            className='delete-button'
            onClick={() => deleteTask(todoItem.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg>
        </button>
        </div>
      ))}
        <div 
          className="summary">
          <p>{`${count}  items left`}</p>
          <button>Clear Completed</button>
        </div>
      </ul>

      <Footer />
    </div>


  );
}

export default App;