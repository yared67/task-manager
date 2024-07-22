import { useState } from 'react'
import { useCookies} from 'react-cookie'

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookies,setCookie, removeCookie] = useCookies(null)
  const editMode = mode === 'edit'

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date()
  })

  const postData = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:4000/todos`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      console.log(response)
      setShowModal(false)
      getData()
    } catch (err) {
      console.error(err)
    }
  }

  const editData = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:4000/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.status ===200){

        setShowModal(false)
      getData()
      }
     
      
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editMode) {
      editData(e)
    } else {
      postData(e)
    }
  }

  return (
    <div className="absolute left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-1/2 p-[40px] bg-white shadow-custom rounded-md">
        <div className="flex space-x-40">
          <h3 className="bold-font border-none bg-transparent">Let's {mode} your task</h3>
          <button className="border-none bg-transparent hover:bg-red-700" onClick={() => setShowModal(false)}>x</button>
        </div>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            className="py-3 px-4 my-3 rounded-lg border border-solid border-green-400"
            required
            maxLength={30}
            placeholder="new task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className="px-2 py-1 text-xs rounded-lg bg-transparent border border-gray-400 hover:bg-green-700"
            type="submit"
            value={editMode ? 'Update Task' : 'Add Task'}
          />
        </form>
      </div>
    </div>
  )
}

export default Modal
