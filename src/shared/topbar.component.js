import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    alignItems: "center",
    display: "flex",
    justifyItems: "space-between",
  },
  toolbar: {
    width: "60%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const TopbarComponent = () => {
  const loggedIn = useSelector((state) => state.users.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {}, [loggedIn]);

  const handleLogout = () => {
    dispatch(logout());
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            My tasklist
          </Typography>
          {loggedIn ? (
            <React.Fragment>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </React.Fragment>
          ) : (
            <div className="buttons">
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopbarComponent;
