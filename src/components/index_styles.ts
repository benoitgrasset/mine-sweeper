import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import { nbCell } from "./BoardGame"

export const useStyles = makeStyles((theme: Theme) => {

    const cellSize = "80px"
    const gridGap = 10

    const baseCellStyles = {
        height: cellSize,
        width: cellSize,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return createStyles({
        root: {
            maxWidth: 1200,
            "&>*": {
                margin: 10
            }
        },
        grid: {
            display: "grid",
            gridTemplateColumns: `repeat(${nbCell}, ${cellSize})`,
            gridTemplateRows: `repeat(${nbCell}, ${cellSize})`,
            gridGap
        },
        score: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        cell: {
            ...baseCellStyles,
            background: "green",
            color: "white",
            cursor: "pointer"
        },
        solverCell: {
            ...baseCellStyles,
            background: "pink",
            color: "black"
        },
        bestSolution: {
            background: "orange"
        },
        container: {
            display: "flex",
            "&>*": {
                margin: `0 ${gridGap / 2}px`
            }
        },
        vScores: {
            "&>*:not(:first-child)": {
                margin: `${gridGap}px 0`
            }
        },
        highScores: {
            marginLeft: 40
        },
        header: {
            display: "flex",
            "&>*": {
                marginLeft: 20
            }
        }
    })
})