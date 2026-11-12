import { createRoot, hydrateRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from '@/App';
import { routes } from '@/routes';
import '@/styles/global.css';

const container = document.getElementById('root');
if (!container) throw new Error('Elemento #root não encontrado.');

const app = (
  <App>
    <RouterProvider router={createBrowserRouter(routes)} />
  </App>
);

// Páginas pré-renderizadas (SEO) já chegam com HTML: só "hidratamos".
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
