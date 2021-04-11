import React from "react"
import Cell, { CellProps } from "./Cell"
import { useStyles } from "./index_styles"


const Grid: React.FunctionComponent<{ grid: CellProps[][] }> = (props) => {

    const classes = useStyles()

    return (
        <div className={classes.grid}>
            {props.grid.map((row, r) =>
                row.map((cell, c) =>
                    <Cell cell={cell} />
                )
            )}
        </div>
    )
}

export default Grid