import {API_REQEST_TYPES} from './Enums';

export const ERROR_CODE = 500;
export const SUCCESS_CODE = 200;
export const UNKNOWN_ERROR_OCCURRED = 'Unknown error occurred';
export const SOMETHING_WENT_WRONG = 'Something went wrong';
export const CANNOT_CONNECT_TO_CHAT =
  'Error occurred while connecting to chat,Please join chat again';
export const UNKNOWN_ERROR_TRY_AGAIN = 'Unknown error, Try again';
export const WELCOME_TO_APP =
  'Welcome to ChatKaro! , You can create or join chat room.';

export const AUTH_STORAGE_KEY = '@app_auth_state';

export const ENFUND_API = 'https://chat-api-k4vi.onrender.com';
export const ENFUND_SOCKET_API = 'wss://chat-api-k4vi.onrender.com/ws/';
export const ENFUND_API_ENDPOINTS = {
  set_username: {url: '/chat/username', method: API_REQEST_TYPES.POST},
  get_all_room: {
    url: '/chat/rooms',
    method: API_REQEST_TYPES.GET,
  },
  create_room: {url: '/chat/rooms', method: API_REQEST_TYPES.POST},

  get_room_by_id: {
    url: '/chat/rooms',
    method: API_REQEST_TYPES.GET,
  },
  get_room_messages: {
    url: '/chat/rooms/',
    method: API_REQEST_TYPES.GET,
  },
};

//websocket ws://chat-api-k4vi.onrender.com/ws/{roomID}/{username}
