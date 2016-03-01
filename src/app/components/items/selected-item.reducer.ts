// Reference: http://onehungrymind.com/build-better-angular-2-application-redux-ngrx/

// # Redux reducer for `selected items`

// The `selected items` reducer handles the currently
// selected item
export const selectedItem = (state: any = null, {type, payload}) => {

    console.log('selected items reducer hit! type: ');
    console.log(type);
    console.log('payload: ');
    console.log(payload);
    console.log('state: ');
    console.log(state);

    switch (type) {

        // When an `event` from our store is dispatched with an action
        // type of `SELECT_ITEM`, it will hit this switch case
        case 'SELECT_ITEM':
            return payload;

        default:
            return state;
    }
}
