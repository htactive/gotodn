export const SHOW_NOTICE = 'SHOW_NOTICE';
export const SHOW_NOTICE_SUCCESS = 'SHOW_NOTICE_SUCCESS';
export const SHOW_NOTICE_ERROR = 'SHOW_NOTICE_ERROR';

export const action_ShowNotice: (request: any) => any = (request) => {
  return {
    type: SHOW_NOTICE,
    Request: request
  };
};

export const action_ShowNoticeSuccess:()=>any  = ()=>{
  return {
    type:SHOW_NOTICE_SUCCESS,
  }
};
export const action_ShowNoticeError:()=>any  = ()=>{
  return {
    type:SHOW_NOTICE_ERROR,
  }
};