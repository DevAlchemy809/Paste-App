import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function localTimeZone(time) {
      const date = new Date(time)
      const localDateTime = date.toLocaleString();
      return localDateTime;
}

const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'React Share Example',
        text: 'Check out this awesome content!',
        url: window.location.href,
      })
      .then(() => console.log('Successfully shared'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Share feature not supported on this device/browser.');
    }
  };

  const styles = {
    page: {
      minHeight: '91vh',
      backgroundColor: '#121212',
      color: '#f0f0f0',
      padding: '40px 80px 0',
      boxSizing: 'border-box'
    },
    searchInput: {
      width: '100%',
      padding: '10px',
      marginBottom: '20px',
      borderRadius: '6px',
      border: '1px solid #333',
      backgroundColor: '#1e1e1e',
      color: '#fff',
      fontSize: '16px'
    },
    card: {
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#1a1a1a',
      width: '100%'
    },
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px'
    },
    title: {
      fontSize: '24px',
      margin: 0
    },
    buttonsContainer: {
      display: 'flex',
      gap: '10px'
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#1f1f1f',
      color: '#fff',
      border: '1px solid #444',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      flex: '1'
    },
    contentPreview: {
      whiteSpace: 'pre-wrap',
      fontSize: '15px',
      color: '#ccc',
      marginBottom: '10px'
    },
    dateText: {
      fontSize: '14px',
      color: '#888'
    }
  };

  return (
    <div style={styles.page}>
      <input
        type="search"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredData.length > 0 ? (
          filteredData.map((paste) => {
            const preview =
              paste.content.length > 100
                ? paste.content.slice(0, 400) + '...'
                : paste.content;

            return (
              <div key={paste._id} style={styles.card}>
                <div style={styles.headerRow}>
                  <h1 style={styles.title}>{paste.title}</h1>
                  <div style={styles.buttonsContainer}>
                    <button style={styles.button}>
                      <a href={`/?pasteId=${paste?._id}`}> Edit</a>
                    </button>
                    <button style={styles.button}>
                       <a href={`/pastes/${paste?._id}`}> 
                          View
                       </a>
                    </button>
                    <button
                      style={styles.button}
                      onClick={() => handleDelete(paste._id)}
                    >
                      Delete
                    </button>

                    <button style={styles.button}
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content)
                        toast.success('Clipboard copied!')
                      }}>
                      Copy
                    </button>
                    {/* homework: share button ka logic */}
                    <button style={styles.button} onClick={handleShare}>Share</button>
                  </div>
                </div>
                <p style={styles.contentPreview}>{preview}</p>
                <div style={styles.dateText}>{localTimeZone(paste.createdAt)}</div>
              </div>
            );
          })
        ) : (
          <p>No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
