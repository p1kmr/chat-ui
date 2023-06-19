import React, { useContext } from "react";
import { Button, TextareaAutosize, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ChatContext } from "./context/ChatContext";
import ChatBox from "./components/ChatBox";
import Message from "./components/Message";

const useStyles = makeStyles((theme) => ({
  appContainer: {
    textAlign: "center",
    padding: theme.spacing(2),
  },
  chatContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
  chatList: {
    width: "40%",
  },
  messageContainer: {
    width: "60%",
    border: '1px solid',
    borderRadius: '10px',
    marginLeft: '10px',
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  inputTextArea: {
    width: "70%",
    padding: theme.spacing(1),
    resize: "none",
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    "&:focus": {
      outline: "none",
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  sendButton: {
    marginLeft: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const {
    chatBoxes,
    selectedPerson,
    sortedMessageArray,
    addChatBox,
    sendMessage,
    handleInputChange,
  } = useContext(ChatContext);

  return (
    <div className={`${classes.appContainer} ${classes.darkMode}`}>
      <Typography variant="h4" gutterBottom>
        Chat Box Application
      </Typography>
      <Button variant="contained" onClick={addChatBox}>
        Add Person in Chat
      </Button>
      <div className={classes.chatContainer}>
        <div className={classes.chatList}>
          {chatBoxes.map((chatBox) => (
            <ChatBox key={chatBox.person} chatBox={chatBox} />
          ))}
        </div>
        <div className={classes.messageContainer}>
        
          {sortedMessageArray.map((chatBox) => (
            <Message key={chatBox.timestamp} chatBox={chatBox} />
          ))}
        </div>
      </div>
      <div className={classes.inputContainer}>
        <TextareaAutosize
          className={`${classes.inputTextArea} ${classes.whiteColor}`}
          value={
            selectedPerson
              ? chatBoxes.find((chatBox) => chatBox.person === selectedPerson)
                  ?.newMessage
              : ""
          }
          onChange={handleInputChange}
          disabled={!selectedPerson}
        />
        <Button
          className={classes.sendButton}
          variant="contained"
          onClick={sendMessage}
          disabled={!selectedPerson}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default App;
