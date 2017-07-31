import React from 'react';

export const Scoreboard = ({users}) => {
  const user = Object.keys(users).map((user, i) => {
    return(
      <div className='score-card' key={i}>
        <h1>{user}:</h1>
        <h3>{users[user]}</h3>
      </div>
    )
  })

  return(
    <section className='scoreboard-wrapper'>
      {user}
    </section>
  )
}
