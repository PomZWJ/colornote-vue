import fetch from '../config/fetch'
let userId = "912094062@qq.com";
let token = "BCgE5rSfUfDmzwlbeJqYCD9VgFExkkpOJHlXlUJKQjlbT1/UhtmPmJ9VgMAWa4abOIt0IWxwjJixit3JWuOKJ6f3trm9DxfD1dXsYzIjwgWhAEDo2AxBnQ4xtmb7Pci1huTLliFMMf0uNQrVmz/k6RoBqWgZrh2X4PWMZ+5ry+UbDNC3CMuGbE9xVBk2+8PVtkNxzp5Et97INyBrip+VEqQRof7Eg8gXy8K1LXsYZJyf7BdVXr6Wd+mXXRRQ86LfIsi9bskyyESXSXVEnMgijgRStjcUpI5rmZshOs0SdKCriCN5PaTANnBYK0Jd03L2wEG3Lww/bDLgC2utsvgRIg==";
export const getAllNote = (noteContent,noteKindId,isFav)=>{
  let data = {
    "userId":userId,
    "noteContent":noteContent,
    "noteKindId":noteKindId,
    "isFav":isFav
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

export const updateNoteKindByUserId = (params)=>{
  let data = {
    "userId":userId,
    "params": JSON.stringify(params)
  }
  let response = fetch('/noteKind/updateNoteKindByUserId',data);
  return response;
}

