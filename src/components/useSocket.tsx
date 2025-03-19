import {useState, useEffect, useCallback, useRef} from 'react';
import {CANNOT_CONNECT_TO_CHAT, ENFUND_SOCKET_API} from '../utils/appConstants';
import {SOCKET_EVENTS} from '../utils/Enums';
import {showToast} from '../utils/appfunctions';
import {useAuth} from '../context/AuthContext';

export function useSocket(initialRoomId?: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [roomId, setRoomId] = useState<string | null>(initialRoomId || null);
  const [connected, setConnected] = useState(false);
  const {userInfo} = useAuth();
  const reconnectAttempts = useRef(0);
  const maxRetries = 3;

  useEffect(() => {
    if (!roomId || !userInfo?.username) return;

    if (socket) {
      socket.close();
    }
    const socketUrl = `${ENFUND_SOCKET_API}${roomId}/${userInfo.username}`;
    const newSocket = new WebSocket(socketUrl);

    newSocket.onopen = () => {
      setConnected(true);
      reconnectAttempts.current = 0;
    };

    newSocket.onmessage = event => {};

    newSocket.onerror = error => {
      showToast(CANNOT_CONNECT_TO_CHAT);
      setConnected(false);

      if (reconnectAttempts.current < maxRetries) {
        reconnectAttempts.current += 1;
        setTimeout(() => setSocket(new WebSocket(socketUrl)), 2000);
      }
    };

    newSocket.onclose = event => {
      setConnected(false);

      if (reconnectAttempts.current < maxRetries) {
        reconnectAttempts.current += 1;
        setTimeout(() => setSocket(new WebSocket(socketUrl)), 2000);
      }
    };
    setSocket(newSocket);

    return () => {
      newSocket.close();
      setConnected(false);
    };
  }, [roomId, userInfo?.username]);

  const send = useCallback(
    (message: string) => {
      if (!socket) {
        return false;
      }

      if (socket.readyState !== WebSocket.OPEN) {
        return false;
      }

      try {
        const payload = JSON.stringify({
          event: SOCKET_EVENTS.MESSAGE,
          content: message,
        });
        socket.send(payload);
        return true;
      } catch (err) {
        showToast(`Message not sent, try again later`);
      }

      return false;
    },
    [socket],
  );

  const disconnect = useCallback(() => {
    if (socket) {
      socket.close();
      setSocket(null);
      setConnected(false);
    }
  }, [socket]);

  return {socket, connected, send, disconnect, setRoomId};
}
