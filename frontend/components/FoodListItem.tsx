import { useContext, useState } from 'react';
import FoodContext, { FoodContextType } from '../context/FoodContext';
import { Box, ListItem, ListItemText } from '@mui/material';
import Link from 'next/link';
import { FoodEntry } from '../interfaces';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FoodItemDelModal from './FoodItemDelModal';

const FoodListItem = ({ food }: { food: FoodEntry }): JSX.Element => {
  const { addUpdateDialog, setAddUpdateDialog } = useContext(FoodContext) as FoodContextType;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleEditBtnClick = (): void => {
    setAddUpdateDialog({ ...addUpdateDialog, type: 'update', title: 'Update food', isOpen: true, food: food });
  };
  return (
    <ListItem
      disablePadding
      sx={{
        width: '90vw',
        maxWidth: '600px',
        backgroundColor: '#fff',
        p: '.5rem',
        mb: '.5rem',
        borderRadius: '5px',
      }}
    >
      <ListItemText sx={{ mr: '1rem' }} primary={food.name} />
      <Box sx={{ display: 'flex', width: '25%', justifyContent: 'space-between', minWidth: '150px' }}>
        <Link href={{ pathname: `/foods/${food._id as string}`, query: { id: food._id } }}>
          <a>
            <ListItemText
              secondary="Details"
              disableTypography={false}
              sx={{ color: '#fff', ':hover': { color: '#f47d20' } }}
            />
          </a>
        </Link>
        <EditIcon onClick={handleEditBtnClick} sx={{ cursor: 'pointer' }} />
        <DeleteIcon color="error" sx={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(true)} />
      </Box>
      <FoodItemDelModal id={food._id as string} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </ListItem>
  );
};

export default FoodListItem;
