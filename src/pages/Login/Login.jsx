import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/reducers/auth.reducer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import validate from "../../helpers/Date";


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

function Login() {
  const [user, setUser] = React.useState("");

  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notify = () => {
    toast.error("Введите кириллицу", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const changeHandler = (e) => {
    setUser(e.target.value);
  };

  let reg1 = /[a-z]/;
  const submitHandler = () => {
    if (!validate(reg1, user) && user !== "") {
      dispatch(addUser(user));
      navigate("/");
    } else {
      notify();
    }
  };

  return (
    <div>
      <ToastContainer />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography mb={4} id="modal-modal-title" variant="h6" component="h2">
            Login
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Button ml={4} onClick={() => submitHandler()} size="small">
              Confirm
            </Button>
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

export default Login
  