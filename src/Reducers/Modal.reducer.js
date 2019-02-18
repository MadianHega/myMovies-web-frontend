export default function(dataModal = false, action) {
  if(action.type === 'OpenModal') {
    dataModal = true
    return dataModal;
  } else if (action.type === 'CloseModal') {
      dataModal = false
      return dataModal
  } else {
      return dataModal;
  }
}
