import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import AlbumDetail, {loader as albumTrackLoader} from './components/AlbumDetail';

const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/:id', element: <AlbumDetail />, loader: albumTrackLoader
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
