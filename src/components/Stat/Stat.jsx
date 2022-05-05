import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Button, Stack } from "@mui/material";
import { addEnd, addUser } from "../../store/reducers/auth.reducer";
import { useNavigate } from "react-router-dom";

function createData(name, calories, fat, carbs, protein, something) {
  return { name, calories, fat, carbs, protein, something };
}


function Stat() {
  const {
    statCount,
    statRight,
    statWrong,
    statSumPoints,
    statStart,
  } = useSelector((state) => state.auth.currentGame);
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const finishGame = () => {
    dispatch(addUser(null));
    dispatch(addEnd());
  };

  const rows = [
    createData(statCount, statRight, statWrong, statSumPoints, statStart),
  ];
  return (
    <>
    <TableContainer component={Paper} sx={{ padding: "20px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Кол-во вопросов</TableCell>
            <TableCell align="center">Верных ответов</TableCell>
            <TableCell align="center">Неверных ответов</TableCell>
            <TableCell align="center">Сумма балов</TableCell>
            <TableCell align="center">Создано</TableCell>
            <TableCell align="center">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell  component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
              <TableCell  sx={{display:"flex",justifyContent:'center'}}>
                <Stack spacing={1}>
                <Button sx={{width:"120px"}} onClick={()=>navigate('/game')} variant="contained" color="success">
                  Продолжить
                </Button>
                <Button sx={{width:"120px"}}  onClick={()=>finishGame()}  variant="outlined" color="error">
                  Завершить
                </Button>

                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
       
</>
  );
}

export default Stat