const database = require('../db/knex');

const getCategory = (req, res) => {
  database('categories').where('title', req.params.name).select()
    .then(category  => {
      if (category.length) {

      database('clues').where('categories_id', category[0].id).select()
        .then(clues => {
          const randomClue = clues[Math.floor((Math.random() * clues.length) - 1)]
          res.status(200).json(randomClue)
        })
        .catch(error => console.log(error))
      } else {
        res.status(404).json({ error: `${req.params.name} does not exist! Please check the category you requested!`})
      }

    })
    .catch(error => res.status(500).json({error}))
  }

const selectCategory = (req, res) => {
  database('categories').select()
    .then(list => {
      if(list.length) {
        const randomCategory = list[Math.floor((Math.random() * list.length))]
        res.status(200).json(randomCategory)
      } else {
        res.status(404).json({error: 'There was an error retrieving your category!'})
      }
    })
    .catch(error => res.status(500).json({error}))
}

module.exports = {
  getCategory,
  selectCategory
}
