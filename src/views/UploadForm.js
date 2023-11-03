import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import APIGateway from '../components/APIGateway.js';
// import callback, { useCallback } from 'react';


function UploadForm({ onSubmit }) {
  // Initialize 3 'variables' file, name, date
  // By default, file is null, name and date are empty string
  const [file, setFile] = useState(null);
  const [name, setFileName] = useState('');
  const [date, setDate] = useState('');
   const [status, setStatus] = useState('');
   const [vulne_list, setVulneList] = useState('');

  // When file is uploaded, set the values for 3 'variables' above
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; 
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setDate(new Date().toLocaleString());   // temporarily show system date (the result date will be shown later)
    // setStatus("Risky / Save");
    // setVulneList(vulne);
  };



  // This function will be futher developed for calling API for processing data. At this time,
  // it just only send file info to the HistoryPage Component
  const readFileContent = (file, callback) => {
    const reader = new FileReader();

    reader.onload = async () => {
      const fileInfo = {
        fileName: name,
        fileData: reader.result,
      };
      const result = await APIGateway.AnalyzeSOLFile(fileInfo);
      callback(result);
    }

    reader.readAsDataURL(file);
  }

  const handleAnalyzing = () => {
    if (file) {
        readFileContent(file, (result) => {
          if (result != null){
            alert("Starting to analyze, visit uploaded history for more");

            let vulnerabilities = result.vulnerabilities.map((vulnerability) => {
              return `- ${vulnerability.issue}. \n   + Suggestion: ${vulnerability.suggestion}. \n`;
            }).join('');
            
            setFileName(result.file_name)
            setDate(result.date_uploaded);
            setStatus(result.status);
            setVulneList(vulnerabilities);
          }
        });
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
    <Box sx={{ m: 6 }}>
      <Grid container direction="row" justifyContent="center" spacing={6}>
        <Grid item>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Button component="label" variant="contained">
              Upload .sol file
              <VisuallyHiddenInput type="file" onChange={handleFileChange} accept=".sol"/>
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
            <TableRow>
              <TableCell variant="head" colSpan={3} > <b>Status</b> </TableCell>
              <TableCell scope="row" colSpan={9} >{status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" colSpan={3} > <b>Vulnerabilities</b> </TableCell>
              <TableCell scope="row" colSpan={9} >{vulne_list}</TableCell>
            </TableRow>
          </TableBody>
        
      </Table>
    </Box>
  );
}

export default UploadForm;