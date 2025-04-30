import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Wrapper from './components/Wrapper';

createRoot(document.getElementById('root')!).render(
    <Wrapper>
        <App />
    </Wrapper>
);
