import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProductCard from "../ProductCard";

const useStyles = makeStyles((theme) => ({
  productsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gridColumnGap: "15px",
    gridRowGap: "15px",
    marginTop: "2rem",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(2,1fr)",
      gridColumnGap: "0",
      gridRowGap: "0",
      margin: ".5rem",
    },
  },
}));

const Catalog = ({ products, points }) => {
  const classes = useStyles();
  return (
    <div className={classes.productsContainer}>
      {products &&
        products.map((item) => <ProductCard data={item} userCoins={points} key={item._id}/>)}
    </div>
  );
};
export default Catalog;
