import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Stack, TextField } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/reducers/auth.reducer';
import { Navigate, useNavigate } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 9999
};

export default function BasicModal({id,closed}) {
  const [user, setUser] = React.useState({});

  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
   setUser(e.target.value)
   
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >


        <Box sx={style}>
          <Typography mb={4}  id="modal-modal-title" variant="h6" component="h2">
            Login
          </Typography>
         <Stack direction="row" justifyContent="center" spacing={2}  divider={<Divider orientation="vertical" flexItem />}>
          <Button  size="small" onClick = {()=> closed(false)}>Отмена</Button>
          <Button ml={4} onClick={() => dispatch(addUser(user),navigate('/'))} size="small">Confirm</Button>
          <TextField
                onChange={changeHandler}
                name="name"
                label="Имя"
                id="outlined-basic"
              />
         </Stack>
        </Box>
      </Modal>
    </div>
  );
}
