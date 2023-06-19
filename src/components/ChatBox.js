import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { ChatContext } from "../context/ChatContext";

const useStyles = makeStyles((theme) => ({
  chatBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    cursor: "pointer",
    transition: "background-color 0.3s",
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    color: theme.palette.text.secondary,
    cursor: "pointer",
    transition: "color 0.3s",
    "&:hover": {
      color: theme.palette.error.main,
    },
  },
}));

const ChatBox = ({ chatBox }) => {
  const { selectedPerson, selectPerson, closeChatBox } = useContext(ChatContext);
  const classes = useStyles();

  return (
    <div
      className={`${classes.chatBox} ${
        chatBox.person === selectedPerson ? "selected" : ""
      }`}
      onClick={() => selectPerson(chatBox.person)}
    >
      {chatBox.person}
      <Button
        className={classes.closeButton}
        onClick={() => closeChatBox(chatBox.person)}
      >
        x
      </Button>
    </div>
  );
};

export default ChatBox;
