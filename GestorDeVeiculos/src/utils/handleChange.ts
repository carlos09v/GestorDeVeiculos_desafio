import { ChangeEvent } from "react";
import { CarProps, MotoProps } from "../@types/web";


export const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, setVehicle: React.Dispatch<React.SetStateAction<CarProps & MotoProps>>, vehicleField?: string) => {
        const { name, value } = e.target;

        // Lógica de validação ou transformação
        let newValue = value === "" ? "" : isNaN(Number(value)) ? value : Number(value) || "";

        if (name === 'preco') {
            // Converte para float e garante duas casas decimais
            newValue = parseFloat(value).toFixed(2); // Converte para float e fixa para 2 casas decimais
            newValue = parseFloat(newValue);
        }

        if (name === 'categoryOptions') {
            setVehicle(prev => {
              // Atualiza o tipo de veículo e limpa campos específicos
              const tipo_veiculo = value.toUpperCase() as 'CARRO' | 'MOTO';
      
              return {
                ...prev,
                tipo_veiculo,
                ...(tipo_veiculo === 'CARRO' ? { cilindrada: null } : { quantidade_portas: null, tipo_combustivel: null }),
              };
            });
          } else if (name === 'quantidade_portas') {
            setVehicle(prev => ({
              ...prev,
              quantidade_portas: value === '' ? null : value as "2" | "3" | "4" | "5" | "6", // Mantém o valor como string (exemplo: "2", "3", etc.)
            }));
          } else {
            // Se for outro campo (input de texto ou número), atualiza normalmente
            setVehicle(prev => ({
              ...prev,
              [vehicleField ?? name]: newValue, // Atualiza o campo específico com o novo valor
            }));
          }
    };