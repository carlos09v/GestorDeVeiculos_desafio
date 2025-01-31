import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { VehicleContext } from "../../Context/VehicleContext";
import { FormField } from "../FormField";
import { CarProps, CombustivelEnum, MotoProps } from "../../@types/web";

const CadastrarVeiculoModalButton = () => {
	const [loading, setLoading] = useState(false);
	const { vehicle, setVehicle, setVehicles, isCar, isMoto, initialVehicle } = useContext(VehicleContext);

	// Define os campos do formulário com base na categoria
	const formFields = [
		{ type: 1, label: "Modelo:", placeholder: "Ex: Gol" },
		{ type: 2, label: "Fabricante:", placeholder: " Ex: Volkswagen" },
		{ type: 3, label: "Ano:", placeholder: "Ex: 2020" },
		{ type: 4, label: "Preço R$:", placeholder: "Ex: 2000.00" }
	];

	// Adiciona campos específicos para Carro
	const carroFields = [
		{ type: 6, label: "Quantidade de Portas:", placeholder: "" },
		{ type: 7, label: "Combustível:", placeholder: "" },
	];

	// Adiciona campos específicos para Moto
	const motoFields = [
		{ type: 8, label: "Cilindrada:", placeholder: "Ex: 150" },
	];

	// Cadastrar Veículo
	const handleVehicleRegister = async (e: FormEvent) => {
		e.preventDefault();
		const anoAtual = new Date().getFullYear(); // Pega o ano atual

		// Validação de Categoria
		if (!vehicle.tipo_veiculo) return toast.warn('Selecione um tipo de veículo!');

		if (vehicle.modelo && vehicle.fabricante && vehicle.ano && vehicle.preco) {
			if (vehicle.ano < 1886 || vehicle.ano > anoAtual) return toast.warn(`Insira um ano válido [1886-${anoAtual}]`);
			if (!Number(vehicle.preco)) return toast.warn(`Insira um preço válido!`);

			// Validação de propriedades específicas
			if (vehicle.tipo_veiculo === 'CARRO') {
				if (isCar(vehicle)) { // Verifica se o veículo é um Carro
					if (!vehicle.quantidade_portas) {
						return toast.warn('Informe a quantidade de portas para o carro!');
					}
					if (!vehicle.tipo_combustivel || !Object.values(CombustivelEnum).includes(vehicle.tipo_combustivel)) {
						return toast.warn('Informe o tipo de combustível do carro!');
					}
				} else return toast.warn('O tipo de veículo não corresponde à categoria "Carro"');
			} else if (vehicle.tipo_veiculo === 'MOTO') {
				if (isMoto(vehicle)) { // Verifica se o veículo é uma Moto
					if (!vehicle.cilindrada) {
						return toast.warn('Informe a cilindrada da moto!');
					}
				} else return toast.warn('O tipo de veículo não corresponde à categoria "Moto"');
			} else return toast.warn('Categoria inválida!'); // Caso a categoria não seja "Carro" ou "Moto"


			setVehicles((prevVehicles) => [...prevVehicles, vehicle]); // Adiciona o veículo na lista de Veículos(tabela)
			console.log('Enviando Veiculo:', vehicle)
		} else return toast.warn('Preencha todos os campos!');

		setLoading(true);
		try {
			console.log(vehicle);
			// Criação do objeto com os campos principais
			const vehicleData: (CarProps & MotoProps) = {
				modelo: vehicle.modelo,
				fabricante: vehicle.fabricante,
				preco: vehicle.preco,
				ano: vehicle.ano,
				tipo_veiculo: vehicle.tipo_veiculo,
				quantidade_portas: null,
				tipo_combustivel: null,
				cilindrada: null
			};

			// Condicional para adicionar campos específicos para Carro ou Moto
			if (isCar(vehicle)) {
				vehicleData.quantidade_portas = vehicle.quantidade_portas;
				vehicleData.tipo_combustivel = vehicle.tipo_combustivel;
			}

			if (isMoto(vehicle)) vehicleData.cilindrada = vehicle.cilindrada;

			// Envio para a API
			const { data } = await api.post('/veiculos', vehicleData);

			toast.success(data.message);
			setVehicle(initialVehicle) // Limpar o formulário
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	return (
		<Dialog.Root onOpenChange={() => { setVehicle(initialVehicle) }}>
			<Dialog.Trigger asChild>
				<button className="rounded bg-blue-300 text-black p-4 font-medium leading-none shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none m-auto block hover:bg-blue-400 transition-colors">
					Cadastrar Veículo
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow bg-lime-300/40" />
				<Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow z-[2]">
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
										setVehicleDataRegister={setVehicle}
										vehicleDataRegister={vehicle}
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
									setVehicleDataRegister={setVehicle}
									vehicleDataRegister={vehicle}
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
												placeholder={field.placeholder}
												setVehicleDataRegister={setVehicle}
												vehicleDataRegister={vehicle}
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
												setVehicleDataRegister={setVehicle}
												vehicleDataRegister={vehicle}
											/>
										</div>
									))}
							</div>
						)}


						{/* Botão de submissão */}
						<div className="flex justify-end mt-4">
							<button
								disabled={loading}
								type="submit"
								className="bg-purple-600 text-sm disabled:opacity-50 p-2 rounded-lg text-white"
							>
								{loading ? 'Adicionando...' : 'Adicionar'}
							</button>
						</div>
					</form>

					<Dialog.Close asChild>
						<button
							className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
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
