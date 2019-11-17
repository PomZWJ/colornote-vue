import fetch from '../config/fetch'

export const getAllNote = (userId)=>{
  let data = {
    "userId":userId
  }
  let response = fetch('/note/getAllNoteInfo',data);
  return response;
}

export const getUserInfo = (userId,token)=>{
  let data = {
    "userId":userId,
    "token":token
  }
  let response = fetch('/user/getCurrentLoginUserInfo',data);
  return response;
}

export const getUserIndexInfo = (userId)=>{
  let data = {
    "userId":userId
  }
  let response = fetch('/user/getUserIndexInfo',data);
  return response;
}
