

import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { styled } from '@mui/material/styles';
import {
  Table, 
  TableFooter, 
  TableRow, 
  TableBody, 
  TableContainer, 
  TableHead, 
  TableCell,
  tableCellClasses,
  Paper,
  TablePagination,
  Box,
} from '@mui/material';
import CompanyStore from 'src/store/company.store';

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


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="Premiere page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Page precedente"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Page suivante"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Derniere page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function ListCybercafe() {
  const { companies } = CompanyStore();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let pageNumber_, pageSize_;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - companies.totalElements) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if(companies.length > 0){    
    const { pageNumber, pageSize} = companies.pageable;
    pageNumber_ = pageNumber;
    pageSize_ = pageSize;
  }
  const { pageNumber, pageSize} = companies.pageable;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} 
            aria-label="custom pagination table">
        
        <TableHead>
           <TableRow>
             <StyledTableCell>Nom du Cybercafe</StyledTableCell>
             <StyledTableCell align="right">Email</StyledTableCell>
             <StyledTableCell align="right">Telephone</StyledTableCell>
             <StyledTableCell align="right">Adresse</StyledTableCell>
             <StyledTableCell align="right">Action</StyledTableCell>
           </TableRow>
        </TableHead>
        <TableBody>
           {companies.content?.map((row) => (
            <StyledTableRow key={row.dvBusinessId}>
              <StyledTableCell component="th" 
              scope="row">
                {row.businessName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.businessEmail}</StyledTableCell>
              <StyledTableCell align="right">{row.businessPhoneNumber}</StyledTableCell>
              <StyledTableCell align="right">{row.businessAddress}</StyledTableCell>
              <StyledTableCell align="right">{row.businessAddress}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              // rowsPerPageOptions={[5, { label: 'Tous', value: -1 }]}
              colSpan={3}
              count={companies.totalElements}
              rowsPerPage={companies.size}
              page={pageNumber}
              SelectProps={{
                inputProps: {
                  'aria-label': 'Items par page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}