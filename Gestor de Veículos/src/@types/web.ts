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
    preco: string
    addedAt?: Date
}

interface CarProps extends VehicleProps {
    quantidadePortas: 2 | 3 | 4 | 5 | 6
    combustivel: CombustivelEnum
}

interface MotoProps extends VehicleProps {
    cilindrada: number
}

enum CombustivelEnum {
    Gasolina,
    Etanol,
    Diesel,
    Flex
}

type VehicleContextProps = {
    countVehicles: number | null
    setVehiclesCount: (value: React.SetStateAction<number | null>) => void
    getVehicles: () => Promise<void>
    vehicle: VehicleType
    vehicles: VehicleType[] | null
    setVehicle: (value: React.SetStateAction<VehicleType>) => void
    setVehicles: (value: React.SetStateAction<VehicleType[]>) => void
    setCarro: React.Dispatch<React.SetStateAction<CarProps>>
    setMoto: React.Dispatch<React.SetStateAction<MotoProps>>
}

export type VehicleType = VehicleProps | CarProps | MotoProps;
export type { TablePaginationProps, VehicleProps, CarProps, MotoProps, VehicleContextProps, CombustivelEnum }