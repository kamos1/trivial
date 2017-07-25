import  openSocket from 'socket.io-client'
const socket = openSocket(process.env.NODE_ENV || 'http://localhost:3000')


export const inputUsername = (username) => {
  socket.emit('username', username)
}

export const display = (socket, msg) => {
  socket.on('connect', () => {
    console.log('msg');
  })
}