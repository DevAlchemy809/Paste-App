// import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';
// import { addToPastes, updateToPastes } from '../pasteSlice';
// import { useEffect } from 'react';
import toast from 'react-hot-toast';

const ViewPaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];
  const styles = {
      button: {
      padding: '5px 20px',
      backgroundColor: 'green',
      color: '#fff',
      border: '1px solid #444',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '17px',
      
    }
  }
  return (
    <div className="min-h-[calc(100vh-66px)] bg-gray-900 text-white flex items-center justify-center px-2 py-0">
      <div className="w-full max-w-[70%] space-y-3">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            spellCheck={false}
            placeholder="Title"
            value={paste.title}
            disabled
            // onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-3 text-lg bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
           <button style={styles.button} onClick={() => { navigator.clipboard.writeText(paste?.content) 
              toast.success('Clipboard copied!')
        }}>
            Copy
        </button>
        </div>
        <textarea
          spellCheck={false}
          value={paste.content}
          // onChange={(e) => setValue(e.target.value)}
          rows={18}
          disabled
          className="w-full p-4 text-base bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 resize-none"
          placeholder="Enter your text here..."
        />
      </div>
    </div>
  )
}

export default ViewPaste
