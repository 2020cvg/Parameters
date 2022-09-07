import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addData, deleteParam } from '../../actions/param';
import { setAlert } from '../../actions/alert';
import { useDispatch } from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import "react-datepicker/dist/react-datepicker.css";
import {
  ADD_DATA
} from "../../actions/types";

const ParamItem = ({
  id, value, name, deleteParam
}) => {
  const [formData, setFormData] = useState({
    new_label: name
  });
  const { new_label } = formData;
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

    const param_data = {
      "name": new_label,
      "value": value
    }

    handleClose();
    deleteParam(name);
    
    dispatch({
      type: ADD_DATA,
      payload: param_data
    });

    dispatch(setAlert('Parameter Updated', 'success'));
    setFormData({ ...formData, "title": ''});
    handleClose();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><h3>Update Parameter</h3></DialogTitle>
        <DialogContent>
          <div className="layout">
            <span>Title</span>
            <input className="input-group bottom"
              required
              id="outlined-required"
              label="Title"
              name="new_label"
              value={new_label}
              onChange={e => onChange(e)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
      <div>
        <a style={{color: "black", cursor: "pointer"}} onClick={handleClickOpen}>
          {name}
        </a>
      </div>
    </div>
  );
};


ParamItem.propTypes = {
  addData: PropTypes.func.isRequired,
  deleteParam: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  data_arr: state.param.data_arr
});

export default connect(mapStateToProps, { addData, deleteParam })(ParamItem);
