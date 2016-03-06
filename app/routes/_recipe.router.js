// ```
// _recipe.router.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// _recipe.router.js may be freely distributed under the MIT license
// ```

// */app/routes/_recipe.router.js*

// # Recipe API object

// HTTP Verb  Route                   Description

// GET        /api/recipe             Get all of the recipes
// GET        /api/recipe/:recipe_id  Get a single recipe by recipe id
// POST       /api/recipe             Create a single recipe
// DELETE     /api/recipe/:recipe_id  Delete a single recipe
// PUT        /api/recipe/:recipe_id  Update a recipe with new info

// Load the `recipe` model
import Recipe from '../models/recipe.model';

export default (app, router) => {

  // ## Recipe API Routes

  // Define routes for the `recipe` API

  router.route('/recipe')

    // ### Create a `recipe`

    // Accessed at POST http://localhost:8080/api/recipe

    // Create a `recipe`
    .post((req, res) => {

      Recipe.create({

        title : req.body.title,

        tags : req.body.tags,

        rating : req.body.rating,

        description : req.body.description,

        ingredients : req.body.ingredients,

        directions : req.body.directions,

      }, (err, recipe) => {

        if (err)
          res.send(err);

        // DEBUG
        console.log(`Recipe created: ${recipe}`);

        // return the new `recipe` to our front-end
        res.json(recipe);
      });
    })

    // ### Get all of the `recipes`

    // Accessed at GET http://localhost:8080/api/recipe
    .get((req, res) => {

      // Use mongoose to get all recipes in the database
      Recipe.find((err, recipe) => {

        if(err)
          res.send(err);

        else
          res.json(recipe);
      });
    });

  router.route('/recipe/:recipe_id')

    // ### Get a `recipe` by ID

    // Accessed at GET http://localhost:8080/api/recipe/:recipe_id
    .get((req, res) => {

      // Use mongoose to fetch a single `recipe` by id in the database
      Recipe.findOne(req.params.recipe_id, (err, recipe) => {

        if(err)
          res.send(err);

        else
          res.json(recipe);
      });
    })

    // ### Update a `recipe` by ID

    // Accessed at PUT http://localhost:8080/api/recipe/:recipe_id
    .put((req, res) => {

      // use our `recipe` model to find the `recipe` we want
      Recipe.findOne({

        '_id' : req.params.recipe_id

      }, (err, recipe) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.title)
          recipe.title = req.body.title;

        if (req.body.tags)
          recipe.tags = req.body.tags;

        if (req.body.rating)
          recipe.rating = req.body.rating;

        if (req.body.creator)
          recipe.creator = req.body.creator;

        if (req.body.description)
          recipe.description = req.body.description;

        if (req.body.ingredients)
          recipe.ingredients = req.body.ingredients;

        if (req.body.directions)
          recipe.directions = req.body.directions;

        // save the `recipe`
        return recipe.save((err) => {

          if (err)
            res.send(err);

          return res.send(recipe);

        });
      });
    })

    // ### Delete a `recipe` by ID

    // Accessed at DELETE http://localhost:8080/api/recipe/:recipe_id
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete recipe with id: ${req.params.recipe_id}`);

      Recipe.remove({

        _id : req.params.recipe_id
      }, (err, recipe) => {

        if(err)
          res.send(err);

        else
          console.log('Recipe successfully deleted!');

        Recipe.find((err, recipes) => {
          if(err)
            res.send(err);

          res.json(recipes);
        });
      });
    });
};
