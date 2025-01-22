
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <main className="flex-col justify-around max-w-2xl min-h-[30%]">
        <div className="text-black">
          <h1 className="text-3xl">Bem-vindo(a) ao <span className="underline">Gestor de Veículos</span>!</h1>
          <p className="text-center mt-4">Gerencie seus veículos de forma prática e eficiente.</p>
        </div>


        <Link to="/dashboard" className='h-8 rounded bg-lime-400 text-black p-2 font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none m-auto block'>Ver relatório</Link>
      </main>
    </div>
  )
}
