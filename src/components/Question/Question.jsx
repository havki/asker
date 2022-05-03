import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, Stack, TextField } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { useDispatch, useSelector } from "react-redux";
import {
  addCount,
  addRight,
  addStatPoints,
  addUser,
  addWrong,
  colorChanger,
  setResult,
  showQuestion,
} from "../../store/reducers/auth.reducer";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../../UI/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 9999,
};

export default function Question({ id, closed }) {
  const [user, setUser] = React.useState({});

  const [open, setOpen] = React.useState(true);
  const [answer, setAnswer] = React.useState(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questionData, questValue,result } = useSelector((state) => state.auth);
  const [seconds, setSeconds] = React.useState(10);
  const intervalRef = React.useRef();

  const notify = () => {
    toast.error("Ответ не верный!", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const notifygood = () => {
    toast.success("Верно", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  React.useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((sec) => sec - 1);
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
      
      
    }
  }, []);

  

  const cancelInterval = () => {
    if (seconds < 1) {
      
      
      clearInterval(intervalRef.current);
      dispatch(colorChanger('wrong'))
      notify();
      // dispatch(addWrong());
      // dispatch(addStatPoints(-questValue));
     
      setTimeout(() => {
        dispatch(showQuestion(false));
        // dispatch(addCount());
      }, 1000);
      
    }
  };

  cancelInterval();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const changeHandler = (e) => {
    setAnswer(e.target.value);
  };
  const submitHandler = () => {
    
    if (questionData.answer !== answer)  {
      dispatch(colorChanger('wrong'))
      notify();
      dispatch(addWrong());
      dispatch(addStatPoints(-questValue));
    } else {
      dispatch(colorChanger('right'))
      dispatch(addRight('right'));
      dispatch(addStatPoints(questValue));
      notifygood();

    }
    setTimeout(() => {
      dispatch(showQuestion(false));
      dispatch(addCount());
    }, 1000);
  };

  if(seconds<1){
    
  }


  if (!questionData) {
    return <Loading />;
  }

  return (
    <div>
      <Modal
      
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography mb={4} id="modal-modal-title" variant="h6" component="h2">
            {questionData.question}
          </Typography>
          <Typography mb={4} id="modal-modal-title" variant="h6" component="h2">
            {questionData.answer}
          </Typography>
          <Typography mb={4} id="modal-modal-title" variant="h6" component="h2">
            {seconds}
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Button size="small" onClick={() => submitHandler()}>
              OK
            </Button>
            <div>
           

              <ToastContainer />
            </div>

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
