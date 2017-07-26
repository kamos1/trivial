import React from 'react';

export const Scoreboard = ({users}) => {
  const user = Object.keys(users).map((user) => {
   return <h1>{user}: {users[user]}</h1>

  })
  return(
    <section>
      {user}
    </section>
  )
}