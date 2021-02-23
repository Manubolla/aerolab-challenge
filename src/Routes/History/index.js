import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FilterButton from "../../components/FilterButton";
import { TablePagination } from "@material-ui/core";

const History = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [activeButton, setActiveButton] = React.useState({
    older: true,
    name: "older",
  });
  const rowsRef = React.useRef([]);

  const createData = (name, category, cost, date, id) => ({
    name,
    category,
    cost,
    date: date.split("T")[0],
    id,
  });
  const handleRows = (type, pagina) => {
    let products = [...rowsRef.current];
    let firstIdx = rowsPerPage * (pagina === undefined ? 0 : pagina);
    let secondIdx = rowsPerPage * (pagina === undefined ? 1 : pagina + 1);
    switch (type) {
      case "older":
        products.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "newer":
        products.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "highest":
        products.sort((a, b) => b.cost - a.cost);
        break;
      case "lowest":
        products.sort((a, b) => a.cost - b.cost);
        break;
      default:
        return rows;
    }
    setRows(products.slice(firstIdx, secondIdx));
    if (pagina === undefined) setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    return handleRows(activeButton.name, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* When the history page render */
  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  
  /* To update the list, any other way to do this? */
  React.useEffect(() => {
    if (user) {
      const newData = user.redeemHistory.map((item) =>
        createData(
          item.name,
          item.category,
          item.cost,
          item.createDate,
          item._id
        )
      );
      setRows((oldRows) => [...newData].slice(0, rowsPerPage));
      rowsRef.current = newData;
    }
  }, [user, rowsPerPage]);

  return (
    <div className={classes.mainContainer}>
      <h1 className={classes.title}>Purchase History</h1>
      <div className={classes.listContainer}>
        <div className={classes.groupButtons}>
          <FilterButton
            text="Older purchase"
            type="older"
            state={rows}
            setState={setRows}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            pagination={handleRows}
          />
          <FilterButton
            text="Newer purchase"
            type="newer"
            state={rows}
            setState={setRows}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            pagination={handleRows}
          />
          <FilterButton
            text="Highest price"
            type="highest"
            state={rows}
            setState={setRows}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            pagination={handleRows}
          />
          <FilterButton
            text="Lowest price"
            type="lowest"
            state={rows}
            setState={setRows}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            pagination={handleRows}
          />
        </div>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell align="right">Purchase Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row) => {
                  return (
                    <TableRow key={parseInt(row.id) * Math.random()}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                      <TableCell align="right">{row.cost}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsRef.current.length ? rowsRef.current.length : 1}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "4rem",
    alignItems: "center",
  },
  listContainer: {
    width: "75%",
  },
  groupButtons: {
    [theme.breakpoints.down("sm")]: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      alignItems: "center",
    },
  },
}));
export default History;
