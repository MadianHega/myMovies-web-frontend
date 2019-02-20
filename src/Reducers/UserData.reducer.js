export default function(dataUser = null, action) {
  if(action.type === 'UserData') {
    let dataUserCopy = {}
    dataUserCopy.id = action.DataUser._id
    dataUserCopy.pseudo = action.DataUser.userName
    dataUserCopy.email = action.DataUser.email
    return dataUserCopy
  }
  else{
    return dataUser;
  }
}
