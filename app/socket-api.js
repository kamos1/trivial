import io from 'socket.io-client';
const socket = io();

export const inputUsername = (username) => {
  socket.emit('username', username)
}

// // export const display = (socket, msg) => {
// //   socket.on('connect', () => {
// //     console.log('msg');
// //   })
// // }
