import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box, Divider, Grid, IconButton, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './Chat.scss';
import { SocketContext } from '../../socketContext';
import { MemberCard } from '../MemberCard/MemberCard';
import { Message } from '../../models/Message';
import { UserModel } from '../../models/userModel';
import { useAppSelector } from '../../store/hooks/hooks';
import { checkUser, kickMember } from '../../helpers/utils';

export function Chat(): JSX.Element {
  const user = useAppSelector((state) => state.user.user) as UserModel;
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { socket } = useContext(SocketContext);
  const scrollRef = useRef<HTMLLIElement>(null);
  const users = useAppSelector((state) => state.users.users);
  const members = users.filter((member) => member.role !== 'scram-master');
  const isVoting = useAppSelector((state) => state.voting.isVoting);

  const handleMessages = (chatMessage: Message) => {
    setMessages((chatMessages) => [...chatMessages, chatMessage]);
  };

  useEffect(() => {
    socket?.on('message', handleMessages);

    return () => {
      socket?.off('message', handleMessages);
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
                    kickButtonDisplay={checkUser(socket, chatMessage, members, isVoting)}
                    onKick={() => {
                      kickMember(socket, chatMessage, user);
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
