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
}));

const History = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [rows, setRows] = React.useState([]);

  function createData(name, category, cost, date) {
    return { name, category, cost, date: date.split("T")[0] };
  }
  React.useEffect(() => {
    dispatch(getUser());
    if (user && Object.keys(rows).length === 0) {
      user.redeemHistory.map((item) => {
        return setRows((oldRows) => [
          ...oldRows,
          createData(item.name, item.category, item.cost, item.createDate),
        ]);
      });
    }
  }, [dispatch, user]);

  return (
    <div className={classes.mainContainer}>
      <h1 className={classes.title}>Purchase History</h1>
      <div className={classes.listContainer}>
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
              {rows.map((row) => (
                <TableRow key={row.name}>
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
export default History;
