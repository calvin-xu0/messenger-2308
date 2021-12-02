import React from "react";
import { Badge, Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { readMessages } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  },
  unreadCount: {
    width: "100%",
    "& .MuiBadge-badge": {
      top: "50%",
      right: "5px",
      fontWeight: "bold"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser, notificationCount } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    await props.readMessages(conversation.id);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <Badge
        className={classes.unreadCount}
        badgeContent={notificationCount}
        color="primary"
        children={<>
          <BadgeAvatar
            photoUrl={otherUser.photoUrl}
            username={otherUser.username}
            online={otherUser.online}
            sidebar={true}
          />
      
          <ChatContent conversation={conversation}/>
        </>}
      />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    readMessages: id => {
      dispatch(readMessages(id));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
