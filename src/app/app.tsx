import { createRoot } from 'react-dom/client';
import { Main } from '../screens/Main';
import './normalize.css';
import './app.scss';

// disableReactDevTools();
createRoot(document.getElementById('app')!).render(<Main />);
