import {useState} from 'react'
import TickIcon  from './TickIcon' 
import ProgressBar from './ProgressBar'
import Modal from './Modal'




const ListItem = ({ task, getData}) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
            method: 'DELETE',
        });
        if (response.status === 200) {
          getData(); 
        
        }
    } catch (err) {
        console.error('Error deleting todo:', err);
    }
};

  return (
    <li className="w-full my-2.5 flex rounded-lg shadow justify-between">
      <div className="flex items-center">
      <TickIcon />
        <p className="text-xl ">{task.title}</p>
        <ProgressBar progress = {task.progress} task={task} />
      </div> 
      <div className="flex">
        <button
          className="px-2 py-1 text-xs rounded-lg bg-transparent border border-gray-400 hover:bg-green-700"
          onClick={() => setShowModal(true)}> EDIT</button>
        <button className="px-2 py-1 text-xs rounded-lg bg-transparent border border-gray-400 hover:bg-red-700" onClick={deleteItem} >
          DELETE </button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData = {getData} task ={task} />}
    </li>
  );
};

export default ListItem;

