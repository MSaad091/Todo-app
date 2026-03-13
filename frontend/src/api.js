import axios from 'axios'


const api = axios.create({
    baseURL:"https://todo-app-oohs.onrender.com/user",
    withCredentials:true
})

export const Registeruser = (data) => api.post('/register',data) 
export const Loginuser = (data) => api.post('/login',data)
export const  todoCreate = (data) => api.post('/create',data)
export const allTodos = () => api.get('/all-todo')
export const deleteTodo = (id) => api.delete(`/delete/${id}`)
export const updatetodo = (id,data) => api.put(`/update/${id}`,data)
export const getsingletodo = (id) => api.get(`/todo/${id}`)
export const LogOut = () => api.post(`/logout`)