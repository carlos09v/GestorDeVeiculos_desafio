import CadastrarVeiculoModalButton from "../components/Radix/CadastrarVeiculoButton"
import RelatorioHeader from "../components/Radix/Header"
import { ResetIcon } from '@radix-ui/react-icons'
import { Link } from "react-router-dom"
import { Table } from "../components/Table"
import { useContext, useEffect } from "react"
import { VehicleContext } from "../Context/VehicleContext"
import { api } from "../services/api"


export const Dashboard = () => {
  const { vehicles, setVehicles } = useContext(VehicleContext)

  useEffect(() => {
    // Função assíncrona para buscar veículos
    const fetchVehicles = async () => {
      try {
        const { data } = await api.get('/veiculos'); 
        setVehicles(data); // Atualiza o estado com a lista de veículos
        console.log(data)
      } catch (err) {
        console.error("Erro ao carregar os veículos:", err);
      }
    };

    fetchVehicles(); // Chama a função quando o componente é montado
  }, [setVehicles])


  return (
      <div className="flex justify-center items-center h-screen">
        <main className="relative flex flex-col gap-6 max-w-4xl">
            <div className="flex w-full">
                <Link to="/" className="absolute right-0 top-0 rounded-md bg-green-400 p-2"><ResetIcon className="inline-block" /></Link>
                <RelatorioHeader />

                <CadastrarVeiculoModalButton />
            </div>
            
            <Table setVehicles={setVehicles} vehicles={vehicles} />
        </main>
      </div>
  )
}
