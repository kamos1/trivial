const database = require('../db/knex');

const getCategory = (req, res) => {
  database('categories').where('title', req.params.name).select()
    .then(category => {
      database('clues').where('categories_id', category[0].id).select()
        .then(clues => {
          if(clues.length) {
            const randomClue = clues[Math.floor((Math.random() * clues.length) - 1)]
            res.status(200).json(randomClue)
          } else {
            res.status(404).json({ error: `${req.params.name} did not have any clues! Please check the spelling of the category you requested!`})
          }
        })
        .catch(error => res.status(500).json({error}))
    })
  }

module.exports = {
  getCategory
}
