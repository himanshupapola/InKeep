const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ;

export const AUTH_API = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  SEND_OTP: `${BASE_URL}/auth/send-otp`,
  VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
  RESEND_OTP: `${BASE_URL}/auth/resend-otp`,
  IS_LOGGED_IN: `${BASE_URL}/isLoggedIn`,
};

export const USER_API = {
  GET_PROFILE: `${BASE_URL}/user/getProfile`,
  UPDATE_PROFILE: `${BASE_URL}/user/updateProfile`,
};

export const DIARY_API = {
  CREATE: `${BASE_URL}/diary/create`,
  GET: `${BASE_URL}/diary/get`,
  UPDATE: (id) => `${BASE_URL}/diary/update-entry/${id}`,
  DELETE: (entryId) => `${BASE_URL}/diary/delete-entry/${entryId}`,
  AVERAGE_MOOD: `${BASE_URL}/diary/average-mood`,
};
