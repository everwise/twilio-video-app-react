import { useEffect } from 'react';
import { DataTrack as IDataTrack } from 'twilio-video';
import { useSnackbar } from 'notistack';


interface DataTrackProps {
  track: IDataTrack;
  messages?: string;
  setMessages?: (msgs: string) => void;
}

export default function DataTrack({ track, messages, setMessages }: DataTrackProps) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const handleMessage = (message: string) => {
      
      const messageModel = message && message.length ? JSON.parse(message) : null;

      if (messageModel) {
        enqueueSnackbar(`${messageModel.name} says: ${messageModel.msg}`);

        const allMessages = messages && messages.length ? JSON.parse(messages) : [];

        if (setMessages) {
          setMessages(JSON.stringify([...allMessages, messageModel]));
        }
      }
    };
    track.on('message', handleMessage);
    return () => {
      track.off('message', handleMessage);
    };
  }, [track, enqueueSnackbar, messages]);

  return null; // This component does not return any HTML, so we will return 'null' instead.
}
