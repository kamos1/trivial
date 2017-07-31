import openSocket from 'socket.io-client'
const socket = openSocket('https://trivial123.herokuapp.com/' || 'http://localhost:3000')


export const inputUsername = (username) => {
  socket.emit('username', username)
}

// export const display = (socket, msg) => {
//   socket.on('connect', () => {
//     console.log('msg');
//   })
// }
