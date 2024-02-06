import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const Roles = () => {
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formulario, setFormulario] = useState({
    rol: "",
  });
  const fetchData = async () => {
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
  }, []);

  if (localStorage.getItem("rol") !== "admin") {
    window.location.href = "/";
  }
  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

        await fetch("http://127.0.0.1:8000/api/roles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formulario),
        });
        setShowModal(false);
          Swal.fire({
            title: "Se ha agregado el nuevo rol correctamente",
            icon: "success",
          });
          fetchData();
    }catch(error){
      console.log(error);
    }
  };

  const closeModal = () => setShowModal(false);
  return (
    <>
      <div className="flex text-xl items-center justify-between w-screen p-12 ">
        <div>Admin</div>
        <h2 className="text-2xl font-bold">
          Roles de la Estaca Alto San Pedro
        </h2>
        <div className="flex flex-col gap-4">
          <button className="text-md" onClick={handleLogOut}>
            Cerrar Sesion
          </button>
          <button
            className="hover:bg-sky-500 bg-white text-sky-500 transition duration-300 hover:text-white border border-sky-500 text-md p-4 rounded-xl"
            onClick={() => setShowModal(true)}
          >
            Agregar Nuevo Rol
          </button>
        </div>
      </div>
      <table
        id="myTable"
        className="mt-6 w-[80%] text-center ml-auto mr-auto border border-gray-300"
      >
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Rol</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.rol}</td>

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
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Rol</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="rol"
                  className="block text-sm font-medium text-gray-600"
                >
                  Rol:
                </label>
                <input
                onChange={handleChange}
                  type="text"
                  id="rol"
                  name="rol"
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <button
                type="submit"
                className="hover:bg-sky-500 bg-white text-sky-500 transition duration-300 hover:text-white border border-sky-500 text-md p-4 rounded-xl"
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

export default Roles;
