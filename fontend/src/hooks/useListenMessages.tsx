import { useEffect } from 'react';

import { useSocketContext } from '@/contexts/SocketContext';
import useConversation from './useConversation';
import { sounds } from '@/assets/sounds';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(sounds.notificationsound);
            sound.play();
            setMessages([...messages, newMessage]);
        });

        return () => socket?.off('newMessage');
    }, [socket, setMessages, messages]);
};
export default useListenMessages;
