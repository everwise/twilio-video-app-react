import React, { useState, useRef, useEffect } from 'react';
import { Button, FormControl, TextField } from '@material-ui/core';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  }
});

interface Message { 
  id: number;
  name: string;
  msg: string;
}

interface MessagesDisplayProps {
  messages: Message[];
}

interface ChatInputProps {
  messages: string;
  setMessages: (msgs: string) => void;
}

export default function ChatInput({messages, setMessages}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const { room } = useVideoContext();

  const allMessages = messages && messages.length ? JSON.parse(messages) : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (message) {
      // Get the LocalDataTrack that we published to the room.
      const [localDataTrackPublication] = [...room.localParticipant.dataTracks.values()];

      // Construct a message to send
      const messageModel = {
        id: allMessages.length,
        name: room.localParticipant.identity.split(':')[0],
        msg: message,
      };
      // Send the message to the other party
      localDataTrackPublication.track.send(JSON.stringify(messageModel));

      // add to local cache of messages     
      setMessages(JSON.stringify([...allMessages, messageModel]));

      //Reset the text field
      setMessage('');
    }
  };

  const MessagesDisplay = ({messages}: MessagesDisplayProps) => {

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
      if (messagesEndRef.current !== null) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }

    useEffect(scrollToBottom, [messages]);

    return (
      <>
        {messages.map(m => (
          <p key={m.id} style={{fontSize: '13px'}}>
            <span style={{color: 'blue'}}>{m.name}:</span> {m.msg}
          </p>
        ))}
        <div ref={messagesEndRef} />
      </>
    );
  }

  const classes = useStyles();
  return (
    <div>
      <div id="messages-container" style={{ color: 'black', maxHeight: '200px', overflow: 'auto' }}>
        <MessagesDisplay messages={allMessages}/>
      </div>

      <form autoComplete="off" style={{ display: 'flex', alignItems: 'center' }} onSubmit={handleSubmit}>
        <FormControl>
          <label htmlFor="chat-snack-input" style={{ color: 'black' }}>
            Enter Message:
          </label>
          <TextField InputProps={{ classes }} value={message} autoFocus={true} onChange={handleChange} id="chat-snack-input" size="small" />
        </FormControl>
        <Button type="submit" color="primary" variant="contained" style={{ marginLeft: '0.8em' }}>
          Send
        </Button>
      </form>
    </div>
  );
}
