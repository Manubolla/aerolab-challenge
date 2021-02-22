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

const History = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [rows, setRows] = React.useState([]);
  const [activeButton, setActiveButton] = React.useState({
    older: true,
    name: "oldest",
  });

  const createData = (name, category, cost, date, id) => ({
    name,
    category,
    cost,
    date: date.split("T")[0],
    id,
  });
  const handleRows = (type) => {
    switch (type) {
      case "older":
        setRows((oldRows) => oldRows.sort((a, b) => (new Date(a.date) - new Date(b.date))));
        break;
      case "newer":
        setRows((oldRows) => oldRows.sort((a, b) => (new Date(b.date) - new Date(a.date))));
        break;
      case "highest":
        setRows((oldRows) => oldRows.sort((a, b) => b.cost - a.cost));
        break;
      case "lowest":
        setRows((oldRows) => oldRows.sort((a, b) => a.cost - b.cost));
        break;
      default:
        return rows;
    }
  };
  React.useEffect(() => {
    dispatch(getUser());
    if (user && Object.keys(rows).length === 0) {
      user &&
        user.redeemHistory.map((item) => {
          const data = createData(
            item.name,
            item.category,
            item.cost,
            item.createDate,
            item._id
          );
          return setRows((oldRows) => [...oldRows, data]);
        });
    }
  }, []);

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
                rows.map((row) => (
                  <TableRow key={parseInt(row.id) * Math.random()}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">{row.cost}</TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
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
  groupButtons:{
    [theme.breakpoints.down('sm')]: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      alignItems: "center"
    }
  }
}));
export default History;
