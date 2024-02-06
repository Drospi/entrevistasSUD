import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="fondo w-screen flex items-center justify-center h-screen mt-32 p-8">
        <div className="w-[500px] rounded-xl max-h-96 text-white p-4 items-center justify-center bg-opacity-75 bg-sky-700 ml-auto mr-auto h-full flex flex-col gap-8 text-center">
        <h1 className="text-5xl">Estaca Alto San Pedro</h1>
        <p>Para reservar entrevistas para las renovar las recomendaciones para ir al templo presione el siguiente boton</p>
        <Link to="/reservaciones" className="hover:bg-sky-500 bg-white text-sky-500 transition duration-300 hover:text-white border border-sky-500 text-md p-4 rounded-xl">Entrevistas</Link>

        </div>
    </div>
  )
}

export default Home