
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Martes from './components/Martes';
import Home from './components/pages/Home';
import Reservaciones from './components/pages/Reservaciones';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Admin from './components/pages/Admin';
import Presidente from './components/pages/Presidente';
import Consejero2 from './components/pages/Consejero2';
import Usuarios from './components/pages/Usuarios';
import Roles from './components/pages/Roles';
function App() {
  
  return (
    <>
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/martes" Component={Martes} />
        <Route path="/" Component={Home} />
        <Route path="/reservaciones" Component={Reservaciones} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/admin" Component={Admin} />
        <Route path="/presidente" Component={Presidente} />
        <Route path="/roles" Component={Roles} />
        <Route path="/consejero2" Component={Consejero2} />
        <Route path="/usuarios" Component={Usuarios} />
      </Routes>
    </Router>
    </>
  )
}

export default App
