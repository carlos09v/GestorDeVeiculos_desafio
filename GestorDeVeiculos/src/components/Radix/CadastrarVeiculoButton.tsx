import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { VehicleContext } from "../../Context/VehicleContext";
import { FormField } from "../FormField";
import { CarProps, CombustivelEnum, MotoProps } from "../../@types/web";

const CadastrarVeiculoModalButton = () => {
	const { vehicle, setVehicle, setVehicles, isCar, isMoto, initialVehicle } = useContext(VehicleContext);
	const [modalOpen, setModalOpen] = useState(false);

	// Define os campos do formulário com base na categoria
	const formFields = [
		{ type: 1, label: "Modelo:", placeholder: "Ex: Gol" },
		{ type: 2, label: "Fabricante:", placeholder: " Ex: Volkswagen" },
		{ type: 3, label: "Ano:", placeholder: "Ex: 2020" },
		{ type: 4, label: "Preço R$:", placeholder: "Ex: 2000.00" }
	];

	// Adiciona campos específicos para Carro
	const carroFields = [
		{ type: 6, label: "Quantidade de Portas:" },
		{ type: 7, label: "Combustível:", },
	];

	// Adiciona campos específicos para Moto
	const motoFields = [
		{ type: 8, label: "Cilindrada:", placeholder: "Ex: 150" },
	];

	// Cadastrar Veículo
	const handleVehicleRegister = async (e: FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return // validar

		try {
			// Criação do objeto com os campos principais
			const vehicleData: Partial<CarProps & MotoProps> = {
				modelo: vehicle.modelo,
				fabricante: vehicle.fabricante,
				preco: vehicle.preco,
				ano: vehicle.ano,
				tipo_veiculo: vehicle.tipo_veiculo
			};

			// Condicional para adicionar campos específicos para Carro ou Moto
			if (isCar(vehicle)) {
				vehicleData.quantidade_portas = vehicle.quantidade_portas;
				vehicleData.tipo_combustivel = vehicle.tipo_combustivel;
			}
			if (isMoto(vehicle)) {
				vehicleData.cilindrada = vehicle.cilindrada;
			}
			// Envio para a API
			const { data } = await api.post('/veiculos', vehicleData);

			setVehicles((prevVehicles) => [...prevVehicles, data.veiculo]); // Adiciona o veículo na lista de Veículos(tabela)
			toast.success(data.message);

			// Limpa o formulário e Fecha o modal
			setVehicle(initialVehicle);
			setModalOpen(false)
		} catch (err) {
			console.log(err);
		}
	};


	const validateForm = () => {
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

			if (vehicle.ano < 1886 || vehicle.ano > anoAtual) {
				toast.warn(`Insira um ano válido [1886-${anoAtual}]`);
				return false;
			}
			if (!Number(vehicle.preco)) {
				toast.warn('Insira um preço válido!');
				return false;
			}

			// Validação de propriedades específicas
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

	return (
		<Dialog.Root open={modalOpen} onOpenChange={() => {
			setModalOpen(!modalOpen)
			setVehicle(initialVehicle)
		}}>
			<Dialog.Trigger asChild>
				<button className="rounded bg-blue-500 text-white p-4 font-medium leading-none shadow-[0_2px_10px] shadow-blackA4  focus:shadow-black focus:outline-none m-auto block hover:bg-blue-400 transition-colors">
					Cadastrar Veículo
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="dialog-overlay" />
				<Dialog.Content className="dialog-content shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px, _hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] max-w-[800px]">
					<Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
						Cadastro
						<hr />
					</Dialog.Title>
					<Dialog.Description className="mb-5 mt-2.5 text-sm leading-normal">
						Carros🚗 e Motos🏍️!
					</Dialog.Description>

					<form onSubmit={handleVehicleRegister}>
						<div className="grid grid-cols-2 gap-4 w-full">
							{/* Mapeando os campos do formulário */}
							{formFields.map((field) => (
								<div
									key={field.type}
									className={"w-full"}
								>
									<FormField
										typeNumber={field.type}
										label={field.label}
										placeholder={field.placeholder}
										setVehicle={setVehicle}
										vehicle={vehicle}
									/>
								</div>
							))}
						</div>

						{/* Categoria separada, centralizada abaixo */}
						<div className="flex justify-center m-4 w-full">
							<div className="w-1/2">
								<FormField
									typeNumber={5}
									label="Categoria:"
									setVehicle={setVehicle}
									vehicle={vehicle}
								/>
							</div>
						</div>

						{/* Linha 4 - Campos Específicos por Categoria */}
						{vehicle.tipo_veiculo && (
							<div className="flex w-full justify-around items-center">
								{vehicle.tipo_veiculo === "CARRO" &&
									carroFields.map((field) => (
										<div key={field.type}>
											<FormField
												typeNumber={field.type}
												label={field.label}

												setVehicle={setVehicle}
												vehicle={vehicle}
											/>
										</div>
									))}

								{vehicle.tipo_veiculo === "MOTO" &&
									motoFields.map((field) => (
										<div key={field.type}>
											<FormField
												typeNumber={field.type}
												label={field.label}
												placeholder={field.placeholder}
												setVehicle={setVehicle}
												vehicle={vehicle}
											/>
										</div>
									))}
							</div>
						)}


						{/* Botão de submissão */}
						<div className="flex justify-end mt-4">
							<button
								type="submit"
								className="bg-purple-600 text-sm p-2 rounded-lg text-white"
							>
								Adicionar
							</button>
						</div>
					</form>

					<Dialog.Close asChild>
						<button
							className="closeModalButton"
							aria-label="Close"
						>
							<Cross2Icon />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root >
	);
};

export default CadastrarVeiculoModalButton;
