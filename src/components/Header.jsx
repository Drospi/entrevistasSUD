import { Link } from "react-router-dom"

const Header = () => {
  const rol = localStorage.getItem('rol')
  return (
    <><div className="absolute top-10 left-0 right-0">

    <header className='flex px-16 items-center justify-between font-bold ml-auto mr-auto w-screen  pb-4 '>
      <div>
        <p>Estaca Alto San Pedro</p>
    </div>
    <nav>
      <Link className="mr-4 text-black hover:text-sky-600" to="/">Inicio</Link>
      <Link className="mr-4 text-black hover:text-sky-600" to="/reservaciones">Entrevistas</Link>
      <Link className="mr-4 text-black hover:text-sky-600" to="/martes">Contactos</Link>
      {rol === 'admin' && <>
      <Link className="mr-4 text-black hover:text-sky-600" to="/admin">Citas</Link>
      <Link className="mr-4 text-black hover:text-sky-600" to="/roles">Roles</Link>
      <Link className="mr-4 text-black hover:text-sky-600" to="/usuarios">Usuarios</Link></>}
    </nav>
    <Link to="/login" className="hover:bg-sky-500 bg-white text-sky-500 transition duration-300 hover:text-white border border-sky-500 text-md p-4 rounded-xl">Iniciar sesion</Link>
    </header>
    </div>
    </>
  )
}

export default Header