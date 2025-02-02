import { ChangeEvent } from "react";
import { CarProps, MotoProps } from "../@types/web";


export const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, setVehicle: React.Dispatch<React.SetStateAction<CarProps & MotoProps>>, fieldMapVehicle?: Record<number, keyof (CarProps & MotoProps)>) => {
  const { name, value } = e.target;

  // Verifica se o fieldMapVehicle foi passado
  let field: keyof (CarProps & MotoProps) | undefined = undefined;
  
  if (fieldMapVehicle) {
    // Tenta mapear o nome (que é um número) para a chave correspondente
    field = fieldMapVehicle[parseInt(name)];
  }

   // Caso não encontre um campo correspondente no fieldMapVehicle, usa o name como fallback
  field = field ?? name as keyof (CarProps & MotoProps); // Asserção de tipo

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
      const tipo_veiculo = value?.trim() === "" ? "" : value.toUpperCase() as 'CARRO' | 'MOTO';

  
      return {
        ...prev,
        tipo_veiculo: tipo_veiculo,
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
      [field]: newValue, // Usa o 'field' se disponível, senão o 'name'
    }));
  }
};