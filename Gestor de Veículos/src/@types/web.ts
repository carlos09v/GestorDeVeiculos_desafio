type TablePaginationProps = {
    totalCars: number
    carsPerPage: number
    setCurrentPage: (value: React.SetStateAction<number>) => void
    currentPage: number
}

type VehicleProps = {
    id: string
    modelo: string
    fabricante: string
    ano: Date
    preco: number
    addedAt: string
}

interface CarProps extends VehicleProps {
    quantidadePortas: number
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
    vehicles: VehicleProps[] | null
    setVehicle: (value: React.SetStateAction<VehicleProps[] | null>) => void
}

export type { TablePaginationProps, VehicleProps, CarProps, MotoProps, VehicleContextProps }