import React from "react"
import { useStyles } from "./index_styles"


const SolverCell: React.FunctionComponent<{}> = (props) => {

    const classes = useStyles()
    const { children } = props

    return (
        <div className={classes.solverCell} >
            {children}
        </div>
    )
}

export default SolverCell