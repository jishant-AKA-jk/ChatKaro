import Axios from 'axios';

import {API_REQEST_TYPES} from '../utils/Enums';
import {ERROR_CODE, UNKNOWN_ERROR_OCCURRED} from '../utils/appConstants';

const baseURL = 'https://chat-api-k4vi.onrender.com';
export const CONFIG = Axios.create({
  baseURL,
});

interface IResponse {
  data: any;
  status?: string | number;
  code: string | number;
  message: string;
  response?: any;
}

export const serviceHandler = async (
  url: string,
  method: string,
  data: any = {},
): Promise<IResponse> => {
  try {
    let result;
    let APIInstance = CONFIG;
    switch (method) {
      case API_REQEST_TYPES.GET: {
        result = await APIInstance.get(url);
        break;
      }
      case API_REQEST_TYPES.POST: {
        result = await APIInstance.post(url, data);
        break;
      }
      case API_REQEST_TYPES.PUT: {
        result = await APIInstance.put(url, data);
        break;
      }
      default: {
        return {
          data: {},
          status: 'error',
          code: ERROR_CODE,
          message: 'InvalidMethod called',
        };
      }
    }
    const responseData = {data: result.data, code: result.status, message: ''};
    return responseData;
  } catch (error: any) {
    try {
      if (error) {
        return {
          data: error.response.data.detail,
          code: error.response.status,
          message: error.response.data.detail
            ? error.response.data.detail[0].msg
            : error.message ?? UNKNOWN_ERROR_OCCURRED,
          status: error.status || 'error',
          response: error.response,
        };
      }
      return {
        data: error,
        status: 'error',
        code: ERROR_CODE,
        message: UNKNOWN_ERROR_OCCURRED,
      };
    } catch (e) {
      return {
        data: error,
        status: 'error',
        code: ERROR_CODE,
        message: UNKNOWN_ERROR_OCCURRED,
      };
    }
  }
};
