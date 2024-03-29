import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { RecipeList } from "./components/RecipeList";
import { RecipeCreateEdit } from "./components/RecipeCreateEdit";
import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/recipe-list' component={RecipeList} />  
        <Route path='/recipe-create' component={RecipeCreateEdit} />
        <Route path='/recipe-edit/:id' component={RecipeCreateEdit} />  
      </Layout>
    );
  }
}
