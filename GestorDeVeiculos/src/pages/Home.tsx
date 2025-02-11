import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <main className="flex-col gap-5 max-w-2xl min-h-[30%] ">
        <div className="text-black">
          <h1 className="text-3xl">Bem-vindo(a) ao <span className="underline">Gestor de Veículos</span>!</h1>
          <p className="text-center mt-4">Gerencie seus veículos de forma prática e eficiente.</p>
        </div>


        <Link to="/dashboard" className='bg-lime-400 text-black font-medium  shadow-[0_2px_10px] shadow-black m-auto p-4 rounded-full'>Ver relatório</Link>
      </main>
    </div>
  )
}
