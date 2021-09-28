import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box, Divider, Grid, IconButton, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './Chat.scss';
import { SocketContext } from '../../socketContext';
import { MemberCard } from '../MemberCard/MemberCard';
import { Message } from '../../models/Message';
import { UserModel } from '../../models/userModel';
import { useAppSelector } from '../../store/hooks/hooks';

interface Props {
  kickMember: (kicked: Message, userAgainst: UserModel) => void;
  checkUser: (member: Message) => boolean;
}

export function Chat(props: Props): JSX.Element {
  const { kickMember, checkUser } = props;
  const user = useAppSelector((state) => state.user.user) as UserModel;
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { socket } = useContext(SocketContext);
  const scrollRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    socket?.on('message', (chatMessage: Message) => {
      setMessages((chatMessages) => [...chatMessages, chatMessage]);
    });

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }, [messages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message) {
      socket?.emit('message', message);
      setMessage('');
    }
  };

  return (
    <Grid className="chat" container direction="column" wrap="nowrap">
      <List className="chat__message-list">
        {messages.map((chatMessage, index) => (
          <ListItem ref={index === messages.length - 1 ? scrollRef : null} key={chatMessage.messageId}>
            {chatMessage.type === 'system' ? (
              <Grid className="chat__message chat__message--system" container wrap="nowrap">
                <Grid item xs="auto">
                  <MemberCard
                    name={chatMessage.firstname}
                    lastname={chatMessage.lastname}
                    position={chatMessage.position}
                    src={chatMessage.avatar}
                    kickButtonDisplay={false}
                  />
                </Grid>
                <Grid className="chat__text-wrapper" item xs="auto">
                  <ListItemText className="chat__text" primary={chatMessage.text} />
                </Grid>
              </Grid>
            ) : (
              <Grid className="chat__message" container wrap="nowrap">
                <Grid className="chat__text-wrapper" item xs="auto">
                  <ListItemText className="chat__text" primary={chatMessage.text} />
                </Grid>
                <Grid item xs="auto">
                  <MemberCard
                    name={chatMessage.firstname}
                    lastname={chatMessage.lastname}
                    position={chatMessage.position}
                    src={chatMessage.avatar}
                    kickButtonDisplay={checkUser(chatMessage)}
                    onKick={() => {
                      kickMember(chatMessage, user);
                    }}
                  />
                </Grid>
              </Grid>
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
      <form onSubmit={handleSubmit}>
        <Box display="flex">
          <TextField
            className="chat__field"
            name="message"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            value={message}
            label="Message"
            autoComplete="off"
          />
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        </Box>
      </form>
    </Grid>
  );
}
