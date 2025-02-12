import React from "react";
import { useStyles } from "./index_styles";

type Props = {
  children: React.ReactNode;
};

const SolverCell = ({ children }: Props) => {
  const classes = useStyles();

  return <div className={classes.solverCell}>{children}</div>;
};

export default SolverCell;
