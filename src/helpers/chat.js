export const hasMyNickInMessage = (nick, message) => {
  return (new RegExp(`(@${nick}(\\s|$))`)).test(message)
}