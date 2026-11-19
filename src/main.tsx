import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {applySettingsToDocument, getSavedSettings} from './utils/settings';

applySettingsToDocument(getSavedSettings());

createRoot(document.getElementById('root')!).render(<App />);
