import { createRoot } from 'react-dom/client';
import './normalize.css';
import './app.scss';
import styles from './app.module.scss';

createRoot(document.getElementById('app')!).render(<div className={styles.app}>App</div>);
