import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import header from "../../assets/header-x1.png";
import { getProducts, getUser } from "../../redux/actions";
import PaginationBar from "../../components/PaginationBar";
import { useDispatch, useSelector } from "react-redux";
import Catalog from "../../components/Catalog";
import FilterButton from "../../components/FilterButton";

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [activeButton, setActiveButton] = React.useState({
    recent: true,
    name: "recent",
  });
  const [state, setState] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [productsPerPage, setProductsPerPage] = React.useState(16);
  const [sortedProducts, setSortedProducts] = React.useState([]);

  React.useEffect(() => {
    if (Object.keys(products).length === 0) {
      dispatch(getProducts());
      dispatch(getUser());
    } else {
      setState([...products].splice(0, productsPerPage));
      setSortedProducts([...products])
    }
  }, [dispatch, products]);

  const filterProducts = (sort) => {
    const productsRef = [...products];

    if (sort === "lowest") {
      productsRef.sort((a, b) => a.cost - b.cost);
    } else if (sort === "highest") {
      productsRef.sort((a, b) => b.cost - a.cost);
    }
    setSortedProducts(productsRef);
    setState([...productsRef].splice(0, productsPerPage));
    setCurrentPage(0);
  };

  return (
    <>
      <div className={classes.header}>
        <img src={header} alt="header" width="100%" />
      </div>
      <div className={classes.mainContent}>
        <PaginationBar
          totalProducts={products.length}
          products={sortedProducts}
          state={state}
          setState={setState}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={16}
        >
          Sort By:
          <FilterButton
            text="Most Recent"
            type={"recent"}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            filterProducts={filterProducts}
          />
          <FilterButton
            text="Lowest Price"
            type={"lowest"}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            filterProducts={filterProducts}
          />
          <FilterButton
            text="Highest Price"
            type={"highest"}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            filterProducts={filterProducts}
          />
        </PaginationBar>

        <Catalog products={state} points={user.points} />

        <PaginationBar
          totalProducts={products.length}
          products={products}
          state={state}
          setState={setState}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={16}
        />
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  mainContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "4rem",
    },
  },
}));
export default Home;
