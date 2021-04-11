import React from "react"
import { useStyles } from "./index_styles"

const Score: React.FunctionComponent<{ score: number }> = (props) => {

    const classes = useStyles()

    return (
        <div className={classes.score}>
            {`Score: ${props.score}`}
        </div>
    )
}

export default Score