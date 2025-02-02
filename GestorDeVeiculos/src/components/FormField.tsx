import { ChangeEvent } from "react"
import { CarProps, MotoProps, VehicleProps } from "../@types/web"
import clsx from "clsx";
import { selectFields } from "../utils/selectFields";
import { formatValue } from "../utils/formatValue";
import { handleChange } from "../utils/handleChange";

interface FormFieldProps {
  typeNumber: number;
  label?: string;
  placeholder?: string;

  setVehicle: (value: React.SetStateAction<(CarProps & MotoProps)>) => void
  vehicle: (CarProps & MotoProps);
}


export const FormField = ({ typeNumber, placeholder, label, setVehicle, vehicle }: FormFieldProps) => {

  const fieldMapVehicle: Record<number, keyof (CarProps & MotoProps)> = {
    1: "modelo",
    2: "fabricante",
    3: "ano",
    4: "preco",
    6: "quantidade_portas",
    7: "tipo_combustivel",
    8: "cilindrada"
  };

  // Acessa o campo correspondente de vehicle
  const vehicleField = fieldMapVehicle[typeNumber];
  
  return (
    <div className="font-bold w-full">
      <label htmlFor={`input-${typeNumber}`} className="mr-3">{label}</label>
      {typeNumber !== 5 && typeNumber !== 7 && typeNumber !== 6 && (
        <input
          id={`input-${typeNumber}`} // Garante um ID único para cada tipo
          name={vehicleField}
          placeholder={placeholder}
          type={typeNumber === 3 || typeNumber === 4 || typeNumber === 6 || typeNumber === 8 ? "number" : "text"} // Torna o campo 'Ano' numérico
          maxLength={typeNumber === 1 || typeNumber === 2 ? 20 : undefined} // Limita o comprimento para o campo 'Ano'
          min={typeNumber === 3 ? 1886 : 0} // Mínimo depende de typeNumber
          max={typeNumber === 3 ? new Date().getFullYear() : undefined}
          step={typeNumber === 4 ? 0.01 : undefined}
          className={clsx(
            "p-2 border-2 border-black rounded mb-4 w-full", // Padrão: ocupa largura total
            typeNumber === 3 || typeNumber === 4 ? "!w-1/3" : ""
          )}
          onChange={(e) => handleChange(e, setVehicle, vehicleField)}
          value={
            vehicle[vehicleField] !== undefined && vehicle[vehicleField] !== null
              ? vehicle[vehicleField].toString()
              : "" // Use o valor direto ou uma string vazia
          }
        />
      )}

      {/* ---- Categoria */}
      {typeNumber == 5 && (
        <select className="rounded p-2 border-2 border-black" name="categoryOptions" onChange={(e) => handleChange(e, setVehicle, vehicleField)} value={vehicle.tipo_veiculo ?? ''}>
          <option className='text-center'>--- ⬇️ ⬇️ ---</option>
          <option value="CARRO">🚙 Carro</option>
          <option value="MOTO">🛵 Moto</option>
        </select>
      )}


      {/* Campos Específicos de Carro */}
      {
        vehicle.tipo_veiculo === "CARRO" && (typeNumber === 6 || typeNumber === 7) && (
          // Verificar se o tipo de campo existe no mapeamento
          <select
            className="p-2 border-2 border-black rounded"
            name={selectFields[fieldMapVehicle[typeNumber]].name} // Usar o mapeamento
            onChange={(e) => handleChange(e, setVehicle, vehicleField)}
            value={formatValue(selectFields[fieldMapVehicle[typeNumber]].name, vehicle[selectFields[fieldMapVehicle[typeNumber]].name as keyof VehicleProps])}
          >
            {selectFields[fieldMapVehicle[typeNumber]].options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        )
      }
    </div>
  )
}
