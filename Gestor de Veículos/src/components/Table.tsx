import { FormEvent, useContext, useEffect, useState } from "react"
import { TrashIcon } from '@radix-ui/react-icons'
import Pagination from "./TablePagination"
import { toast } from "react-toastify"
import { api } from "../services/api"
import { VehicleContext } from "../Context/VehicleContext"

export const Table = () => {
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState('')
    const { vehicles, getVehicles, setVehicles } = useContext(VehicleContext)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const vehiclesPerPage = 8
    const lastVehicleIndex = currentPage * vehiclesPerPage
    const firstVehicleIndex = lastVehicleIndex - vehiclesPerPage
    const currentVehicles = vehicles?.slice(firstVehicleIndex, lastVehicleIndex)

    useEffect(() => {

    }, [])

    // Delete Vehicle
    const deleteVehicle = async (e: FormEvent, id: string) => {
        e.preventDefault()

        setLoading(true)
        try {
            console.log(vehicles)
            console.log(id)
            const { data } = await api.delete(`/delete-product/${id}`)
            
            toast.success(data.message)
            // Remover o veículo do estado local
            setVehicles((prevVehicles) =>
                prevVehicles?.filter(vehicle => vehicle.id !== id) || []
            );
            setLoading(false)
        } catch (err: any) {
            if (err.response) return toast.error(err.response.data.errorMessage)
            setLoading(false)
        }
    }

    return (
        <div className="w-full">
            {!vehicles || vehicles.length === 0 ? (
                <p className="font-bold text-center text-red-600 underline">- Nenhum veículo cadastrado!</p>
            ) : (
                <div className="flex flex-col items-center gap-4 ">
                    <table className="table-auto rounded-lg overflow-hidden shadow-lg w-[75%] ">
                        <thead>
                            <tr className="text-xl bg-black text-slate-100">
                                <th className="text-lg">No.</th>
                                <th></th>
                                <th>Modelo</th>
                                <th>Fabricante</th>
                                <th>Ano</th>
                                <th>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentVehicles?.map((vehicle, i) => (
                                <tr key={i} className='font-semibold'>
                                    <td className="text-center">{i + 1}</td>
                                    <td className="text-center">{new Date(vehicle.addedAt ?? new Date()).toLocaleDateString()}</td>
                                    <td className="text-left">{vehicle.modelo}</td>
                                    <td className="text-left">{vehicle.fabricante}</td>
                                    <td className="text-center">{vehicle.ano}</td>
                                    <td className="text-blue-700 text-right">R$ {vehicle.preco}</td>
                                    {!loading && (
                                        <td className="absolute ml-3 rounded p-2 bg-red-500 cursor-pointer hover:scale-105 duration-300 group" onClick={e => deleteVehicle(e, vehicle.id ?? '')}>
                                            <TrashIcon className="fill-white/90 hover:fill-white text-lg duration-300" />
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Table Paginaton  */}
                    <Pagination totalCars={vehicles.length} carsPerPage={vehiclesPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                </div>
            )}
        </div>
    )
}
