const questionData = require('../../../data/sports.json')

const createCategory = (knex, category) => {
  return knex('categories').insert({
    title: category.title
  }, 'id')
  .then(categoryId => {
    let cluesPromises = [];

    category.clues.forEach(clue => {
      if(clue.question.length < 5 || !clue.answer){
        return
      }
      cluesPromises.push(
        createClues(knex, {
          id: clue.id,
          question: clue.question,
          answer: clue.answer,
          value: clue.value,
          categories_id: categoryId[0]
        })
      )
    });

    return Promise.all(cluesPromises)
  })
};

const createClues = (knex, clue) => {
  return knex('clues').insert(clue);
};

exports.seed = function(knex, Promise){
  return knex('clues').del()
  .then(() => knex('categories').del())
    .then(() => {
      let categoryPromises = [];

      questionData.forEach(category => {
        categoryPromises.push(createCategory(knex, category));
      });
      return Promise.all(categoryPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
