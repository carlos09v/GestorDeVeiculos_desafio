import { createContext, ReactNode, useState } from "react";
import { VehicleContextProps, VehicleProps } from "../@types/web";
import { api } from "../services/api";

// Context + Provider
//Função que constroe o Provider e também permite Consumir os Dados Globais
export const VehicleContext = createContext({} as VehicleContextProps)

export function VehicleProvider({ children }: { children: ReactNode }) {
    const [countVehicles, setVehiclesCount] = useState<number | null>(null)
    const [vehicles, setVehicle] = useState<VehicleProps[] | null>(null)

    const getVehiclesCount = async () => {
        const { data } = await api.get('/vehicles/count')
        setVehiclesCount(data.count)
    }

    const getVehicles = async () => {
        const { data } = await api.get('/vehicles')
        setVehicle(data.vehicles)
    }


    return (
        <VehicleContext.Provider value={{ setVehicle, countVehicles, getVehicles, vehicles, setVehiclesCount }}>
            {children}
        </VehicleContext.Provider>
    )
}
