// Internet Explorer 11 requires polyfills and partially supported by this project.
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
import './i18n';
import './styles/app-base.css';
import './styles/app-components.css';
import './styles/app-utilities.css';
import ReactDOM from 'react-dom';
import App from 'app/App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
// eslint-disable-next-line import/order
import { ApolloProvider } from '@apollo/client';
// eslint-disable-next-line import/extensions
import apolloClient from './apolloClient';


const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container);
root.render(<ApolloProvider client={apolloClient}>
  <App />
</ApolloProvider>);

// ReactDOM.render(
//   <ApolloProvider client={apolloClient}>
//     <App />
//   </ApolloProvider>,
//   document.getElementById('root')
// );

reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
