import {ENFUND_API_ENDPOINTS} from '../utils/appConstants';
import {serviceHandler} from './serviceHandler';

export interface ISetUsername {
  username: string;
}

export interface ICreateRoomName {
  name: string;
}

export const SET_USERNAME = (payload: ISetUsername) => {
  return serviceHandler(
    ENFUND_API_ENDPOINTS.set_username.url,
    ENFUND_API_ENDPOINTS.set_username.method,
    payload,
  );
};

export const GET_ALL_CHATROOMS = () => {
  return serviceHandler(
    ENFUND_API_ENDPOINTS.get_all_room.url,
    ENFUND_API_ENDPOINTS.get_all_room.method,
  );
};

export const CREATE_ROOM = (payload: ICreateRoomName) => {
  return serviceHandler(
    ENFUND_API_ENDPOINTS.create_room.url,
    ENFUND_API_ENDPOINTS.create_room.method,
    payload,
  );
};

export const GET_ROOM_MESSAGES = (room_id:string) => {
    return serviceHandler(
      ENFUND_API_ENDPOINTS.get_room_messages.url+  room_id + `/messages`,
      ENFUND_API_ENDPOINTS.get_room_messages.method,
    );
  };
