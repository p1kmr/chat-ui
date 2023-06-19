import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatBoxes, setChatBoxes] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const addChatBox = () => {
    const newChatBox = {
      person: `Person ${chatBoxes.length + 1}`,
      messages: [],
      newMessage: ""
    };
    setChatBoxes((prevChatBoxes) => [...prevChatBoxes, newChatBox]);
  };

  const sendMessage = () => {
    if (!selectedPerson) return;

    setChatBoxes((prevChatBoxes) => {
      const updatedChatBoxes = prevChatBoxes.map((chatBox) => {
        if (chatBox.person === selectedPerson) {
          const newMessage = {
            sender: selectedPerson,
            text: chatBox.newMessage,
            timestamp: Date.now()
          };
          return {
            ...chatBox,
            messages: [...chatBox.messages, newMessage],
            newMessage: ""
          };
        }
        return chatBox;
      });
      return updatedChatBoxes;
    });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setChatBoxes((prevChatBoxes) => {
      const updatedChatBoxes = prevChatBoxes.map((chatBox) => {
        if (chatBox.person === selectedPerson) {
          return {
            ...chatBox,
            newMessage: value
          };
        }
        return chatBox;
      });
      return updatedChatBoxes;
    });
  };

  const closeChatBox = (person) => {
    setChatBoxes((prevChatBoxes) =>
      prevChatBoxes.filter((chatBox) => chatBox?.person !== person)
    );
    if (selectedPerson === person) {
      setSelectedPerson(null);
    }
  };

  const selectPerson = (person) => {
    setSelectedPerson(person);
  };

  const sortMessagesByTimestamp = () => {
    const messageArray = [];
    chatBoxes.forEach((chatBox) => {
      chatBox.messages.forEach((message) => {
        const messageDetails = {
          person: chatBox.person,
          text: message.text,
          timestamp: message.timestamp
        };
        messageArray.push(messageDetails);
      });
    });
    messageArray.sort((a, b) => a.timestamp - b.timestamp);
    return messageArray;
  };

  const sortedMessageArray = sortMessagesByTimestamp();

  const chatContextValue = {
    chatBoxes,
    selectedPerson,
    addChatBox,
    sendMessage,
    handleInputChange,
    closeChatBox,
    selectPerson,
    sortedMessageArray
  };

  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};
