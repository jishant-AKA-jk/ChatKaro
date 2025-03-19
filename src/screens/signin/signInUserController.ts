import { ISetUsername, SET_USERNAME } from "../../services/endpoints";
import { SUCCESS_CODE, UNKNOWN_ERROR_TRY_AGAIN } from "../../utils/appConstants";
import {showToast} from "../../utils/appfunctions";

export const setUsername = async (payload: ISetUsername) => {
    try {
      const userProfile = await SET_USERNAME(payload);
      if (userProfile && userProfile.code === SUCCESS_CODE) {
        return userProfile.data;
      } else {
        showToast(userProfile.message);
        return false;
      }
    } catch (error: any) {
      showToast(error?.message || UNKNOWN_ERROR_TRY_AGAIN);
      return false;
    }
  };
