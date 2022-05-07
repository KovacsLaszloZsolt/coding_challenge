import React, { useContext } from 'react';
import FoodContext, { FoodContextType } from '../context/FoodContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

const FoodItemDelModal = ({
  id,
  isModalOpen,
  setIsModalOpen,
}: {
  id: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const { user, getFoods, handleError } = useContext(FoodContext) as FoodContextType;
  const deleteFood = async (): Promise<void> => {
    const token = user?.token as string;
    try {
      await axios({
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `http://127.0.0.1:3001/food/${id}`,
      });
      void getFoods();
    } catch (error) {
      handleError(error);
    }
  };
  const handleClose = (): void => {
    setIsModalOpen(false);
  };

  const handleClickDelBtn = (): void => {
    handleClose();
    void deleteFood();
  };

  return (
    <div>
      <Dialog open={isModalOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Are you sure want to delete this food?'}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickDelBtn} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FoodItemDelModal;
