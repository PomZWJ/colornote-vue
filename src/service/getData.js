import fetch from '../config/fetch'

export const getD1 = (userId)=>{
  let data = {
    "userId":userId
  }
  return fetch('/note/getAllNoteInfo',data);
}
