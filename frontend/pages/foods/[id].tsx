import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import FoodContext, { FoodContextType } from '../../context/FoodContext';
import { FoodEntry } from '../../interfaces';
import { Box, List, ListItem, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Details = (): JSX.Element => {
  const router = useRouter();
  const { user, handleError } = useContext(FoodContext) as FoodContextType;
  const {
    query: { id },
  } = router;
  const [food, setFood] = useState<null | FoodEntry>(null);

  const getSingleFood = async (): Promise<void> => {
    try {
      if (!user?.token) {
        throw new Error('unAuth');
      }
      const response = await axios({
        method: 'get',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        url: `http://127.0.0.1:3001/food/${id}`,
      });
      setFood(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (user && id) {
      void getSingleFood();
    }
  }, [user, id]);

  return (
    <Box>
      {food && (
        <Box sx={{ backgroundColor: '#fff', p: '1rem', borderRadius: '5px' }}>
          <Button href="/" color="warning">
            <ArrowBackIcon sx={{ fontSize: '1rem' }} /> Back
          </Button>
          <Box>
            <Typography variant="h3" component="h2" sx={{ mb: '1rem' }}>
              {food.name}
            </Typography>
            {food.details && (
              <>
                <Typography variant="h4" component="h4">
                  Details:
                </Typography>
                <List>
                  {Object.keys(food.details).map((detail) => (
                    <ListItem key={detail} sx={{ justifyContent: 'space-between' }}>
                      <Box>{detail}:</Box>
                      <Box>
                        {food.details![detail].amount}
                        {food.details![detail].unit}
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </>
            )}
            <Box sx={{ textAlign: 'right', mt: '1rem', color: 'rgba(0, 0, 0, 0.6)' }}>
              <Box component="span" sx={{ mr: '1rem' }}>
                Created at:
              </Box>
              <Box component="span">{food.createdAt?.toString().split('T')[0]}</Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Details;
