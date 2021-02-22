import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";
import FilterButton from "../FilterButton";
import { useSelector } from "react-redux";

const PaginationBar = (props) => {
  const classes = useStyles();
  const [activeButton, setActiveButton] = React.useState({
    recent: true,
    name: "recent",
  });
  const products = useSelector((state) => state.products);

  const pagination = (sort, page, change) => {
    const productsRef = [...products];

    if (sort === "lowest") {
      productsRef.sort((a, b) => a.cost - b.cost);
    } else if (sort === "highest") {
      productsRef.sort((a, b) => b.cost - a.cost);
    }

    const middleIndex = Math.ceil(products.length / 2);
    const firsthalf = [...productsRef].splice(0, middleIndex);
    const secondHalf = [...productsRef].splice(-middleIndex);
    if (page === 2 && change) {
      props.setState(secondHalf);
      props.setCurrentPage(2);
    } else {
      props.setState(firsthalf);
      props.setCurrentPage(1);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <p className={classes.products}>
        {props.state &&
          `${(products.length / 2) * props.currentPage} of ${
            props.totalProducts
          } products`}
      </p>
      {props.filter && (
        <div className={classes.groupButtons}>
          Sort By:
          <FilterButton
            text="Most Recent"
            type={"recent"}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            pagination={pagination}
          />
          <FilterButton
            text="Lowest Price"
            type={"lowest"}
            pagination={pagination}
            setActiveButton={setActiveButton}
            activeButton={activeButton}
          />
          <FilterButton
            text="Highest Price"
            type={"highest"}
            pagination={pagination}
            setActiveButton={setActiveButton}
            activeButton={activeButton}
          />
        </div>
      )}
      <div className={classes.arrowButtons}>
        {props.currentPage === 2 ? (
          <IconButton
            aria-label="arrow-left"
            onClick={() => pagination(activeButton.name, 1, true)}
          >
            <img src={arrowLeft} alt="arrow-left" />
          </IconButton>
        ) : null}
        <IconButton
          aria-label="arrow-right"
          onClick={() => {
            if(props.currentPage !== 2) {
              return pagination(activeButton.name, 2, true)
            }
          }}
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
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      flexDirection: 'column'
      
    }
  },
  arrowButtons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "right",
    width: "25%",
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: "center"
    }
  },
  products: {
    fontFamily: "SourceSansPro-Regular",
    fontSize: "24px",
    color: "#616161",
    letterSpacing: "-0.15px",
    lineHeight: "24px",
    textAlign: "left",
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: "14px"
    }
  },
  groupButtons:{
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    }
  }
}));
export default PaginationBar;
