// @mui
import Box from '@mui/material/Box';
// types
// import { IChatParticipant, IChatMessage } from 'src/types/chat';
// components
import Scrollbar from 'src/components/scrollbar/scrollbar';
import Lightbox from 'src/components/lightbox/lightbox';
import useLightBox  from 'src/components/lightbox/use-light-box';
//
import  useMessagesScroll  from './hooks/use-messages-scroll';
import ChatMessageItem from './chat-message-item';

// ----------------------------------------------------------------------

type Props = {
  messages: any[];
  participants: any[];
};

export default function ChatMessageList({ messages = [], participants }: Props) {
  const { messagesEndRef } = useMessagesScroll(messages);

  const slides = messages
    .filter((message) => message.contentType === 'image')
    .map((message) => ({ src: message.body }));

  const lightbox = useLightBox(slides);

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          {messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
              participants={participants}
              onOpenLightbox={() => lightbox.onOpen(message.body)}
            />
          ))}
        </Box>
      </Scrollbar>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}
