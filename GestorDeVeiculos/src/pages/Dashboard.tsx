import CadastrarVeiculoModalButton from "../components/Radix/CadastrarVeiculoButton"
import RelatorioHeader from "../components/Radix/Header"
import { ResetIcon } from '@radix-ui/react-icons'
import { Link } from "react-router-dom"
import { Table } from "../components/Table"
import { useContext, useEffect, useState } from "react"
import { VehicleContext } from "../Context/VehicleContext"
import { api } from "../services/api"
import Loading from "../components/Loading"


export const Dashboard = () => {
  const { vehicles, setVehicles } = useContext(VehicleContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Função assíncrona para buscar veículos
    const fetchVehicles = async () => {

      setLoading(true)
      try {
        const { data } = await api.get('/veiculos'); 
        setVehicles(data); // Atualiza o estado com a lista de veículos
        console.log(data)
      } catch (err) {
        console.error("Erro ao carregar os veículos:", err);
      }finally {
        setLoading(false)
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
            
            {loading ? (
              <Loading />
            ): (
              <Table setVehicles={setVehicles} vehicles={vehicles} />
            )}
        </main>
      </div>
  )
}
