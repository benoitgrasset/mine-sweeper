import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cellClick, selectScore, updateGrid } from "../redux/app";
import { useStyles } from "./index_styles";

export type CellProps = {
  id: string;
  value: number;
  visible: boolean;
};

const Cell: React.FunctionComponent<{ cell: CellProps; className?: string }> = (
  props
) => {
  const classes = useStyles();

  const { cell, className } = props;
  const { visible, value } = cell;

  const dispatch = useDispatch();

  const score = useSelector(selectScore);

  const handleClick = (cell: CellProps) => {
    dispatch(cellClick({ cell }));
    if (value === 0) {
      alert("You loose !! 😞");
      dispatch(updateGrid({ score }));
    }
  };

  const valueToDisplay = value === 0 ? "💣" : value;

  return (
    <div
      className={clsx(classes.cell, className)}
      onClick={() => !visible && handleClick(cell)}
    >
      {visible && valueToDisplay}
    </div>
  );
};

export default Cell;
