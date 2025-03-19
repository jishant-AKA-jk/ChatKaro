import {CREATE_ROOM, GET_ALL_CHATROOMS, ICreateRoomName} from '../../services/endpoints';
import {SUCCESS_CODE, UNKNOWN_ERROR_TRY_AGAIN} from '../../utils/appConstants';
import {showToast} from '../../utils/appfunctions';

export const getChatRooms = async () => {
  try {
    const chatrooms = await GET_ALL_CHATROOMS();
    if (chatrooms && chatrooms.code === SUCCESS_CODE) {
      return chatrooms.data;
    } else {
      showToast(chatrooms.message);
      return false;
    }
  } catch (error: any) {
    showToast(error?.message || UNKNOWN_ERROR_TRY_AGAIN);
    return false;
  }
};


export const createChatRooms = async (payload:ICreateRoomName) => {
    try {
      const chatroom = await CREATE_ROOM(payload);
      if (chatroom && chatroom.code === SUCCESS_CODE) {
        return chatroom.data;
      } else {
        showToast(chatroom.message);
        return false;
      }
    } catch (error: any) {
      showToast(error?.message || UNKNOWN_ERROR_TRY_AGAIN);
      return false;
    }
  };
