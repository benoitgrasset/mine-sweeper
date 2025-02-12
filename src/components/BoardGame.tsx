import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  maxScore,
  selectGrid,
  selectScore,
  selectScores,
  updateGrid,
} from "../redux/app";
import { CellProps } from "./Cell";
import Grid from "./Grid";
import { useStyles } from "./index_styles";
import Score from "./Score";
import SolverCell from "./SolverCell";

const transpose = (matrix: CellProps[][]) => {
  return matrix[0].map((_col, i) => matrix.map((row) => row[i]));
};

const getScoreFromRow = (row: CellProps[]) => {
  const sum = row.reduce((acc, cell) => acc + cell.value, 0);
  const nbZeros = row.reduce(
    (acc, cell) => (cell.value === 0 ? acc + 1 : acc),
    0
  );
  return `${sum} / ${nbZeros}💣`;
};

const BoardGame: React.FunctionComponent = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [helpMode, setHelpMode] = React.useState(false);

  const handleChange = () => {
    setHelpMode((prevState) => !prevState);
  };

  const grid = useSelector(selectGrid);

  const handleNewGame = () => {
    dispatch(updateGrid({ score }));
  };

  const hScores = grid.map((row) => getScoreFromRow(row));

  const vScores = transpose(grid).map((row) => getScoreFromRow(row));

  const score = useSelector(selectScore);

  const scores = useSelector(selectScores);

  if (score >= maxScore) {
    alert("You win !! 🥳");
    dispatch(updateGrid({ score }));
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Button color="primary" variant="contained" onClick={handleNewGame}>
          {"New game"}
        </Button>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={helpMode}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Help mode"
          />
        </FormGroup>
      </div>
      <div>
        <div className={classes.container}>
          <Grid grid={grid} helpMode={helpMode} />
          <div className={classes.vScores}>
            {hScores.map((cell, index) => (
              <SolverCell key={index}>{cell}</SolverCell>
            ))}
          </div>
          <div className={classes.highScores}>
            <h1>{"High scores (5)"}</h1>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{"Rank"}</TableCell>
                  <TableCell>{"Score"}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...scores]
                  .sort((a, b) => b - a)
                  .slice(0, 5)
                  .map((score, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{score}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className={classes.container}>
          {vScores.map((cell, index) => (
            <SolverCell key={index}>{cell}</SolverCell>
          ))}
        </div>
      </div>
      <Score score={score} />
      <div>{`You need ${maxScore} points`}</div>
    </div>
  );
};

export default BoardGame;
