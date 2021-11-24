import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import './index.css';
import initialData from "./graphql/initialData"
import { resolvers, typeDefs } from "./graphql/resolvers";
import AppContainer from './App/AppContainer';

const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com"
})

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers
})

client.writeData({
  data: initialData
})

ReactDOM.render(
  <ApolloProvider client={client}>
      <BrowserRouter>
          <AppContainer />
      </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
