import {GET_ROOM_MESSAGES} from '../../services/endpoints';
import {SUCCESS_CODE, UNKNOWN_ERROR_TRY_AGAIN} from '../../utils/appConstants';
import {showToast} from '../../utils/appfunctions';
import {SOCKET_EVENTS} from '../../utils/Enums';

export type IChat = IChatMessage | IChatLog;

export interface IChatMessage {
  content: string;
  id: number | string;
  created_at: string;
  room_id?: string;
  user_id?: number;
  username: string;
}

export interface IChatLog {
  username: string;
  event: SOCKET_EVENTS;
  message?: string;
}

export interface IChatPayload {
  event: string;
  content: string;
}

export const getChatMessages = async (room_id: string) => {
  try {
    const chatMessages = await GET_ROOM_MESSAGES(room_id);
    if (chatMessages && chatMessages.code === SUCCESS_CODE) {
      return chatMessages.data;
    } else {
      showToast(chatMessages.message);
      return false;
    }
  } catch (error: any) {
    showToast(error?.message || UNKNOWN_ERROR_TRY_AGAIN);
    return false;
  }
};

export const transformChatData = (data: IChatMessage[]) => {
  return data.map(item => {
    if (item.content && item.content.includes('->joinleave->codac->@#$!')) {
      const [message] = item.content.split('->joinleave->codac->@#$!');
      return {
        event: SOCKET_EVENTS.CONNECT,
        username: item?.username,
        message,
      };
    }
    return {type: SOCKET_EVENTS.MESSAGE, ...item};
  });
};
