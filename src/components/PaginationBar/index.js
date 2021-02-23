import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";
import swal from "sweetalert";

const PaginationBar = (props) => {
  const classes = useStyles();

  const pagination = (pagina) => {
    if (pagina >= Math.ceil(props.totalProducts / props.productsPerPage)) {
      return swal("", "No more products", "error");
    } else if (pagina < 0) {
      return swal("", "Cant go back", "error");
    } else {
      let products = [...props.products];
      let firstIdx = props.productsPerPage * pagina;
      let secondIdx = props.productsPerPage * (pagina + 1);
      let newProducts = products.slice(firstIdx, secondIdx);

      props.setCurrentPage(pagina);
      props.setState(newProducts);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <p className={classes.products}>
        {props.state &&
          `${props.state.length * (props.currentPage + 1)} of ${
            props.totalProducts
          } products`}
      </p>
      <div className={classes.groupButtons}>{props.children}</div>
      <div className={classes.arrowButtons}>
        <IconButton
          aria-label="arrow-left"
          onClick={() => pagination(props.currentPage - 1)}
        >
          <img src={arrowLeft} alt="arrow-left" />
        </IconButton>
        <IconButton
          aria-label="arrow-right"
          onClick={() => pagination(props.currentPage + 1)}
        >
          <img src={arrowRight} alt="arrow-right" />
        </IconButton>
      </div>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      flexDirection: "column",
    },
  },
  arrowButtons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "right",
    width: "25%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
    },
  },
  products: {
    fontFamily: "SourceSansPro-Regular",
    fontSize: "24px",
    color: "#616161",
    letterSpacing: "-0.15px",
    lineHeight: "24px",
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      lineHeight: "14px",
    },
  },
  groupButtons: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
}));
export default PaginationBar;
