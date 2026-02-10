import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './helper/AuthContext/AuthProvider';
import './index.css'
import { AlertProvider } from './helper/AlertContext/AlertContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
        <AlertProvider>

            <App />
        </AlertProvider>
    </AuthProvider>
  </BrowserRouter>
);
