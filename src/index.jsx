import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App'
import Home from './pages/home';
import CreateClass from './pages/createClass';
import Login from './pages/login';
import Learner from './pages/Learner';
import Creater from './pages/Creater';
import ClassManage from './pages/classManage';
import ClassDetail from './pages/classInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='create' element={<CreateClass />} />
          <Route path='login' element={<Login />} />
          <Route path='learner' element={<Learner />} />
          <Route path='creater' element={<Creater />} />
          <Route path='userclass/:classId' element={<ClassManage />} />
          <Route path='class/:classId' element={<ClassDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);
