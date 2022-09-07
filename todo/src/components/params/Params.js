import React, { useState  } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addData } from '../../actions/param';
import TodoItem from './ParamItem';
import { setAlert } from '../../actions/alert';
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';

import "react-datepicker/dist/react-datepicker.css";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'

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

const Params = ({ addData, data_arr }) => {
  const [formData, setFormData] = useState({
    title: ''
  });
  const { title } = formData;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      "name": title
    }
    handleClose();
    addData(data);
    dispatch(setAlert('Parameter Added', 'success'));
    setFormData({ ...formData, "title": ''});
  };


  return (
    <div >
      <div style={{padding: "100px"}}>
        <div>
          <Button sx={{mb: "20px", mt: "40px"}} variant="contained" onClick={handleClickOpen}>Add Parameter</Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle><h3>Add Parameter</h3></DialogTitle>
            <DialogContent>
              <div className="layout">
                <span>Title</span>
                <input className="input-group bottom"
                  required
                  id="outlined-required"
                  label="Title"
                  name="title"
                  value={title}
                  onChange={e => onChange(e)}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={onSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Parameter</StyledTableCell>
                <StyledTableCell align="right">Value</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data_arr.map((data) => (  
                <StyledTableRow key={data.name}>
                  <StyledTableCell>
                      <TodoItem {...data} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {data.value}
                  </StyledTableCell> 
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

Params.propTypes = {
  addTodo: PropTypes.func.isRequired,
  addData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  default_params: state.param.default_params,
  data_arr: state.param.data_arr,
});

export default connect(mapStateToProps, { addData })(Params);
