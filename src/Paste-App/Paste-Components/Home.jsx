import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../pasteSlice';
import { useEffect } from 'react';

const Home = () => {  
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes)

  useEffect(() => {
    if(pasteId) {
        const paste = allPastes.find((p) => p._id === pasteId);
        setTitle(paste.title);
        setValue(paste.content);
    }
   }, [pasteId])


  const createPaste = () => {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update paste
      dispatch(updateToPastes(paste));
    } else {
      //create new paste
      dispatch(addToPastes(paste));
    }
    //after creation or updation
    setTitle('');
    setValue('');
    setSearchParams({});
  };

  return (
    <div className="min-h-[calc(100vh-66px)] bg-gray-900 text-white flex items-center justify-center px-2 py-0">
      <div className="w-full max-w-[70%] space-y-3">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            spellCheck={false}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-3 text-lg bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <button
            onClick={createPaste}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-lg rounded-xl transition cursor-pointer"
          >
            {pasteId ? 'Update Paste' : 'Create Paste'}
          </button>
        </div>
        
        <textarea
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={18}
          className="w-full p-4 text-base bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 resize-none"
          placeholder="Enter your text here..."
        />
      </div>
    </div>
  );
};

export default Home;
