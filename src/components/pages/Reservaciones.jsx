import {  useEffect, useState } from "react";
import Swal from "sweetalert2";
const Reservaciones = () => {
  const [formulario, setFormulario] = useState({
    nombreEntrevista: "",
    nombre: "",
    apellidos: "",
    celular:'',
    fecha: "",
    hora: "",
    tipo: "",
    barrio: "",
  });
  const [variables, setVariables] = useState({
    horarios: [],
    fechas: [],

  })
  const handleChange = (e) => {
    setFormulario({...formulario, [e.target.name]: e.target.value});

  };

  useEffect(() => {
    switch (formulario.tipo) {
      case 'Futuro Misionero':
        setVariables({
          horarios: ['19:30','20:00'],
          fechas: ['Martes 5 de Febrero','Martes 12 de Febrero','Martes 19 de Febrero','Martes 26 de Febrero'],
        })
        
      formulario.nombreEntrevista = 'Mogrovejo';
        break;
        case 'Ordenanzas':
        setVariables({
          horarios: ['19:30','20:00'],
          fechas: ['Martes 5 de Febrero','Martes 12 de Febrero','Martes 19 de Febrero','Martes 26 de Febrero'],
        })
        formulario.nombreEntrevista = 'Mogrovejo';
        break;
        case 'Renovacion':
        setVariables({
          horarios: ['18:30','18:45','19:00','19:15','19:30'],
          fechas: ['Martes 5 de Febrero','Martes 12 de Febrero','Martes 19 de Febrero','Martes 26 de Febrero'],
        })
        switch (formulario.barrio) {
          case 'rosal','indaburo','pioneros':
            formulario.nombreEntrevista = 'Siles';
            break;
          case 'jardin','potosi','pasankeri','altoSanPedro':
            formulario.nombreEntrevista = 'Fernandez';
        }
        break;

    }
  },[formulario])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(formulario);
    try {
      await fetch('http://127.0.0.1:8000/api/citas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
      })
      Swal.fire({
        title: "Se ha registrado correctamente",
        icon: "success"
      });
    
    }catch(error){
      console.error('Error:', error.message);
    }
    // Aquí puedes realizar acciones adicionales, como enviar los datos a un servidor.
  };

  return (
    <div className="w-screen">
      <div className="flex flex-col items-center ml-auto max-w-screen-md mr-auto mt-32 border rounded-xl bg-sky-700">
        <form onSubmit={handleSubmit} className="max-w-md p-6 rounded-md ">
          <h2 className="text-5xl font-bold mb-6 text-white text-center">
            Reserva de Entrevistas
          </h2>
          <hr className="bg-gray-300 h-0.5 w-[75%] ml-auto my-4 mr-auto" />

          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-white text-sm font-semibold mb-2"
            >
              Nombres
            </label>
            <input
            required
              type="text"
              id="nombre"
              name="nombre"
              className="w-full p-2 border border-sky-400 text-white rounded-md bg-sky-600 placeholder:text-white focus:border-sky-500"
              placeholder="Ingrese su nombre"
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
            required
              type="text"
              id="apellidos"
              name="apellidos"
              className="w-full p-2 border border-sky-400 rounded-md text-white bg-sky-600 placeholder:text-white focus:border-sky-500"
              placeholder="Ingrese sus Apellidos"
              value={formulario.apellidos}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-white text-sm font-semibold mb-2"
            >
              Celular (para confirmar la cita el dia indicado)
            </label>
            <input
            required
              type="text"
              id="celular"
              name="celular"
              className="w-full p-2 border border-sky-400 rounded-md text-white bg-sky-600 placeholder:text-white focus:border-sky-500"
              placeholder="Ingrese sus Celular"
              value={formulario.celular}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-white text-sm font-semibold mb-2"
            >
              Barrio
            </label>
            <select required onChange={handleChange} value={formulario.barrio} className="w-full p-2 border border-sky-400 text-white rounded-md bg-sky-600 placeholder:text-white focus:border-sky-500" id="barrio" name="barrio">
            <option value="">---</option>
              <option value="Alto San Pedro">Alto San Pedro</option>
              <option value="El Rosal">El Rosal</option>
              <option value="Jardin">Jardin</option>
              <option value="Pioneros">Pioneros</option>
              <option value="Nuevo Potosi">Nuevo Potosi</option>
              <option value="Indaburo">Indaburo</option>
              <option value="Pasankeri">Pasankeri</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-white text-sm font-semibold mb-2"
            >
              Tipo de Entrevista
            </label>
            <select required defaultValue={'renovacion'} onChange={handleChange} value={formulario.tipo} className="w-full p-2 border border-sky-400 text-white rounded-md bg-sky-600 placeholder:text-white focus:border-sky-500" id="tipo" name="tipo">
              <option value="">---</option>
              <option value="Futuro Misionero">Futuro Misionero</option>
              <option value="Ordenanzas">Ordenanzas Personales</option>
              <option value="Renovacion">Renovacion</option>
            </select>
          </div>
          {(formulario.tipo !== '')?(
            <>
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-white text-sm font-semibold mb-2"
            >
              Fecha
            </label>
            <select 
            required
            onChange={handleChange} 
            value={formulario.fecha} 
            className="w-full p-2 border border-sky-400 text-white rounded-md bg-sky-600 placeholder:text-white focus:border-sky-500" 
            id="fecha" 
            name="fecha">
            <option value="">---</option>
            {variables.fechas.map((fechas,key) => (
              <option key={key} value={fechas}>{fechas}</option>
            ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-white text-sm font-semibold mb-2"
            >
              Hora
            </label>
            <select onChange={handleChange} value={formulario.hora} className="w-full p-2 border border-sky-400 text-white rounded-md bg-sky-600 placeholder:text-white focus:border-sky-500" id="hora" name="hora">
            <option value="">---</option>
            {variables.horarios.map((horario,key) => (
              <option key={key} value={horario}>{horario}</option>
            ))}
            </select>
          </div>

          <button
            type="submit"
            className="hover:bg-sky-500 w-full bg-white text-sky-500 transition duration-300 hover:text-white border border-sky-500 text-md p-4 rounded-xl"
          >
            Enviar
          </button>
          </>
            
          ):''}
        </form>
      </div>
    </div>
  );
};

export default Reservaciones;
