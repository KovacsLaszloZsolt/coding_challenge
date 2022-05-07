import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const NotFound = (): JSX.Element => {
  return (
    <>
      <Box component="h2" sx={{ fontSize: '4rem', my: '2rem' }}>
        404
      </Box>
      <Box component="p">OOPS, SORRY WE CAN'T FIND THAT PAGE!</Box>
      <Button variant="contained" href="/">
        Go back
      </Button>
    </>
  );
};

export default NotFound;
