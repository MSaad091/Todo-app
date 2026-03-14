import React, { useEffect, useState } from 'react'
import { allTodos, deleteTodo } from '../api';
import { useNavigate } from 'react-router-dom';
import '../Stylesheets/AllTodo.css';  // CSS import

function AllTodo() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleGetTodo = async () => {
    try {
      const request = await allTodos();
      setData(request.data)
      setLoading(false)
      console.log(request.data);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const handledelete = async (id) => {
    try {
      const request = await deleteTodo(id)
      setData(data.filter((todo) => todo._id !== id))
      console.log(request.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleupdate = (id) => {
    navigate(`/update/${id}`)
  }

  useEffect(() => {
    handleGetTodo();
  }, [])

  if (loading) {
    return (
      <div className="all-todo-container">
        <div className="loading">Loading todos...</div>
      </div>
    )
  }

  return (
    <div className="all-todo-container">
      <h1>All Todos</h1>

      {data.length === 0 ? (
        <div className="no-todos">
          No todos found. Create your first todo!
        </div>
      ) : (
        data.map((item) => (
          <div key={item._id} className="todo-card">
            <div className="todo-content">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
            <div className="todo-actions">
              <button 
                className="edit-btn"
                onClick={() => handleupdate(item._id)}
              >
                Edit
              </button>
              <button 
                className="delete-btn"
                onClick={() => handledelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default AllTodo