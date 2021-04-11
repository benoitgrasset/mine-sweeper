import React from "react"
import Grid from "./Grid"
import Score from "./Score"
import SolverCell from "./SolverCell"
import { useDispatch, useSelector } from "react-redux"
import { selectGrid, updateGrid, selectScore, selectScores } from "../redux/app"
import { Button, Table, TableBody, TableHead, TableRow, TableCell } from "@material-ui/core"
import { useStyles } from "./index_styles"
import { CellProps } from "./Cell"

export const nbCell = 6
export const maxValue = 3
export const maxScore = 45

const transpose = (matrix: CellProps[][]) => {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

const getScoreFromRow = (row: CellProps[]) => {
    const sum = row.reduce((acc, cell) => acc + cell.value, 0)
    const nbZeros = row.reduce((acc, cell) => cell.value === 0 ? acc + 1 : acc, 0)
    return `${sum} / ${nbZeros}💣`
}

const BoardGame: React.FunctionComponent<{}> = (props) => {

    const classes = useStyles()

    const dispatch = useDispatch()

    const grid = useSelector(selectGrid)

    const handleNewGame = () => {
        dispatch(updateGrid({ score }))
    }

    const hScores = grid.map(row => getScoreFromRow(row))

    const vScores = transpose(grid).map(row => getScoreFromRow(row))

    const score = useSelector(selectScore)

    const scores = useSelector(selectScores)

    if (score >= maxScore) {
        alert("You win !!")
        dispatch(updateGrid({ score }))
    }

    return (
        <div className={classes.root}>
            <div><Button color="secondary" variant="contained" onClick={handleNewGame}>{"New game"}</Button></div>
            <div>
                <div className={classes.container}>
                    <Grid grid={grid} />
                    <div className={classes.vScores}>{hScores.map(cell => <SolverCell>{cell}</SolverCell>)}</div>
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
                                {[...scores].sort((a, b) => b - a).slice(0, 5).map((score, index) => (
                                    <TableRow>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{score}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className={classes.container}>{vScores.map(cell => <SolverCell>{cell}</SolverCell>)}</div>
            </div>
            <Score score={score} />
            <div>{`You need ${maxScore} points`}</div>
        </div>
    )
}

export default BoardGame