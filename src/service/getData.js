import fetch from '../config/fetch'
let userId = "912094062@qq.com";
let token = "LDdN6skcX8+7wlAD/JEiwCwAPG4ADbj5XTgcNFF+e0mUHKHrAFUkwgaclB68z46YvOvUqlT0bZXPud22Rybu+ARimZmzKu9EgnVm0igHI2hdFTbpDrKcPMdBI/1u6muwVANOwkrZr8231uxpf3A0k5I9yRV5bA9PsW0+PQm4hC+rvWPdOYWvP4x7LVizsETk9DS8Ql9bTu6CQsFyopeeRjFOWVDc9vJivQi2GsZvnEKWPo9851B0UTpes8vOCKpn9Crhwc+9a7mv5xT69Y1nIEikgzVp34a5/FRegsOCCaNYOU1TaZbZ7pFKVhyn0JLEaq4ZEQZveK6UeFtDP1U2gQ==";
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
