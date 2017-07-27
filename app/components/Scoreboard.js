import React from 'react';

export const Scoreboard = ({users}) => {
  const user = Object.keys(users).map((user, i) => {
    return(
      <div key={i}>
        <h1>{user}:</h1>
        <h3>{users[user]}</h3>
      </div>
    )
  })

  return(
    <section>
      {user}
    </section>
  )
}
