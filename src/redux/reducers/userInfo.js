import { GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL } from '@actions/userInfo';

const initState = {
  isLoading: false,
  userInfo: {},
  errorMsg: ''
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        useInfo: {},
        errorMsg: ''
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.userInfo,
        errorMsg: ''
      };
    case GET_USER_INFO_FAIL:
      return {
        ...state,
        loading: false,
        userInfo: {},
        errorMsg: '请求错误'
      };
    default:
      return state;
  }
}
