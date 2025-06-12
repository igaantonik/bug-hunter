import { createRoot } from 'react-dom/client';
import App from './App';
import Wrapper from './components/shared/Wrapper';

createRoot(document.getElementById('root')!).render(
    <Wrapper>
        <App />
    </Wrapper>
);
