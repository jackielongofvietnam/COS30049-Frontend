import React from 'react';
import { Box, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@mui/material/Grid';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function HistoryPage({ historyArray }) {
  return (
    <div>
      
      <Grid container direction="row" justifyContent="center" spacing={6}>
        <Grid item>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <h2>Audit history</h2>
            <Box sx={{ display: 'flex',  alignItems: 'center', p: 2 }}>
              <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="search_filename" label="Search filename" variant="filled" />
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>File Name</StyledTableCell>
            <StyledTableCell>Upload Date</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Vulnerabilities</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historyArray.map((historyItem, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{historyItem.fileName}</StyledTableCell>
              <StyledTableCell>{historyItem.uploadDate}</StyledTableCell>
              <StyledTableCell>{historyItem.statusData}</StyledTableCell>
              <StyledTableCell>{historyItem.vulneData}</StyledTableCell>
              {/* <td>{historyItem.risky_bool}</td>
              <td>{historyItem.vulne_lists}</td> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HistoryPage;