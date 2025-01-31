import { createContext, ReactNode, useState } from "react";
import { CarProps, MotoProps, VehicleContextProps, VehicleType } from "../@types/web";
import { api } from "../services/api";

// Context + Provider
//Função que constroe o Provider e também permite Consumir os Dados Globais
export const VehicleContext = createContext({} as VehicleContextProps)

export function VehicleProvider({ children }: { children: ReactNode }) {
    // Reset form
    const initialVehicle = {
        modelo: '',
        fabricante: '',
        ano: 1886,
        preco: 0,
        tipo_veiculo: null,
        cilindrada: null,
        quantidade_portas: null,
        tipo_combustivel: null,
    };

    const [countVehicles, setVehiclesCount] = useState<number | null>(null)
    const [vehicle, setVehicle] = useState<(CarProps & MotoProps)>(initialVehicle)
    const [vehicles, setVehicles] = useState<(CarProps & MotoProps)[]>([])

    const getVehiclesCount = async () => {
        const { data } = await api.get('/vehicles/count')
        setVehiclesCount(data.count)
    }

    const getVehicles = async () => {
        const { data } = await api.get('/vehicles')
        setVehicle(data)
    }

    function isCar(vehicle: VehicleType): vehicle is CarProps {
        return (vehicle as CarProps).quantidade_portas !== undefined && (vehicle as CarProps).tipo_combustivel !== undefined;
    }

    function isMoto(vehicle: VehicleType): vehicle is MotoProps {
        return (vehicle as MotoProps).cilindrada !== undefined;
    }

    return (
        <VehicleContext.Provider value={{ setVehicle, countVehicles, getVehicles, vehicle, setVehiclesCount, setVehicles, vehicles, isCar, isMoto, initialVehicle }}>
            {children}
        </VehicleContext.Provider>
    )
}
