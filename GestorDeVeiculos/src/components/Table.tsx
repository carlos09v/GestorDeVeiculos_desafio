import { FormEvent, useState } from "react"
import { TrashIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Pagination from "./TablePagination"
import { toast } from "react-toastify"
import { api } from "../services/api"
import { VehicleContextProps } from "../@types/web"
import { VeiculoInfo } from "./Radix/VeiculoInfo"


export const Table = ({ setVehicles, vehicles }: Partial<VehicleContextProps>) => {
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState('')

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const vehiclesPerPage = 10
    const lastVehicleIndex = currentPage * vehiclesPerPage
    const firstVehicleIndex = lastVehicleIndex - vehiclesPerPage
    const currentVehicles = vehicles?.slice(firstVehicleIndex, lastVehicleIndex)

    // Delete Vehicle
    const deleteVehicle = async (e: FormEvent, id: string) => {
        e.preventDefault()
        if (id === '') return toast.warn('Id vazio!')

        setLoading(true)
        try {
            const { data } = await api.delete(`/veiculos/${id}`)

            toast.success(data.message)
            // Remover o veículo do estado local
            if (setVehicles) {
                setVehicles((prevVehicles) =>
                    prevVehicles?.filter(vehicle => vehicle.id !== id) || []
                );
            }
        } catch (err: any) {
            if (err.response) return toast.error(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full">
            {!vehicles || vehicles.length === 0 ? (
                <p className="font-bold text-center text-red-600 underline">- Nenhum veículo cadastrado!</p>
            ) : (
                <div className="flex flex-col items-center gap-4 ">
                    <table className="table-auto rounded-lg overflow-hidden shadow-lg w-[90%]">
                        <thead>
                            <tr className="text-xl bg-black text-slate-100">
                                <th></th>
                                <th></th>
                                <th className="text-lg">No.</th>
                                <th></th>
                                <th>Tipo</th>
                                <th>Modelo</th>
                                <th>Fabricante</th>
                                <th>Ano</th>
                                <th>Preço</th>
                                <th></th>       
                            </tr>
                        </thead>
                        <tbody>
                            {currentVehicles?.map((vehicle, i) => (
                                <tr key={i} className="relative" >
                                    <td className="w-10"></td>
                                    {!loading && (
                                        <VeiculoInfo vehicle={vehicle} setVehicles={setVehicles} />
                                    )}
                               
                                    <td className="text-center  py-2">{(currentPage - 1) * vehiclesPerPage + (i + 1)}</td>
                                    <td className="text-center">{new Date(vehicle.createdAt ?? new Date()).toLocaleDateString()}</td>
                                    <td className="text-left font-medium">{vehicle.tipo_veiculo}</td>
                                    <td className="text-left">{vehicle.modelo}</td>
                                    <td className="text-left">{vehicle.fabricante}</td>
                                    <td className="text-center">{vehicle.ano}</td>
                                    <td className="text-blue-700 text-right font-semibold">R$ {vehicle.preco}</td>
                                    <td className="w-12"></td>  
                                    {!loading && (
                                        <td className="absolute text-white right-1 top-1/2 -translate-y-1/2 rounded p-2 bg-red-500 cursor-pointer hover:scale-105 duration-300 group" onClick={e => deleteVehicle(e, vehicle.id ?? '')}>
                                            <TrashIcon className="text-lg duration-300" />
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>


                    {/* Table Paginaton  */}
                    <Pagination totalVehicles={vehicles.length} vehiclesPerPage={vehiclesPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                </div>
            )}
        </div>
    )
}
