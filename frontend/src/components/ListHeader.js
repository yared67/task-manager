import React from 'react';
import  Modal from './Modal'
import {useState} from 'react'
import { useCookies} from 'react-cookie'

const ListHeader = ({ listName,getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
   const [showModal, setShowModal] = useState(false)

  const signOut = () => {
    console.log('signout');
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md shadow-md w-full flex justify-between items-center border-b border-gray-700">
      <h1 className="text-white text-2xl ">{listName}</h1>
      <div className="flex items-center">
        <button className="mx-1 text-xs px-4 py-2 rounded-lg bg-transparent border border-gray-400 text-white hover:bg-gray-700" onClick={() => setShowModal(true)}>
          ADD NEW </button>
        <button
          className="mx-1 text-xs  px-4 py-2 rounded-lg bg-transparent border border-gray-400 text-white hover:bg-red-700"
          onClick={signOut}
        > SIGN OUT</button>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
    </div>
  );
};

export default ListHeader;
