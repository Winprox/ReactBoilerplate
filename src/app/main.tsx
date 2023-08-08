import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { createRoot } from 'react-dom/client';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { App } from '../layouts/App';
import { store } from '../logic/store';
import { Consts } from '../utils';
import './app.css';

if (Consts.isEnvDev) disableReactDevTools();
else mountStoreDevtool('Store', store);
createRoot(document.querySelector('#app')!).render(<App />);
