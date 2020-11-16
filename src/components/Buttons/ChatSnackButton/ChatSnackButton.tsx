import React, { useState } from 'react';
import ChatIcon from '@material-ui/icons/CommentOutlined';
import ChatInput from './ChatInput';
import { Button, Tooltip, withStyles } from '@material-ui/core';

const LightTooltip = withStyles({
  tooltip: {
    backgroundColor: '#fafafa',
  },
  arrow: {
    color: '#fafafa',
  },
})(Tooltip);

interface ChatButtonProps {
  messages: string;
  setMessages: (msgs: string) => void;
}

export default function ChatSnackButton({ 
  messages,
  setMessages
}: ChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // used to use <ClickAwayListener onClickAway={() => setIsOpen(false)}>
  return (
    <LightTooltip title={<ChatInput messages={messages} setMessages={setMessages} />} interactive placement="top" arrow={true} open={isOpen}>
      <Button onClick={() => setIsOpen(isOpen => !isOpen)} startIcon={<ChatIcon />}>
        Messages
      </Button>
    </LightTooltip>
  );
}
