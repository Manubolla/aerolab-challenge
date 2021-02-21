import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../../assets/aerolab-logo.svg";
import coin from "../../assets/icons/coin.svg";
import { Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import avatarPhoto from '../../assets/avatar.png'
import { addCoins } from "../../redux/actions";

const TopBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  return (
    <>
      <AppBar position="fixed" color="default">
        <Toolbar className={classes.toolbar}>
           <Link to='/'> <img src={logo} alt="logo" /></Link>
          {/* <Link to="/history">History</Link> */}
          <div className={classes.userToolbar}>
            <Tooltip title="Get 5000 coins">
              <button className={classes.coinToolbar} onClick={() => dispatch(addCoins())}> 
                <p>{user.points}</p>
                <img src={coin} alt="coin" width="25rem"></img>
              </button>
            </Tooltip>
            <Tooltip title='Look what products you bought!'>
            <div className={classes.userProfile} onClick={ () => history.push('/history')}>
              <p>{user.name}</p>
              <Avatar className={classes.avatar} alt="Travis Howard" src={avatarPhoto}/>
            </div>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  userToolbar: {
    display: "flex",
    alignItems: "center",
    width: "20%",
    
  },
  coinToolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    borderRadius: "1rem",
    padding: "0 1rem 0 1rem",
    marginLeft: "1rem",
    border: 'none'
  },
  header: {
    width: "100%",
    height: "75%",
  },
  userProfile: {
    display: "flex",
    width: "50%",
    justifyContent: "space-evenly",
    textAlign: "center",
    alignItems: "center"
  },
}));
export default TopBar;
