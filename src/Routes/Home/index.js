import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import header from "../../assets/header-x1.png";
import ProductCard from "../../components/ProductCard";
import { getProducts, getUser } from "../../redux/actions";
import PaginationBar from "../../components/PaginationBar";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [state, setState] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    if (Object.keys(products).length === 0) {
      dispatch(getProducts());
      dispatch(getUser());
    } else {
      setState([...products].splice(0, products.length / 2));
    }
  }, [dispatch, products]);

  return (
      <>
      <div className={classes.header}>
        <img src={header} alt="header" width="100%" />
      </div>
      <div className={classes.mainContent}>
        <PaginationBar
          totalProducts={products.length}
          state={state}
          setState={setState}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          filter={true}
        />
        <div className={classes.productsContainer}>
          {state &&
            state.map((item) => (
              <ProductCard data={item} userCoins={user.points} />
            ))}
        </div>
        <PaginationBar
          totalProducts={products.length}
          state={state}
          setState={setState}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          filter={false}
        />
      </div>
      </>
  );
}

const useStyles = makeStyles((theme) => ({
  mainContainerHeader: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "75%",
  },
  mainContainerFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  filterButton: {
    borderRadius: "1rem",
    margin: ".5rem",
    fontSize: "12px",
    color: "#ffffff",
    letterSpacing: "-0.15px",
    lineHeight: "24px",
    textAlign: "left",
  },
  productsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gridColumnGap: "15px",
    gridRowGap: "15px",
    marginTop: "2rem",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  arrowButtons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "right",
    width: "25%",
  },
  products: {
    fontFamily: "SourceSansPro-Regular",
    fontSize: "24px",
    color: "#616161",
    letterSpacing: "-0.15px",
    lineHeight: "24px",
    textAlign: "left",
  },
}));
export default Home;
