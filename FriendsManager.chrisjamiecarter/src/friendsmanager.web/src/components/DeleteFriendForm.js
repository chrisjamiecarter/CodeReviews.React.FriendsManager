import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { deleteFriendThunk } from '../redux/friendsSlice';

const DeleteFriendForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const friends = useSelector((state) => state.friends.data);
  
  const { id } = useParams();
  const getFriend = () => {
    const index = friends.findIndex(friend => friend.id === id);
    if (index !== -1) {
        return friends[index];
    }
  }
  const friend = getFriend();

  if (!friend) {
    return (
      <div className="w-full text-white bg-red-500">
        <div className="container flex items-center justify-center px-6 py-4 mx-auto">
          <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
          </svg>

          <p className="mx-3">Invalid friend ID</p>
        </div>
      </div>
    );
  }
  
  const handleCancel = () => {
    navigate('/');
  };

  const handleDelete = () => {
    dispatch(deleteFriendThunk(friend.id));
    navigate('/');
  };

  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
        
      <h2 className="text-lg font-semibold text-gray-700 capitalize">Delete Friend</h2>
                       
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div className='col-span-full'>
              <label className="text-gray-700" htmlFor="name">Name</label>
              <input id="name" type="text" name="name" value={friend.name} readOnly className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none read-only:bg-gray-100" />
          </div>

          <div>
              <label className="text-gray-700" htmlFor="category">Category</label>
              <input id="category" type="text" name="category" value={friend.category.name} readOnly className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none read-only:bg-gray-100" />
          </div>

          <div>
              <label className="text-gray-700" htmlFor="desiredContactFrequency">Desired Contact Frequency</label>
              <input id="desiredContactFrequency" type="text" name="desiredContactFrequency" value={friend.desiredContactFrequency} readOnly className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none read-only:bg-gray-100" />
          </div>

      </div>

      <div className="flex gap-1 mt-6">
        <button type="submit" onClick={handleDelete} className="w-28 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-400">Delete</button>
        <button type='button' onClick={handleCancel} className="w-28 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Cancel</button>
      </div>

    </section>
  );
};

export default DeleteFriendForm;
