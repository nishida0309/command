class Message {
  static printMessage(text) {
    messageView.innerHTML = text;
  }
  static addMessage(text) {
    messageView.innerHTML += text;
  }
}

export default Message