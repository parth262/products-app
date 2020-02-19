import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { createStore } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import { insertProducts } from './actions/products';
import reducer from './reducers/mainReducer'
import { products } from './products';
import Products from './components/Products';
import EditProduct from './components/EditProduct';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch(insertProducts(products))

function App() {

  return (
    <Provider store={store}>
      <div className="container">
        <Router>
          <Switch>
            <Route
              path="/edit-product/:productId"
              render={props => props.match.params.productId ? <EditProduct {...props} /> : <></>} />
            <Route
              path="/"
              component={Products} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
