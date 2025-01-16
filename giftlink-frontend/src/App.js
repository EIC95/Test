import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const MainPage = React.lazy(() => import('./components/MainPage/MainPage'));
const LoginPage = React.lazy(() => import('./components/LoginPage/LoginPage'));
const RegisterPage = React.lazy(() => import('./components/RegisterPage/RegisterPage'));
const DetailsPage = React.lazy(() => import('./components/DetailsPage/DetailsPage'));
const SearchPage = React.lazy(() => import('./components/SearchPage/SearchPage'));

function App() {

  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/app/login" element={<LoginPage />} />
          <Route path="/app/register" element={<RegisterPage />} />
          <Route path="/app/product/:productId" element={<DetailsPage />} />
          <Route path="/app/search" element={<SearchPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
