import {
  SHOW_NOTICE_ERROR,SHOW_NOTICE_SUCCESS,SHOW_NOTICE
} from "./_actions";
const reducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case SHOW_NOTICE_ERROR:
      window['notice_error']();
      break;
    case SHOW_NOTICE_SUCCESS:
      window['notice_save_success']();
      break;
    case SHOW_NOTICE:
      let {noticeType, noticeTitle, noticeText, icon, noticeTime, closeIcon} = action.Request;
      window['notice'](noticeType, noticeTitle, noticeText, icon, noticeTime, closeIcon);
      break;
  }
  return state;
};

export default reducer;