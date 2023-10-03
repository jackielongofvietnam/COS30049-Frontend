import React, { useState } from 'react';
import UploadForm from './UploadForm';
import HistoryPage from './HistoryPage';

function App() {
  // By default, the page is Upload
  // History is initialized as an empty array
  const [currentPage, setCurrentPage] = useState('upload');
  const [uploadHistory, setUploadHistory] = useState([]);

  // this function handles appending file info to the upload history array
  const handleSubmit = (fileInfo) => {
    setUploadHistory([...uploadHistory, fileInfo]);
  };

  // this function works like a navigator
  const renderPage = () => {
    switch (currentPage) {
      case 'upload':
        return <UploadForm onSubmit={handleSubmit}/>;
      case 'history':
        return <HistoryPage historyArray={uploadHistory}/>;
      default:
        return null;
    }
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('upload')}>Upload Image</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('history')}>Uploaded History</button>
          </li>
        </ul>
      </nav>

      {renderPage()}
    </div>
  );
}

export default App;