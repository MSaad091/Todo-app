import React, { useEffect, useState } from 'react'
import { getsingletodo, updatetodo } from '../api'
import { useParams, useNavigate } from 'react-router-dom'
import '../Stylesheets/Update.css'

function Update() {

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()

    // Update Todo
    const updateTodo = async (e) => {
        e.preventDefault()

        try {
            const data = { title, text }
            const request = await updatetodo(id, data)
            console.log(request.data)

            // Update hone ke baad todos page par wapas
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    // Get single todo
    const handlegetsingleTodo = async() => {
        try {
            const res = await getsingletodo(id)
            console.log(res.data);
            setText(res.data.todo.text)
            setTitle(res.data.todo.title)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handlegetsingleTodo();
    },[])

    return (
        <div className="update-container">

            <h1>Update Todo</h1>

            <form onSubmit={updateTodo}>

                <label>Enter Title</label>
                <input
                    type="text"
                    value={title}
                    placeholder="Enter Your Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label>Enter Text</label>
                <input
                    type="text"
                    value={text}
                    placeholder="Enter Your Text"
                    onChange={(e) => setText(e.target.value)}
                    required
                />

                <button type="submit">Update</button>

            </form>

        </div>
    )
}

export default Update