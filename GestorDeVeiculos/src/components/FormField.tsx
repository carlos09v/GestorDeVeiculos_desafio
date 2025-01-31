import { ChangeEvent } from "react"
import { CarProps, CombustivelEnum, MotoProps, VehicleType } from "../@types/web"
import clsx from "clsx";

interface FormFieldProps {
  typeNumber: number;
  label?: string;
  placeholder?: string;

  vehicleDataRegister: (CarProps & MotoProps);
  setVehicleDataRegister: React.Dispatch<React.SetStateAction<(CarProps & MotoProps)>>
}


export const FormField = ({ typeNumber, placeholder, label, setVehicleDataRegister, vehicleDataRegister }: FormFieldProps) => {

  const fieldMapVehicle: Record<number, keyof (CarProps & MotoProps)> = {
    1: "modelo",
    2: "fabricante",
    3: "ano",
    4: "preco",
    6: "quantidade_portas",
    7: "tipo_combustivel",
    8: "cilindrada"
  };

  // Acessa o campo correspondente de vehicleDataRegister
  const vehicleField = fieldMapVehicle[typeNumber];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Se for campo numérico, converte para número, senão mantém string
    const newValue = value === "" ? "" : isNaN(Number(value)) ? value : Number(value) || "";

    // Se a mudança for no tipo de veículo (campo select de categoria)
    if (name === 'categoryOptions') {
      setVehicleDataRegister(prev => {
        // Atualiza o tipo de veículo e limpa campos específicos
        const tipo_veiculo = value.toUpperCase() as 'CARRO' | 'MOTO';

        return {
          ...prev,
          tipo_veiculo,
          ...(tipo_veiculo === 'CARRO' ? { cilindrada: null } : { quantidade_portas: null, tipo_combustivel: null }),
        };
      });
    } else {
      // Se for outro campo (input de texto ou número), atualiza normalmente
      setVehicleDataRegister(prev => ({
        ...prev,
        [vehicleField]: newValue, // Atualiza o campo específico com o novo valor
      }));
    }
  }


  return (
    <div className="font-bold w-full">
      <label htmlFor={`input-${typeNumber}`} className="mr-3">{label}</label>
      {typeNumber !== 5 && typeNumber !== 7 && typeNumber !== 6 && (
        <>
          <input
            id={`input-${typeNumber}`} // Garante um ID único para cada tipo
            name={vehicleField}
            placeholder={placeholder}
            type={typeNumber === 3 || typeNumber === 4 || typeNumber === 6 ? "number" : "text"} // Torna o campo 'Ano' numérico
            maxLength={typeNumber === 1 || typeNumber === 2 ? 20 : undefined} // Limita o comprimento para o campo 'Ano'
            min={typeNumber === 3 ? 1886 : typeNumber === 4 ? 0 : undefined} // Mínimo depende de typeNumber
            max={typeNumber === 3 ? new Date().getFullYear() : undefined}
            className={clsx(
              "p-2 border-2 border-black rounded mb-4 w-full", // Padrão: ocupa largura total
              typeNumber === 3 || typeNumber === 4 ? "!w-1/3" : ""
            )}
            onChange={handleChange}
            value={
              vehicleDataRegister[vehicleField] !== undefined && vehicleDataRegister[vehicleField] !== null
                ? vehicleDataRegister[vehicleField].toString()
                : "" // Use o valor direto ou uma string vazia
            }
          />
        </>

      )}

      {/* ---- Categoria */}
      {typeNumber == 5 && (
        <select className="rounded p-2 border-2 border-black" name="categoryOptions" onChange={handleChange} value={vehicleDataRegister.tipo_veiculo ?? ''}>
          <option className='text-center'>--- ⬇️ ⬇️ ---</option>
          <option value="CARRO">🚙 Carro</option>
          <option value="MOTO">🛵 Moto</option>
        </select>
      )}

      {typeNumber === 6 && vehicleDataRegister.tipo_veiculo === "CARRO" && (
        <select
          className="p-2 border-2 border-black rounded"
          onChange={handleChange}
          value={vehicleDataRegister.quantidade_portas ?? ''}
        >
          <option value=''>Selecione</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>
      )}

      {typeNumber == 7 && vehicleDataRegister.tipo_veiculo === "CARRO" && (
        <select className="rounded p-2 border-2 border-black" name="tipo_combustivel" onChange={handleChange} value={vehicleDataRegister.tipo_combustivel ?? ''}>
          <option className='text-center' value=''>--- ⛽ ---</option>
          <option value="GASOLINA">Gasolina</option>
          <option value="ETANOL">Etanol</option>
          <option value="DIESEL">Diesel</option>
          <option value="FLEX">Flex</option>
        </select>
      )}
    </div>
  )
}
