import React, { useContext } from 'react';
import FoodContext, { FoodContextType } from '../context/FoodContext';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const AddUpdateDialog = (): JSX.Element => {
  const { addUpdateDialog, setAddUpdateDialog, setToastMsg, handleError } = useContext(FoodContext) as FoodContextType;
  const { user, getFoods } = useContext(FoodContext) as FoodContextType;

  const handleInputChange = (e: React.SyntheticEvent): void => {
    const name = e.target as HTMLInputElement;
    setAddUpdateDialog({ ...addUpdateDialog, food: { ...addUpdateDialog.food, name: name.value } });
  };

  const handleClose = (): void => {
    setAddUpdateDialog({ ...addUpdateDialog, isOpen: false, food: { name: '' } });
  };

  const addNewFood = async (): Promise<void> => {
    const token = user?.token as string;
    try {
      await axios({
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: 'http://127.0.0.1:3001/food',
        data: {
          name: addUpdateDialog.food.name,
        },
      });
      getFoods();
      setToastMsg({ msg: 'New food added', type: 'success' });
      handleClose();
    } catch (err) {
      handleError(err);
    }
  };

  const updateFood = async (): Promise<void> => {
    const token = user?.token as string;
    const id = addUpdateDialog.food._id as string;
    try {
      await axios({
        method: 'put',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `http://127.0.0.1:3001/food/${id}`,
        data: {
          name: addUpdateDialog.food.name,
        },
      });
      getFoods();
      setToastMsg({ msg: 'Food updated', type: 'success' });
      handleClose();
    } catch (err) {
      handleError(err);
    }
    handleClose();
  };

  const handleAddUpdateBtn = (): void => {
    addUpdateDialog.type === 'add' ? void addNewFood() : void updateFood();
  };

  return (
    <div>
      <Dialog open={addUpdateDialog.isOpen} onClose={handleClose}>
        <DialogTitle>{addUpdateDialog.title}</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={addUpdateDialog.food.name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddUpdateBtn} disabled={addUpdateDialog.food.name ? false : true}>
            {addUpdateDialog.type}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddUpdateDialog;
