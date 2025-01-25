import { createContext, ReactNode, useState } from "react";
import { CarProps, MotoProps, VehicleContextProps, VehicleProps } from "../@types/web";
import { api } from "../services/api";

// Context + Provider
//Função que constroe o Provider e também permite Consumir os Dados Globais
export const VehicleContext = createContext({} as VehicleContextProps)

export function VehicleProvider({ children }: { children: ReactNode }) {
    const [countVehicles, setVehiclesCount] = useState<number | null>(null)
    const [vehicle, setVehicle] = useState<VehicleProps>({ id: '0', modelo: '', fabricante: '', ano: 1900, preco: '' })
    const [vehicles, setVehicles] = useState<VehicleProps[]>([])

    const [carro, setCarro] = useState<CarProps>({ ...vehicle, quantidadePortas: 2, combustivel: 0 });
	const [moto, setMoto] = useState<MotoProps>({ ...vehicle, cilindrada: 0 });

    const getVehiclesCount = async () => {
        const { data } = await api.get('/vehicles/count')
        setVehiclesCount(data.count)
    }

    const getVehicles = async () => {
        const { data } = await api.get('/vehicles')
        setVehicle(data.vehicles)
    }


    return (
        <VehicleContext.Provider value={{ setVehicle, countVehicles, getVehicles, vehicle, setVehiclesCount, setVehicles, vehicles, setCarro, setMoto }}>
            {children}
        </VehicleContext.Provider>
    )
}
