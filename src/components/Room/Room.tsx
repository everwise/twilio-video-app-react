import React from 'react';
import ParticipantList from '../ParticipantList/ParticipantList';
import { styled } from '@material-ui/core/styles';
import MainParticipant from '../MainParticipant/MainParticipant';

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: `1fr ${theme.sidebarWidth}px`,
  gridTemplateRows: '100%',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: `100%`,
    gridTemplateRows: `1fr ${theme.sidebarMobileHeight + 16}px`,
  },
}));

interface RoomProps { 
  messages?: string;
  setMessages?: (msgs: string) => void;
}

export default function Room({
  messages,
  setMessages
}: RoomProps) {
  return (
    <Container>
      <MainParticipant messages={messages} setMessages={setMessages} />
      <ParticipantList messages={messages} setMessages={setMessages} />
    </Container>
  );
}
