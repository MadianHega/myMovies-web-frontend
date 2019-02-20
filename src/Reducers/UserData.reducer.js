export default function(dataUser = null, action) {
  if(action.type === 'UserData') {
    let dataUserCopy = {}
    dataUserCopy.id = action.DataUser._id
    dataUserCopy.pseudo = action.DataUser.userName
    dataUserCopy.email = action.DataUser.email
    console.log(dataUserCopy);
    return dataUser
  }
  else{
    return dataUser;
  }
}
