import React, { useEffect, useState } from 'react';
import UploadForm from './UploadForm';
import HistoryPage from './HistoryPage';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Toolbar } from '@mui/material';
import Login from './Login';
import { useCookies } from 'react-cookie';
import APIGateway from '../components/APIGateway';

function App() {
  // By default, the page is Upload
  // History is initialized as an empty array
  const [cookies, setCookie] = useCookies(['user']);
  const [loggedIn, setLoggedIn] = useState(cookies.loggedIn);
  const [currentPage, setCurrentPage] = useState('upload');
  const [mainHistoryArray, setMainHistoryArray] = useState();

  useEffect(() => { 
    async function fetchData() {
      const array = await APIGateway.GetAuditHistory("");
      setMainHistoryArray(array);
    }
    fetchData();
  }, []);
  

  // this function handles appending file info to the upload history array
  const handleSubmit = async () => {
    const array = await APIGateway.GetAuditHistory("");
    setMainHistoryArray(array);
  };

  const updateHistoryArray = async (param) => {
    const array = await APIGateway.GetAuditHistory(param);
    setMainHistoryArray(array);
  }

  const handleLogIn = () => {
    // localStorage.setItem('user_name', )
    setLoggedIn(true);
    setCookie('loggedIn', true, { path: '/' })
  };

  const logout = async () => {
    await APIGateway.Logout();
    setLoggedIn(false);
    setCookie('loggedIn', false, { path: '/' })
  }

  // this function works like a navigator
  const renderPage = () => {
    switch (currentPage) {
      case 'upload':
        return <UploadForm onSubmit={handleSubmit}/>;
      case 'history':
        return <HistoryPage historyArray={mainHistoryArray} onParamPass={updateHistoryArray}/>;
      default:
        return null;
    }
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  if (loggedIn){
    return (
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Button onClick={() => handleNavigation('upload')} color="inherit">Upload New File</Button>
              <Button onClick={() => handleNavigation('history')} color="inherit">Audit History</Button>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Button onClick={() => logout()} color="inherit">Logout</Button>
            </Box>
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