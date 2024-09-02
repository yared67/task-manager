import { useState } from 'react';
import { useCookies } from 'react-cookie';

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookies] = useCookies(null);
  const editMode = mode === 'edit';
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 50,
    date: editMode ? new Date(task.date) : new Date(),
    
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://task-manager-ej4g.onrender.com/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log(response);
      setShowModal(false);
      getData();
    } catch (err) {
      console.error('Error posting todo:', err);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://task-manager-ej4g.onrender.com/todos/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error('Error editing todo:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      editData(e);
    } else {
      postData(e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start py-8">
      <div className="w-11/12 sm:w-3/4 lg:w-1/2 p-4 bg-white shadow-custom rounded-md">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{`Let's ${mode} your task`}</h3>
          <button className="text-lg font-bold text-red-700" onClick={() => setShowModal(false)}>
            x
          </button>
        </div>

        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            className="w-full py-2 px-3 my-2 border rounded-lg"
            required
            maxLength={30}
            placeholder="New task goes here"
            name="title"
            value={data.title }
            onChange={handleChange}
          />
          <label htmlFor="range" className="mt-4">Drag to select your current progress</label>
          <input
            className="w-full my-2"
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <button
            className="w-full py-2 mt-4 rounded-lg bg-green-700 text-white hover:bg-green-800"
            type="submit"
          >
            {mode === 'edit' ? 'Edit' : 'Add'} Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
