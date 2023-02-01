
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';


const httpLink = new HttpLink({ uri: 'http://localhost:7204/graphql/' });

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = window.localStorage.getItem('jwt_access_token')
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }));

  return forward(operation);
})

export default new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  link: concat(authMiddleware, httpLink),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
});


