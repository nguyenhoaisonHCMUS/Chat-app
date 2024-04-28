import { RootState } from '@/redux/store';
import {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from 'react';
import { useSelector } from 'react-redux';
import io, { Socket } from 'socket.io-client';

interface SocketContextProps {
    socket: Socket | null;
    onlineUsers: string[];
}

const SocketContext = createContext<SocketContextProps>({
    socket: null,
    onlineUsers: [],
});

export const useSocketContext = () => {
    return useContext(SocketContext);
};

interface SocketContextProviderProps {
    children: ReactNode;
}

export const SocketContextProvider = ({
    children,
}: SocketContextProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const authUser = useSelector(
        (state: RootState) => state.auth.currentUser.user,
    );

    useEffect(() => {
        if (authUser) {
            const newSocket = io('https://chat-app-yt.onrender.com', {
                query: {
                    userId: authUser.userId,
                },
            });

            setSocket(newSocket);

            newSocket.on('getOnlineUsers', (users: string[]) => {
                setOnlineUsers(users);
            });

            return () => {
                newSocket.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser, socket]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
