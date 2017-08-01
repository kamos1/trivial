import React from 'react';

export const Scoreboard = ({users}) => {
  const user = Object.keys(users).map((user, i) => {
    return(
      <div className='score-card' key={i}>
        <h2>{user}: {users[user]}</h2>
      </div>
    )
  })

  return(
    <section className='scoreboard-wrapper'>
      {user}
    </section>
  )
}
