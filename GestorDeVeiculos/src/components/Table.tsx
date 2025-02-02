import { FormEvent, useContext, useEffect, useState } from "react"
import { TrashIcon } from '@radix-ui/react-icons'
import Pagination from "./TablePagination"
import { toast } from "react-toastify"
import { api } from "../services/api"
import { CarProps, CombustivelEnum, MotoProps, VehicleContextProps } from "../@types/web"
import { VeiculoInfo } from "./Radix/VeiculoInfo"
import { Filter } from "./Filter"
import { VehicleContext } from "../Context/VehicleContext"



export const Table = ({ setVehicles, vehicles }: Partial<VehicleContextProps>) => {
    const [loading, setLoading] = useState(false)
    const [filteredVehicles, setFilteredVehicles] = useState<(CarProps & MotoProps)[]>([])
    const { filters } = useContext(VehicleContext); // Acessando o contexto

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const vehiclesPerPage = 10
    const lastVehicleIndex = currentPage * vehiclesPerPage
    const firstVehicleIndex = lastVehicleIndex - vehiclesPerPage
    const currentVehicles = filteredVehicles?.slice(firstVehicleIndex, lastVehicleIndex)

    useEffect(() => {
        // Se não houver filtros ou veículos, retorna sem fazer nada
        if (!vehicles || vehicles.length === 0) return;

        const filteredVehicles = vehicles.filter((vehicle) => {
            let matches = true;

            // Verificando o filtro de tipo de veículo
            if (filters.tipo_veiculo && vehicle.tipo_veiculo !== filters.tipo_veiculo) {
                matches = false;
            }

            // Filtros adicionais para modelo, fabricante, etc.
            if (filters.modelo && filters.modelo !== "" && !vehicle.modelo.toLowerCase().includes(filters.modelo.toLowerCase())) {
                matches = false;
            }

            if (filters.fabricante && filters.fabricante !== "" && !vehicle.fabricante.toLowerCase().includes(filters.fabricante.toLowerCase())) {
                matches = false;
            }

            if (filters.ano && vehicle.ano !== filters.ano) {
                matches = false;
            }

            // Filtro para quantidade de portas
            if (filters.quantidade_portas !== null && vehicle.quantidade_portas !== filters.quantidade_portas) {
                matches = false;
            }
        
            // Filtro para tipo de combustível
            if (filters.tipo_combustivel && Object.values(CombustivelEnum).includes(filters.tipo_combustivel) && vehicle.tipo_combustivel !== undefined) {
                if (vehicle.tipo_combustivel !== filters.tipo_combustivel) {
                    matches = false;
                }
            }

            // Filtro para cilindrada (apenas para motos)
            if (filters.cilindrada !== null && vehicle.tipo_veiculo === 'MOTO' && vehicle.cilindrada !== filters.cilindrada) {
                matches = false;
            }

            return matches;
        });

        // Atualizando a lista filtrada de veículos
        setFilteredVehicles(filteredVehicles);

    }, [filters, vehicles, setFilteredVehicles]);

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
        <>
            <Filter setFilteredVehicles={setFilteredVehicles} vehicles={vehicles || []} setCurrentPage={setCurrentPage} />
            <div className="w-full">
                {!filteredVehicles || filteredVehicles.length === 0 ? (
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
                        <Pagination totalVehicles={filteredVehicles.length} vehiclesPerPage={vehiclesPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    </div>
                )}
            </div>
        </>
    )
}
