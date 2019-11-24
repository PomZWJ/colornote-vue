import fetch from '../config/fetch'
let userId = "912094062@qq.com";
let token = "BGJzSe3tuLHmyMWgrNDFZZPn3BeFguhEGuOIc7EVxAsNjRVrpZ6EDttvK9f0P1VGPDYdqtFk4lWzitFnDNO5SvrgmmJIHpV1OUORLRx1so8WBJ6PMavkmxuxUECtzDTC5191DX+yEV4/ZBdRge+6mjBSO7Gu4Bw0pwlra614jvUubaxkBeJZBuxoxu5RUyZ2tq6UQ5eWvxmwSehkZV2y+AtynlZhzGUlRPYR1FcpTdRGOLXYBYIQJSSYAQd6hktgX/gTW0soAfqcGMdwnCvRkSY5DaX/mVCvFAoGosrFm4g2+nIgrBld5z/PtwdAvR3THlxrQNjvUfd05yRzwlfQ4g==";
export const getAllNote = ()=>{
  let data = {
    "userId":userId
  }
  let response = fetch('/note/getAllNoteInfo',data);
  return response;
}

export const getUserInfo = ()=>{
  let data = {
    "userId":userId,
    "token":token
  }
  let response = fetch('/user/getCurrentLoginUserInfo',data);
  return response;
}

export const getUserIndexInfo = ()=>{
  let data = {
    "userId":userId
  }
  let response = fetch('/user/getUserIndexInfo',data);
  return response;
}

export const getSystemCurrentTime = ()=>{
  let response = fetch('/common/getSystemCurrentTime');
  return response;
}

export const getAllNoteKindByUserId = ()=>{
  let data = {
    "userId":userId
  }
  let response = fetch('/noteKind/getAllNoteKindByUserId',data);
  return response;
}

export const addUserNoteInfo = (noteKindId,noteContent,noteTime)=>{
  let data = {
    "userId": userId,
    "noteKindId": noteKindId,
    "noteContent": noteContent,
    "noteTime": noteTime
  }
  let response = fetch('/note/addUserNoteInfo',data);
  return response;
}

export const getUserNoteByNoteId = (noteId)=>{
  let data = {
    "userId": userId,
    "noteId": noteId
  }
  let response = fetch('/note/getUserNoteByNoteId',data);
  return response;
}

export const updateNoteFavState = (noteId,favState)=>{
  let data = {
    "userId": userId,
    "noteId": noteId,
    "favState": favState
  }
  let response = fetch('/note/updateNoteFavState',data);
  return response;
}

export const deleteNoteToRubbishByUserIdAndNoteId = (noteId)=>{
  let data = {
    "userId": userId,
    "noteId": noteId
  }
  let response = fetch('/note/deleteNoteToRubbishByUserIdAndNoteId',data);
  return response;
}

export const updateUserNoteInfo = (noteId,noteKindId,noteContent,noteTime)=>{
  let data = {
    "userId": userId,
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
    "userId": userId,
    "noteKindName": noteKindName,
    "noteKindUrl": noteKindUrl
  }
  let response = fetch('/noteKind/addNoteKind',data);
  return response;
}

export const getAllNoteKindByUserIdWithoutNull = ()=>{
  let data = {
    "userId":userId
  }
  let response = fetch('/noteKind/getAllNoteKindByUserIdWithoutNull',data);
  return response;
}

export const deleteNoteKindByNoteKindId = (noteKindId)=>{
  let data = {
    "userId":userId,
    "noteKindId": noteKindId
  }
  let response = fetch('/noteKind/deleteNoteKindByNoteKindId',data);
  return response;
}
