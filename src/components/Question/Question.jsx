import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Stack, TextField } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, showQuestion } from '../../store/reducers/auth.reducer';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from '../../UI/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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

export default function Question({id,closed}) {
  const [user, setUser] = React.useState({});
  const [timer, setTimer] = React.useState(10);
  const [open, setOpen] = React.useState(true);
  const [answer, setAnswer] = React.useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {questionData} = useSelector((state)=> state.auth)


  React.useEffect(()=>{
    // setTimeout(() => {
    //   dispatch(showQuestion(false))
    // }, 3000);

    // setInterval(()=>{
    //   // console.log('hello');
    //   setTimer(timer - 1 )

    //   if(timer===0){
    //     clearInterval()
    //   }
    // },1000)
    
  },[]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  

  const changeHandler = (e) => {
   setAnswer(e.target.value);
   
  }

  const submitHandler = () => {
    if(questionData.answer === answer ){
     alert('ok')

    }
    else{
      alert('neok')
    }
    dispatch(showQuestion(false));
    

  }


  const notify = () => {
    toast("Default Notification !");

  }


  if(!questionData){
    return(
      <Loading/>

    )
    
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
            {questionData.question}
          </Typography>
          <Typography mb={4}  id="modal-modal-title" variant="h6" component="h2">
            {questionData.answer}
          </Typography>
         <Stack direction="row" justifyContent="center" spacing={2}  divider={<Divider orientation="vertical" flexItem />}>
          <Button  size="small" onClick = {()=> submitHandler()}>OK</Button>
          <Button ml={4} onClick={notify} size="small">Confirm</Button>
          <TextField
                onChange={changeHandler}
                name="name"
                label="Answer"
                id="outlined-basic"
              />
         </Stack>
        </Box>
      </Modal>
    </div>
  );
}
