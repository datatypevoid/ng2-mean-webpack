// ```
// _item.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// _item.js may be freely distributed under the MIT license
// ```

// */app/routes/_item.router.js*

// ## Item API object

// HTTP Verb  Route                 Description

// GET        /api/item             Get all of the items
// GET        /api/item/:item_id    Get a single item by item id
// POST       /api/item             Create a single item
// DELETE     /api/item/:item_id    Delete a single item
// PUT        /api/item/:item_id    Update a item with new info

// Load the item model
import Item from '../models/item.model';

export default (app, router) => {

  // ### Item API Routes

  // Define routes for the item API

  router.route('/item')

    // ### Create an item

    // Accessed at POST http://localhost:8080/api/item

    // Create an item
    .post((req, res) => {

      Item.create({

        name : req.body.name,

        description : req.body.description

      }, (err, item) => {

        if (err)
          res.send(err);

        // DEBUG
        console.log(`Item created: ${item}`);

        // return the new item to our front-end
        res.json(item);
      });
    })

    // ### Get all of the items

    // Accessed at GET http://localhost:8080/api/item
    .get((req, res) => {

      // Use mongoose to get all items in the database
      Item.find((err, item) => {

        if(err)
          res.send(err);

        else
          res.json(item);
      });
    });

  router.route('/item/:item_id')

    // ### Get an item by ID

    // Accessed at GET http://localhost:8080/api/item/:item_id
    .get((req, res) => {

      // Use mongoose to fetch a single item by id in the database
      Item.findOne(req.params.item_id, (err, item) => {

        if(err)
          res.send(err);

        else
          res.json(item);
      });
    })

    // ### Update an item by ID

    // Accessed at PUT http://localhost:8080/api/item/:item_id
    .put((req, res) => {

      // use our item model to find the item we want
      Item.findOne({

        '_id' : req.params.item_id

      }, (err, item) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.name)
          item.name = req.body.name;

        if (req.body.name)
          item.description = req.body.description;

        // save the item
        return item.save((err) => {

          if (err)
            res.send(err);

          return res.send(item);

        });
      });
    })

    // ### Delete an item by ID

    // Accessed at DELETE http://localhost:8080/api/item/:item_id
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete item with id: ${req.params.item_id}`);

      Item.remove({

        _id : req.params.item_id
      }, (err, item) => {

        if(err)
          res.send(err);

        else
          console.log('Item successfully deleted!');

        Item.find((err, items) => {
          if(err)
            res.send(err);

          res.json(items);
        });
      });
    });
};