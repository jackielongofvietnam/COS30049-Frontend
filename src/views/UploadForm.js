import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box, Tab } from '@mui/material';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function UploadForm({ onSubmit }) {
  // Initialize 3 'variables' file, name, date
  // By default, file is null, name and date are empty string
  const [file, setFile] = useState(null);
  const [name, setFileName] = useState('');
  const [date, setDate] = useState('');

  // When file is uploaded, set the values for 3 'variables' above
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setDate(new Date().toLocaleString());
  };



  // This function will be futher developed for calling API for processing data. At this time,
  // it just only send file info to the HistoryPage Component
  const handleAnalyzing = () => {
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const fileInfo = {
            fileName: name,
            uploadDate: date,
            fileData: reader.result,
          };

          // call the onSubmit property to send data to HistoryPage Component
          onSubmit(fileInfo);
        };
        reader.readAsDataURL(file);

        alert("Starting to analyze, visit uploaded history for more");

        setFile(null);
        setFileName('');
        setDate('');

      }
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Box>
      <h2>Upload .sol file</h2>
      <Grid container direction="row" justifyContent="center" spacing={6}>
        <Grid item>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Button component="label" variant="contained">
              Upload .sol file
              <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
            </Button>
            <h3>{name}</h3>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Button compoment="text" variant="contained" onClick={handleAnalyzing}>
              Start analysis
            </Button>
          </Grid>  
        </Grid>
      </Grid>
      
    

      <h3>Upload Information</h3>
      <Table style={{ tableLayout: 'fixed'}} width={90}>
        <TableBody>
          <TableRow>
            <TableCell variant="head" colSpan={3}> <b>Filename</b> </TableCell>
            <TableCell scope="row" colSpan={9}>{name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" colSpan={3} > <b>Date uploaded</b> </TableCell>
            <TableCell scope="row" colSpan={9} >{date}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <table>
        <tbody>
          <tr>
            <td>File Name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Upload Date</td>
            <td>{date}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={handleAnalyzing}>Start Analyzing</button>
    </Box>
  );
}

export default UploadForm;