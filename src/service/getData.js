import fetch from '../config/fetch'
import { setStore,getStore,removeStore } from '@/config/mUtils' // 本地存储方法封装
export const userlogin = (userId,verificationCode)=>{
  let data = {
    "userId":userId,
    "verificationCode":verificationCode,
  }
  let response = fetch('/user/login',data);
  return response;
}

export const sendVerificationCode = (userId)=>{
  let data = {
    "userId":userId,
  }
  let response = fetch('/user/sendVerificationCode',data);
  return response;
}

export const determineUserTokenIsCorrect = ()=>{
  let data = {
    "userId":getStore("userId"),
    "toekn":getStore("token"),
  }
  let response = fetch('/user/determineUserTokenIsCorrect',data);
  return response;
}
//开始拦截
export const getAllNote = (noteContent,noteKindId,isFav)=>{
  let data = {
    "userId":getStore("userId"),
    "noteContent":noteContent,
    "noteKindId":noteKindId,
    "isFav":isFav,
    "token":getStore("token")
  }
  let response = fetch('/note/getAllNoteInfo',data);
  return response;
}

export const getUserInfo = ()=>{
  let data = {
    "userId":getStore("userId"),
    "token":getStore("token")
  }
  let response = fetch('/user/getCurrentLoginUserInfo',data);
  return response;
}

export const getUserIndexInfo = ()=>{
  let data = {
    "userId":getStore("userId"),
    "token":getStore("token")
  }
  let response = fetch('/user/getUserIndexInfo',data);
  return response;
}

export const getSystemCurrentTime = ()=>{
  let data = {
    "userId":getStore("userId"),
    "token":getStore("token")
  }
  let response = fetch('/common/getSystemCurrentTime',data);
  return response;
}

export const getAllNoteKindByUserId = ()=>{
  let data = {
    "userId":getStore("userId"),
    "token":getStore("token")
  }
  let response = fetch('/noteKind/getAllNoteKindByUserId',data);
  return response;
}

export const addUserNoteInfo = (noteKindId,noteContent,noteTime)=>{
  let data = {
    "userId":getStore("userId"),
    "token":getStore("token"),
    "noteKindId": noteKindId,
    "noteContent": noteContent,
    "noteTime": noteTime
  }
  let response = fetch('/note/addUserNoteInfo',data);
  return response;
}

export const getUserNoteByNoteId = (noteId)=>{
  let data = {
    "userId":getStore("userId"),
    "token":getStore("token"),
    "noteId": noteId
  }
  let response = fetch('/note/getUserNoteByNoteId',data);
  return response;
}

export const updateNoteFavState = (noteId,favState)=>{
  let data = {
    "userId":getStore("userId"),
    "token":getStore("token"),
    "noteId": noteId,
    "favState": favState
  }
  let response = fetch('/note/updateNoteFavState',data);
  return response;
}

export const deleteNoteToRubbishByUserIdAndNoteId = (noteId)=>{
  let data = {
    "userId":getStore("userId"),
    "token":getStore("token"),
    "noteId": noteId
  }
  let response = fetch('/note/deleteNoteToRubbishByUserIdAndNoteId',data);
  return response;
}

export const updateUserNoteInfo = (noteId,noteKindId,noteContent,noteTime)=>{
  let data = {
    "userId":getStore("userId"),
    "token":getStore("token"),
    "noteId": noteId,
    "noteKindId": noteKindId,
    "noteContent": noteContent,
    "noteTime": noteTime
  }
  let response = fetch('/note/updateUserNoteInfo',data);
  return response;
}

export const addNoteKind = (noteKindName,noteKindUrl)=>{
  let data = {
    "userId":getStore("userId"),
    "token":getStore("token"),
    "noteKindName": noteKindName,
    "noteKindUrl": noteKindUrl
  }
  let response = fetch('/noteKind/addNoteKind',data);
  return response;
}

export const getAllNoteKindByUserIdWithoutNull = ()=>{
  let data = {
    "userId":getStore("userId"),
    "token":getStore("token")
  }
  let response = fetch('/noteKind/getAllNoteKindByUserIdWithoutNull',data);
  return response;
}

export const deleteNoteKindByNoteKindId = (noteKindId)=>{
  let data = {
    "userId":getStore("userId"),
    "token":getStore("token"),
    "noteKindId": noteKindId
  }
  let response = fetch('/noteKind/deleteNoteKindByNoteKindId',data);
  return response;
}

export const updateNoteKindByUserId = (params)=>{
  let data = {
    "userId":getStore("userId"),
    "token":getStore("token"),
    "params": JSON.stringify(params)
  }
  let response = fetch('/noteKind/updateNoteKindByUserId',data);
  return response;
}

export const tryAccountLogin = ()=>{
  let data = {
  }
  let response = fetch('/user/tryAccountLogin',data);
  return response;
}

