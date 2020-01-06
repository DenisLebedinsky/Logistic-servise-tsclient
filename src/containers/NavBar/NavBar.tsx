import React from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    nav: {
      display: "flex",
      flexWrap: "wrap"
    },
    tab: {
      color: "white"
    }
  })
);

export default function NavVar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.tab}>
          <Link to="/">Отправления</Link>
        </Typography>

        <Typography variant="h6" className={classes.tab}>
          <Link to="/">Отправления</Link>
        </Typography>

        <Typography variant="h6" className={classes.tab}>
          <Link to="/">Отправления</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
