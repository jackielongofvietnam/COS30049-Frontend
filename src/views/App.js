import React, { useState } from 'react';
import UploadForm from './UploadForm';
import HistoryPage from './HistoryPage';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Toolbar } from '@mui/material';
import Login from './Login';

function App() {
  // By default, the page is Upload
  // History is initialized as an empty array
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('upload');
  const [uploadHistory, setUploadHistory] = useState([]);

  // this function handles appending file info to the upload history array
  const handleSubmit = (fileInfo) => {
    setUploadHistory([...uploadHistory, fileInfo]);
  };

  const handleLogIn = () => {
    setLoggedIn(true);
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

  if (loggedIn){
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
              <Button onClick={() => handleNavigation('upload')} color="inherit">Upload New File</Button>
              <Button onClick={() => handleNavigation('history')} color="inherit">Audit History</Button>
          </Toolbar>
        </AppBar>
        {renderPage()}
      </Box>
    );
  }else{
    return <Login LogInSuccess={handleLogIn}/>
  }
}

export default App;