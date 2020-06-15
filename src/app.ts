import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag'
import ApolloClient from 'apollo-client'
import ws from 'ws'

const query = gql`
  subscription {
      newOffers {
          id,
          service {
              booking {
                  id
              }
          }
      }
  }
`;

const GRAPHQL_ENDPOINT_URI = `ws://localhost:3000/graphql`

const wsLink = new WebSocketLink({
  uri: GRAPHQL_ENDPOINT_URI,
  options: {
    reconnect: true
  },
  webSocketImpl: ws
});

const client = new ApolloClient({ link: wsLink, cache: new InMemoryCache() });
client
  .subscribe({ query, fetchPolicy: 'no-cache' })
  .subscribe({ 
    next(val) { console.info(val.data) },
    error(err) { console.error(err); }
});

console.info("Started!")