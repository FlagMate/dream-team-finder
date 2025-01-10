import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {registerBodyOnload} from './bodyUtils'
import './index.css'


registerBodyOnload();
createRoot(document.getElementById("root")!).render(<App />);
