import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const FilterButton = (props) => {
  const classes = useStyles();

  const handleFilter = (type) => {
    props.setActiveButton({ [type]: true, name: type });
    return props.pagination(type);
  };
  return (
    <Button
      style={props.activeButton[props.type] ? { background: "#0ad4fa" } : null}
      className={classes.filterButton}
      variant="contained"
      size="small"
      onClick={() => handleFilter(props.type)}
    >
      {props.text}
    </Button>
  );
};
const useStyles = makeStyles({
  filterButton: {
    borderRadius: "1rem",
    margin: ".5rem",
    fontSize: "12px",
    color: "#ffffff",
    letterSpacing: "-0.15px",
    lineHeight: "24px",
    textAlign: "left",
  },
});
export default FilterButton;
