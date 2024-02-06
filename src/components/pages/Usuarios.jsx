import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Usuarios = () => {
  const [userData, setUserData] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formulario, setFormulario] = useState({
      id: "",
      rol: "",
  })
  const fetchDataRoles = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/roles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the request was successful (status code 2xx)
      if (res.ok) {
        const data = await res.json();
        setUserRoles(data);
        console.log(data);
      } else {
        // Handle error response
        console.error(`Error: ${res.status} - ${res.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/usuarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the request was successful (status code 2xx)
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
        console.log(data);
      } else {
        // Handle error response
        console.error(`Error: ${res.status} - ${res.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {

    fetchData();
    fetchDataRoles();
  }, []);

  if (localStorage.getItem("rol") !== "admin") {
    window.location.href = "/";
  }
  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  const openModal = (id) => {
    setShowModal(true);
    setFormulario({
        id: id,
    })
  }
  const handleChangeRol = async (e) => {
    e.preventDefault();
    setShowModal(true);
    try {

    await fetch(`http://127.0.0.1:8000/api/usuarios/${formulario.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rol :formulario.rol}),
    });
    setShowModal(false);
    Swal.fire({
      title: "Se ha actualizado el rol correctamente",
      icon: "success",
    })
    fetchData();
}
    catch(error){
      console.error("Error:", error);
      Swal.fire({
        title: "Error al actualizar el rol",
        icon: "error",
      })
    }
  };
  const closeModal = () => setShowModal(false);
  return (
    <>
      <div className="flex text-xl  justify-between w-screen p-12 ">
        <div>Admin</div>
        <p>Usuarios de la Estaca Alto San Pedro</p>
        <button className="text-md" onClick={handleLogOut}>
          Cerrar Sesion
        </button>
      </div>
      <table
        id="myTable"
        className="mt-6 w-[80%] text-center ml-auto mr-auto border border-gray-300"
      >
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Apellidos</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Rol</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.nombre}</td>
              <td className="py-2 px-4 border-b">{user.apellidos}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td
                onClick={() => openModal(user.id)}
                className="py-2 cursor-pointer px-4 border-b"
              >
                {user.rol}
              </td>
              <td className="py-2 px-4 border-b">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
          <div className="modal-background" onClick={closeModal}></div>

          <div className="modal-content bg-white w-96 p-4 rounded shadow-lg">
            <span
              className="close-button text-2xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="text-xl font-bold mb-4">Cambiar Rol</h2>
            <form onSubmit={handleChangeRol}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Rol:
              </label>
              <select
                name="rol"
                id="rol"
                className="mt-1 p-2 border rounded w-full"
                onChange={(e) => setFormulario({ ...formulario, rol: e.target.value })}
              >
                {userRoles.map((rol) => (
                  <option key={rol.id} value={rol.rol}>
                    {rol.rol}
                  </option>
                ))}
              </select>
            </div>

            <button
                type="submit"
                className=" w-full hover:bg-sky-500 bg-white text-sky-500 transition duration-300 hover:text-white border border-sky-500 text-md p-4 rounded-xl"
              >
                Agregar Nuevo Rol
              </button>
              </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Usuarios;
