import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { ChatContext } from "../context/ChatContext";

const useStyles = makeStyles((theme) => ({
  chatBoxMessages: {
    marginBottom: theme.spacing(1),
  },
  messageContainer: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: theme.spacing(1),
  },
  messageBubble: {
    maxWidth: "80%",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    display: "inline-block",
    wordWrap: "break-word",
    marginLeft: theme.spacing(1),
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Arial, sans-serif",
  },
  selfMessageContainer: {
    justifyContent: "flex-end",
  },
  selfMessageBubble: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 500,
    borderRadius: "12px",
  },
  otherMessageBubble: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontWeight: 400,
    borderRadius: "12px",
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: theme.spacing(0.5),
    fontSize: "12px",
  },
}));

const Message = ({ chatBox }) => {
  const { selectedPerson } = useContext(ChatContext);
  const classes = useStyles();

  const isSelfMessage = chatBox.person === selectedPerson;

  return (
    <div className={classes.chatBoxMessages}>
      <div
        className={`${classes.messageContainer} ${
          isSelfMessage ? classes.selfMessageContainer : ""
        }`}
      >
        {!isSelfMessage && (
          <div className={classes.senderName}>{chatBox.person}</div>
        )}
        <div
          className={`${classes.messageBubble} ${
            isSelfMessage ? classes.selfMessageBubble : classes.otherMessageBubble
          }`}
        >
          {chatBox.text}
        </div>
      </div>
    </div>
  );
};

export default Message;
