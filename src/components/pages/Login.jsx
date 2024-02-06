import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {

    const [formulario, setFormulario] = useState({
        email: "",
        password: ""
      });
      const handleChange = (e) => {
        setFormulario({...formulario, [e.target.name]: e.target.value});
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const res = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formulario),
          })
          const data = await res.json();
          console.log(data);
          if(data){
            Swal.fire({
              title: "Se ha iniciado sesion correctamente",
              icon: "success"
            })
          }
          if(data[0].rol === 'administrador'){
            window.location.href = '/admin';
            localStorage.setItem('rol', 'admin');
          }else if(data[0].rol === 'presidente'){
            window.location.href = '/presidente';
            localStorage.setItem('rol', 'presidente');
          }else if (data[0].rol === 'consejero1'){
            window.location.href = '/consejero1';
            localStorage.setItem('rol', 'consejero1');
          }else if (data[0].rol === 'consejero2'){
            window.location.href = '/consejero2';
            localStorage.setItem('rol', 'consejero2');
          }
        }catch(error){
          console.log(error);
          Swal.fire({
            title: "Datos Incorrectos",
            icon: "error"
          })
        }
        // Aquí puedes realizar acciones adicionales, como enviar los datos a un servidor.
      };
  return (
    <div className="w-screen">
      <div className="flex flex-col items-center ml-auto max-w-screen-sm mr-auto mt-32 border h-full rounded-xl bg-sky-700">
        <form onSubmit={handleSubmit} className="max-w-md p-6 rounded-md ">
          <h2 className="text-5xl font-bold mb-6 text-white text-center">
            Iniciar Sesion
          </h2>
          <hr className="bg-gray-300 h-0.5 w-[75%] ml-auto my-4 mr-auto" />

          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-white text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full p-2 border border-sky-400 text-white rounded-md bg-sky-600 placeholder:text-white focus:border-sky-500"
              placeholder="Ingrese su email"
              value={formulario.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-white text-sm font-semibold mb-2"
            >
              Contrasena
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-sky-400 rounded-md text-white bg-sky-600 placeholder:text-white focus:border-sky-500"
              placeholder="Ingrese sus contrasena"
              value={formulario.password}
              onChange={handleChange}
            />
          </div>


          <button
            type="submit"
            className="hover:bg-sky-500 mb-4 w-full bg-white text-sky-500 transition duration-300 hover:text-white border border-sky-500 text-md p-4 rounded-xl"
          >
            Enviar
          </button>
          <br className="h-4" />
          <Link to="/register" className=" text-end text-white underline hover:text-sky-300">Todavia no estas Registrado?</Link>
        </form>
      </div>
    </div>
  )
}

export default Login