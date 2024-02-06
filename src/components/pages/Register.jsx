import { useState } from "react";
import Swal from "sweetalert2";

const Register = () => {

    const [formulario, setFormulario] = useState({
        email: "",
        password: "",
        confirm:'',
        apellidos:'',
        nombre:'',
      });
      const handleChange = (e) => {
        setFormulario({...formulario, [e.target.name]: e.target.value});

      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formulario);
        if(formulario.password !== formulario.confirm){
          alert('Las contraseñas no coinciden');
          return;
        }
        try {
            await fetch('http://127.0.0.1:8000/api/usuarios', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formulario),
            })
            Swal.fire({
              title: "Se ha registrado correctamente",
              icon: "success"
            })
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
          Registre sus Datos
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
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="w-full p-2 border border-sky-400 text-white rounded-md bg-sky-600 placeholder:text-white focus:border-sky-500"
            placeholder="Ingrese su email"
            value={formulario.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="block text-white text-sm font-semibold mb-2"
          >
            Apellidos
          </label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            className="w-full p-2 border border-sky-400 text-white rounded-md bg-sky-600 placeholder:text-white focus:border-sky-500"
            placeholder="Ingrese su email"
            value={formulario.apellidos}
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

        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="block text-white text-sm font-semibold mb-2"
          >
            Confirmar contrasena
          </label>
          <input
            type="password"
            id="confirm"
            name="confirm"
            className="w-full p-2 border border-sky-400 rounded-md text-white bg-sky-600 placeholder:text-white focus:border-sky-500"
            placeholder="Ingrese sus contrasena"
            value={formulario.confirm}
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

      </form>
    </div>
  </div>
  )
}

export default Register