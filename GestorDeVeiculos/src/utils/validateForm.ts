import { toast } from "react-toastify";
import { CarProps, CombustivelEnum, MotoProps, VehicleType } from "../@types/web";

export const validateForm = (vehicle: (CarProps & MotoProps), isCar?: (vehicle: VehicleType) => vehicle is CarProps, isMoto?: (vehicle: VehicleType) => vehicle is MotoProps) => {
    const anoAtual = new Date().getFullYear(); // Pega o ano atual

    // Validação de Categoria
    if (!vehicle.tipo_veiculo) {
        toast.warn('Selecione um tipo de veículo!');
        return false;
    }

    if (vehicle.modelo && vehicle.fabricante && vehicle.ano && vehicle.preco) {
        if (!Number.isInteger(vehicle.ano)) {
            toast.warn('O ano deve ser um número inteiro!');
            return false;
        }

        // Validação do ano de fabricação
        if (vehicle.ano < 1886 || vehicle.ano > anoAtual) {
            toast.warn('O ano deve ser entre 1886 e o ano atual!');
            return false;
        }
        if (!Number(vehicle.preco)) {
            toast.warn('Insira um preço válido!');
            return false;
        }

        // Validação de propriedades específicas
        if (isCar && isMoto) {
            if (vehicle.tipo_veiculo === 'CARRO') {
                if (isCar(vehicle)) {
                    if (!vehicle.quantidade_portas) {
                        toast.warn('Informe a quantidade de portas para o carro!');
                        return false;
                    }
                    if (!vehicle.tipo_combustivel || !Object.values(CombustivelEnum).includes(vehicle.tipo_combustivel)) {
                        toast.warn('Informe o tipo de combustível do carro!');
                        return false;
                    }
                } else {
                    toast.warn('O tipo de veículo não corresponde à categoria "Carro"');
                    return false;
                }
            } else if (vehicle.tipo_veiculo === 'MOTO') {
                if (isMoto(vehicle)) {
                    if (!vehicle.cilindrada) {
                        toast.warn('Informe a cilindrada da moto!');
                        return false;
                    } else if (!Number.isInteger(vehicle.cilindrada)) {
                        toast.warn('A cilindrada deve ser um número inteiro!');
                        return false;
                    } else if (vehicle.cilindrada > 32_767) {
                        toast.warn('O número máximo de cilindrada é [32.767 - smallint]');
                        return false;
                    }

                } else {
                    toast.warn('O tipo de veículo não corresponde à categoria "Moto"');
                    return false;
                }
            } else {
                toast.warn('Categoria inválida!');
                return false;
            }
        }

        // Converter preço para string formatada
        if (typeof vehicle.preco === 'number') {
            vehicle.preco = vehicle.preco.toFixed(2);
        } else {
            vehicle.preco = parseFloat(vehicle.preco as string).toFixed(2);
        }

        console.log('Enviando Veiculo:', vehicle);
        return true; // Validação passou
    } else {
        toast.warn('Preencha todos os campos!');
        return false;
    }
}