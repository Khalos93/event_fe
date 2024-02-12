import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp/SignUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signUp" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
