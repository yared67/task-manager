import { useState } from 'react';
import TickIcon from './TickIcon';
import ProgressBar from './ProgressBar';
import Modal from './Modal';

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(`https://task-manager-ej4g.onrender.com/todos/${task.id}`, {
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
    <li className="w-full my-2.5 p-4 flex flex-col sm:flex-row rounded-lg shadow justify-between items-start sm:items-center bg-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <TickIcon />
          <p className="text-lg sm:text-xl">{task.title}</p>
        </div>
        <ProgressBar progress={task.progress} task={task} />
      </div>

      <div className="flex mt-4 sm:mt-0 space-x-2 w-full sm:w-auto justify-between sm:justify-end">
        <button
          className="w-full sm:w-auto px-2 py-1 text-xs rounded-lg bg-transparent border border-gray-400 hover:bg-green-700"
          onClick={() => setShowModal(true)}
        >
          EDIT
        </button>
        <button
          className="w-full sm:w-auto px-2 py-1 text-xs rounded-lg bg-transparent border border-gray-400 hover:bg-red-700"
          onClick={deleteItem}
        >
          DELETE
        </button>
      </div>

      {showModal && (
        <Modal
          mode={'edit'}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </li>
  );
};

export default ListItem;
