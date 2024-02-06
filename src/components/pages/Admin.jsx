import { useEffect, useState } from "react";
const Admin = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/citas", {
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

    fetchData();

  }, []);

  if (localStorage.getItem("rol") !== "admin") {
    window.location.href = "/";
  }
  const handleLogOut =  () => {
      localStorage.clear();
      window.location.href = "/login";
  }
  return (
    <>
    <div className="flex text-xl justify-between w-screen p-12">
      <div>Admin</div>
      <p>Citas de la Estaca Alto San Pedro</p>
      <button className="text-md" onClick={handleLogOut}>Cerrar Sesion</button>

    </div>
      <table id="myTable" className="mt-6 w-[80%] text-center ml-auto mr-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Apellidos</th>
            <th className="py-2 px-4 border-b">Barrio</th>
            <th className="py-2 px-4 border-b">Celular</th>
            <th className="py-2 px-4 border-b">Tipo</th>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Hora</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.nombre}</td>
              <td className="py-2 px-4 border-b">{user.apellidos}</td>
              <td className="py-2 px-4 border-b">{user.barrio}</td>
              <td className="py-2 px-4 border-b">{user.celular}</td>
              <td className="py-2 px-4 border-b">{user.tipo}</td>
              <td className="py-2 px-4 border-b">{user.fecha}</td>
              <td className="py-2 px-4 border-b">{user.hora}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Admin;