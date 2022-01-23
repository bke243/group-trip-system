import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient()

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <NotificationsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationsProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

