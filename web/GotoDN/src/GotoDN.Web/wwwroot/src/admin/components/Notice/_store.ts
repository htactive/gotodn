import { createStore } from 'redux'

import reducer from './_reducer'
// mount it on the Store
const store = createStore(
  reducer,
);

export default store;