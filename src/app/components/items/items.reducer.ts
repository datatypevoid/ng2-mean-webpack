// Reference: http://onehungrymind.com/build-better-angular-2-application-redux-ngrx/

// # Redux store for `items`

export interface Item {
    _id: number;
    name: string;
    description: string;
};

// A traditional `reducer` is a function which takes a `state`
// object and an action to perform.

// `ngrx` reducers work differently:
//   * the second parameter is an object with the type of
//     action to perform and the payload for that action

// The `items` reducer performs actions on our list of items
// Notice that we set `state` to a default value to initialize
// smoothly
export const items = (state: any = [], {type, payload}) => {

  console.log('items reducer hit! type: ');
  console.log(type);
  console.log('payload: ');
  console.log(payload);
  console.log('state: ');
  console.log(state);

  switch (type) {

      // `ADD_ITEMS` returns whatever collection passed in as a
      // new array
      case 'ADD_ITEMS':
          return payload;

      // `CREATE_ITEM` returns a new array by concatenating the
      // existing items array with our new item
      case 'CREATE_ITEM':
          return [...state, payload];

      // `UPDATE_ITEM` returns a new array by mapping through the
      // current array, locating the item we desire to update
      // and cloning a new item using `Object.assign`
      case 'UPDATE_ITEM':

          return state.map(item => {

              console.log(item);
              return item._id === payload._id
                ? Object.assign({}, item, payload) : item
          })

      // `DELETE_ITEM` returns a new array by filtering out the
      // `item` that we want to delete
      case 'DELETE_ITEM':

        return state.filter(item => {

            console.log(item);

            return item._id !== payload._id;
        })

      default:
          return state;
  }
}
