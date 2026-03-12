import React, { useState } from 'react'
import { todoCreate } from '../api'
import { toast } from "react-toastify"
import '../Stylesheets/todo.css'
import { useNavigate } from 'react-router-dom'

function Todo() {
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handletodo = async (e) => {
    e.preventDefault()

    if (!title) {
      toast.error("Title is required")
      return
    }
    if (!text) {
      toast.error("Text is required")
      return
    }

    setLoading(true)

    try {
      const data = { title, text }
      const response = await todoCreate(data)

      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/')
        setTitle("")
        setText("")
      }

      console.log(response.data)

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="todo-container">
      <h1>Create Todo</h1>

      <form onSubmit={handletodo}>
        <label>Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
        />

        <label>Text</label>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo description"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Todo"}
        </button>
      </form>
    </div>
  )
}

export default Todo