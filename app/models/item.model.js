// ```
// item.model.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// item.model.js may be freely distributed under the MIT license
// ```

// */app/models/item.model.js*

// ## Item Model

// Note: MongoDB will autogenerate an _id for each Item object created

// Grab the Mongoose module
import mongoose from 'mongoose';

// Create a `schema` for the `Todo` object
let itemSchema = new mongoose.Schema({
  name: { type : String },
  description: { type : String },
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('Item', itemSchema);
