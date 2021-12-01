import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  unreadCount: unreadMessageCount => {
    const unreadCountClass = {
      background: "#1e88e5",
      color: "white",
      fontWeight: "bold",
      fontSize: 12,
      minWidth: "18px",
      textAlign: "center"
    }

    if (Number(unreadMessageCount) / 10 >= 1) {
      unreadCountClass.borderRadius = "12px";
      unreadCountClass.padding = "0 1ch";
    } else {
      unreadCountClass.borderRadius = "50%";
    }
    return unreadCountClass;
  }
}))

const ChatNotification = (props) => {
  const { unreadMessageCount } = props;
  const classes = useStyles(unreadMessageCount);

  return (
    <Typography className={classes.unreadCount}>
      {unreadMessageCount}
    </Typography>
  );
};

export default ChatNotification;