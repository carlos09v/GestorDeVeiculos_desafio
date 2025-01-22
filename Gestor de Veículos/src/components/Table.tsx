import { FormEvent, useContext, useEffect, useState } from "react"
import { TrashIcon } from '@radix-ui/react-icons'
import Pagination from "./TablePagination"
import { toast } from "react-toastify"
import { api } from "../services/api"
import { VehicleContext } from "../Context/VehicleContext"

export const Table = () => {
    const [loading, setLoading] = useState(false)
    const { vehicles, getVehicles, setVehiclesCount } = useContext(VehicleContext)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 8
    const lastVehicleIndex = currentPage * productsPerPage
    const firstVehicleIndex = lastVehicleIndex - productsPerPage
    const currentVehicles = vehicles?.slice(firstVehicleIndex, lastVehicleIndex)

    useEffect(() => {

    }, [])

    // Delete Car
    const deleteVehicle = async (e: FormEvent, id: string) => {
        e.preventDefault()

        setLoading(true)
        try {
            const { data } = await api.delete(`/delete-product/${id}`)

            toast.success(data.message)
            await getVehicles()
            setVehiclesCount(null)
            setLoading(false)
        } catch (err: any) {
            if (err.response) return toast.error(err.response.data.errorMessage)
            setLoading(false)
        }
    }

    return (
        <div>
            {!vehicles || vehicles.length === 0 ? (
                <p className="text-lg font-semibold  text-center mt-1 text-red-600 underline">- Nenhum carro cadastrado :(</p>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <table className="max-w-[70%] mx-auto mt-4 rounded-lg overflow-hidden shadow-lg">
                        <thead>
                            <tr className="text-xl bg-purple-500 text-slate-100">
                                <th className="text-lg">No.</th>
                                <th>Modelo</th>
                                <th>Fabricante</th>
                                <th>Ano</th>
                                <th>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentVehicles?.map((prod, i) => (
                                <tr key={i} className='font-semibold'>
                                    <td>{i + 1}</td>
                                    <td>{prod.modelo}</td>
                                    <td>{new Date(prod.addedAt).toLocaleDateString()}</td>
                                    <td>{prod.fabricante}</td>
                                    <td className="text-blue-700">R$ {prod.ano.toString()}</td>
                                    {!loading && (
                                        <td className="absolute ml-3 rounded p-2 bg-red-500 cursor-pointer hover:scale-105 duration-300 group" onClick={e => deleteVehicle(e, prod.id)}>
                                            <TrashIcon className="fill-white/90 hover:fill-white text-lg duration-300" />
                                            <span className="deleteProduct-tooltip group-hover:scale-100 left-12 top-0" >Excluir</span>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Table Paginaton  */}
                    <Pagination totalCars={vehicles.length} carsPerPage={productsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                </div>
            )}
        </div>
    )
}
