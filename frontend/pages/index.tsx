import { List, Button, Box } from '@mui/material';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { FoodEntry } from '../interfaces';

import { useContext } from 'react';
import FoodContext, { FoodContextType } from '../context/FoodContext';
import FoodListItem from '../components/FoodListItem';
import AddUpdateDialog from '../components/AddUpdateDialog';

const Home: NextPage = () => {
  const { user, foods, getFoods, addUpdateDialog, setAddUpdateDialog } = useContext(FoodContext) as FoodContextType;

  useEffect(() => {
    if (user) {
      getFoods();
    }
  }, [user]);

  const handleAddClickBtn = (): void => {
    setAddUpdateDialog({ ...addUpdateDialog, type: 'add', title: 'Add new food', isOpen: true });
  };

  return (
    <>
      {foods ? (
        <>
          {foods.length === 0 ? (
            <Box component="p" sx={{ fontSize: '1.5rem' }}>
              No food available
            </Box>
          ) : (
            <>
              <List>
                {foods.map((food: FoodEntry) => (
                  <FoodListItem key={food._id} food={food} />
                ))}
              </List>
            </>
          )}
          <Button onClick={handleAddClickBtn}>Add new food</Button>
          <AddUpdateDialog />
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default Home;
