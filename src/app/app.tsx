import { createRoot } from 'react-dom/client';
import './normalize.css';
import './app.scss';

createRoot(document.getElementById('app')!).render(
  <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      fontSize: '3rem',
    }}
  >
    App
  </div>
);
