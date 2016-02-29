// ```
// _todo.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// _todo.js may be freely distributed under the MIT license
// ```

// */app/routes/_todo.router.js*

// ## Todo API object

// HTTP Verb  Route                 Description

// GET        /api/todo             Get all of the todo items
// GET        /api/todo/:todo_id    Get a single todo item by todo item id
// POST       /api/todo             Create a single todo item
// DELETE     /api/todo/:todo_id    Delete a single todo item
// PUT        /api/todo/:todo_id    Update a todo item with new info

// Load the todo model
import Todo from '../models/todo.model';

export default (app, router) => {

  // ### Todo API Routes

  // Define routes for the todo item API

  router.route('/todo')

    // ### Create a todo item

    // Accessed at POST http://localhost:8080/api/todo

    // Create a todo item
    .post((req, res) => {

      Todo.create({

        text : req.body.text

      }, (err, todo) => {

        if (err)
          res.send(err);

        // DEBUG
        console.log(`Todo created: ${todo}`);

        Todo.find((err, todos) => {
          if(err)
            res.send(err);

          res.json(todos);
        });
      });
    })

    // ### Get all of the todo items

    // Accessed at GET http://localhost:8080/api/todo
    .get((req, res) => {

      // Use mongoose to get all todo items in the database
      Todo.find((err, todo) => {

        if(err)
          res.send(err);

        else
          res.json(todo);
      });
    });

  router.route('/todo/:todo_id')

    // ### Get a todo item by ID

    // Accessed at GET http://localhost:8080/api/todo/:todo_id
    .get((req, res) => {

      // Use mongoose to a single todo item by id in the database
      Todo.findOne(req.params.todo_id, (err, todo) => {

        if(err)
          res.send(err);

        else
          res.json(todo);
      });
    })

    // ### Update a todo item by ID

    // Accessed at PUT http://localhost:8080/api/todo/:todo_id
    .put((req, res) => {

      // use our todo model to find the todo item we want
      Todo.findOne({

        '_id' : req.params.todo_id

      }, (err, todo) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.text)
          todo.text = req.body.text;

        // save the todo item
        return todo.save((err) => {

          if (err)
            res.send(err);

          return res.send(todo);

        });
      });
    })

    // ### Delete a todo item by ID

    // Accessed at DELETE http://localhost:8080/api/todo/:todo_id
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete todo with id: ${req.params.todo_id}`);

      Todo.remove({

        _id : req.params.todo_id
      }, (err, todo) => {

        if(err)
          res.send(err);

        console.log('Todo successfully deleted!');

        Todo.find((err, todos) => {
          if(err)
            res.send(err);

          res.json(todos);
        });
      });
    });
};