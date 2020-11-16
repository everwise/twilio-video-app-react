import React from 'react';
import ParticipantInfo from '../ParticipantInfo/ParticipantInfo';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';
import { Participant as IParticipant } from 'twilio-video';

interface ParticipantProps {
  participant: IParticipant;
  videoOnly?: boolean;
  enableScreenShare?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
  isDominantSpeaker?: boolean;
  isLocalParticipant?: boolean;
  hideParticipant?: boolean;
  messages: string;
  setMessages: (msgs: string) => void;
}

export default function Participant({
  participant,
  videoOnly,
  enableScreenShare,
  onClick,
  isSelected,
  isLocalParticipant,
  hideParticipant,
  messages,
  setMessages
}: ParticipantProps) {
  return (
    <ParticipantInfo
      participant={participant}
      onClick={onClick}
      isSelected={isSelected}
      isLocalParticipant={isLocalParticipant}
      hideParticipant={hideParticipant}
    >
      <ParticipantTracks
        participant={participant}
        videoOnly={videoOnly}
        enableScreenShare={enableScreenShare}
        isLocalParticipant={isLocalParticipant}
        messages={messages}
        setMessages={setMessages}
      />
    </ParticipantInfo>
  );
}
