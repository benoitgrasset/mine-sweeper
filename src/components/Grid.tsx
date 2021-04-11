import React from "react"
import Cell, { CellProps } from "./Cell"
import { useStyles } from "./index_styles"


const Grid: React.FunctionComponent<{ grid: CellProps[][], helpMode: boolean }> = (props) => {

    const classes = useStyles()

    const { grid, helpMode } = props

    let bestSolution = Math.max(...grid.map(row => Math.max(...row.map(cell => cell.value))))

    const getBestSOlution = () => {
        const allBestSolutionsClicked = grid.every(row => row.filter(cell => cell.value === bestSolution).every(cell => cell.visible))
        if (allBestSolutionsClicked) {
            bestSolution = bestSolution - 1
        }
        return bestSolution
    }

    return (
        <div className={classes.grid}>
            {grid.map((row, r) =>
                row.map((cell, c) =>
                    <Cell cell={cell} className={(helpMode && cell.value === getBestSOlution()) ? classes.bestSolution : undefined} />
                )
            )}
        </div>
    )
}

export default Grid