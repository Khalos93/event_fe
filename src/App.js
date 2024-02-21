import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import RequiredAuth from './Components/RequiredAuth';
import Layout from './Components/Layout/Layout';
import CreateEvent from './Components/CreateEvent/CreateEvent';
import Events from './Components/Events/Events';
import SingleEvent from './Components/SingleEvent/SingleEvent';
import EditEvent from './Components/EditEvent/EditEvent';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="signUp" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="unathorized" element={''} />

        <Route element={<RequiredAuth />}>
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<SingleEvent />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="edit-event/:id" element={<EditEvent />} />
        </Route>

        <Route path="*" element={''} />
      </Route>
    </Routes>
  );
}

export default App;
