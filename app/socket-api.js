// import openSocket from 'socket.io-client'
// const socket = openSocket(process.env.PORT || 'http://localhost:8080')


import io from 'socket.io-client';
// import display from '../socket-api';
// import server from '../../server/server'
// import socket from 'socket.io'
// const socket = require('socket.io')
const socket = io();

export const inputUsername = (username) => {
  socket.emit('username', username)
}

// // export const display = (socket, msg) => {
// //   socket.on('connect', () => {
// //     console.log('msg');
// //   })
// // }
