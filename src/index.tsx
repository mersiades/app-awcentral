import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import Root from './Root';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Root>
      <App />
    </Root>
  </React.StrictMode>
);
