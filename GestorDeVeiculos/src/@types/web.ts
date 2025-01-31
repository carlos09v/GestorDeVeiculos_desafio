type TablePaginationProps = {
    totalCars: number
    carsPerPage: number
    setCurrentPage: (value: React.SetStateAction<number>) => void
    currentPage: number
}

type VehicleProps = {
    id?: string
    modelo: string
    fabricante: string
    ano: number
    preco: number
    tipo_veiculo: 'CARRO' | 'MOTO' | null
    addedAt?: Date
}

interface CarProps extends VehicleProps {
    quantidade_portas: 2 | 3 | 4 | 5 | 6 | null
    tipo_combustivel: CombustivelEnum | null
}

interface MotoProps extends VehicleProps {
    cilindrada: number | null
}

export enum CombustivelEnum {
    GASOLINA,
    ETANOL,
    DIESEL,
    FLEX
}

type VehicleContextProps = {
    countVehicles: number | null
    setVehiclesCount: (value: React.SetStateAction<number | null>) => void
    getVehicles: () => Promise<void>
    vehicle: (CarProps & MotoProps)
    vehicles: (CarProps & MotoProps)[] | null
    setVehicle: (value: React.SetStateAction<(CarProps & MotoProps)>) => void
    setVehicles: (value: React.SetStateAction<(CarProps & MotoProps)[]>) => void
    isMoto(vehicle: VehicleType): vehicle is MotoProps
    isCar(vehicle: VehicleType): vehicle is CarProps
    initialVehicle: {
        modelo: string;
        fabricante: string;
        ano: number;
        preco: number;
        tipo_veiculo: null;
        cilindrada: null;
        quantidade_portas: null;
        tipo_combustivel: null;
    }
}

export type VehicleType = CarProps | MotoProps;
export type { TablePaginationProps, VehicleProps, CarProps, MotoProps, VehicleContextProps }