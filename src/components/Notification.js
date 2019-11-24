import React, { useEffect, useState } from "react";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { amber, green } from "@material-ui/core/colors";
import { clear } from "../actions/notification";
import classnames from "classnames";

const typeIcons = {
  SUCCESS: CheckCircleIcon,
  WARNING: WarningIcon,
  ERROR: ErrorIcon,
  INFO: InfoIcon
};

const useStyles = makeStyles(theme => ({
  SUCCESS: {
    backgroundColor: green[600]
  },
  ERROR: {
    backgroundColor: theme.palette.error.dark
  },
  INFO: {
    backgroundColor: theme.palette.primary.main
  },
  WARNING: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

const NotificationContent = ({ type, message, handleClose }) => {
  const classes = useStyles();
  const Icon = typeIcons[type];

  return (
    <SnackbarContent
      className={classnames(classes[type])}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classnames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
    />
  );
};

const Notification = () => {
  const currentNotification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clear());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={currentNotification.type !== ""}
      onClose={handleClose}
    >
      {currentNotification.type !== "" ? (
        <NotificationContent
          handleClose={handleClose}
          type={currentNotification.type}
          message={currentNotification.message}
        />
      ) : null}
    </Snackbar>
  );
};

export default Notification;
