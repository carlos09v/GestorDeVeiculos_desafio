import { ChangeEvent } from "react"
import { CarProps, CombustivelEnum, MotoProps, VehicleType } from "../@types/web"
import clsx from "clsx";

interface FormFieldProps {
  typeNumber: number;
  label?: string;
  placeholder?: string;

  vehicleDataRegister: VehicleType;
  setVehicleDataRegister: React.Dispatch<React.SetStateAction<VehicleType>>
  setCategoria?: (value: React.SetStateAction<"Carro" | "Moto" | null>) => void
  setCarro?: React.Dispatch<React.SetStateAction<CarProps>>
  setMoto?: React.Dispatch<React.SetStateAction<MotoProps>>
}



export const FormField = ({ typeNumber, placeholder, label, setVehicleDataRegister, vehicleDataRegister, setCategoria, setCarro, setMoto }: FormFieldProps) => {

  const fieldMap: Record<number, keyof VehicleType> = {
    1: "modelo",
    2: "ano",
    3: "fabricante",
    4: "preco"
  };

  const handleVehicleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeNumber) {
      const field = fieldMap[typeNumber];

      if (field) {
        setVehicleDataRegister({
          ...vehicleDataRegister,
          [field]: field === "ano" ? Number(e.target.value) : e.target.value,
        });
      }
    }
  };

  const handleCarroChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCarro &&
      setCarro((prev) => ({
        ...prev,
        combustivel: Number(e.target.value) as CombustivelEnum,
      }));
  };

  const handleMotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMoto &&
      setMoto((prev) => ({
        ...prev,
        cilindrada: Number(e.target.value),
      }));
  };

  return (
    <div className="font-bold w-full">
      <label htmlFor={`input-${typeNumber}`} className="mr-3">{label }</label>
      {typeNumber !== 5 && typeNumber !== 7 && (
        <>
          <input
            id={`input-${typeNumber}`} // Garante um ID único para cada tipo
            placeholder={placeholder}
            type={typeNumber === 3 || typeNumber === 8 ? "number" : "text"} // Torna o campo 'Ano' numérico
            maxLength={typeNumber === 3 ? 4 : 16} // Limita o comprimento para o campo 'Ano'
            className={clsx("p-2 border-2 border-black rounded mb-4 ", `w-${typeNumber == 3 || typeNumber == 4 ? 24 : "1/2"}`)}
            onChange={typeNumber === 8 ? handleMotoChange : handleVehicleChange}
            value={typeNumber === 1 ? vehicleDataRegister.modelo :
              typeNumber === 2 ? vehicleDataRegister.fabricante :
                typeNumber === 3 ? vehicleDataRegister.ano | 1900 :
                  typeNumber === 4 ? vehicleDataRegister.preco : ""}
          />
        </>

      )}

      {setCategoria && typeNumber == 5 && (
        <select className="rounded p-2 border-2 border-black" name="categoryOptions" id="categoryOptions" onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoria(e.target.value as 'Carro' | 'Moto')}>
          <option className='text-center' value="" >--- ⬇️ ⬇️ ---</option>
          <option value="Carro">Carro</option>
          <option value="Moto">Moto</option>
        </select>
      )}

      {typeNumber == 6 && setCarro && (
        <select className="rounded p-2 border-2 border-black" name="combustivel" id="categoryOptions" onChange={handleCarroChange}>
          <option className='text-center'>--- ⛽ ---</option>
          <option value={2}>Diesel</option>
          <option value={0}>Gasolina</option>
          <option value={1}>Etanol</option>
          <option value={3}>Flex</option>
        </select>
      )}

    </div>
  )
}
