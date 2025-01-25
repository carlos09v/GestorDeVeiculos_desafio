import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { VehicleContext } from "../../Context/VehicleContext";
import { FormField } from "../FormField";
import clsx from "clsx";

const CadastrarVeiculoModalButton = () => {
	const [loading, setLoading] = useState(false);
	const { vehicle, setVehicle, setVehicles, setCarro, setMoto } = useContext(VehicleContext);
	const [categoria, setCategoria] = useState<'Carro' | 'Moto' | null>(null);

	// Define os campos do formulário com base na categoria
	const formFields = [
		{ type: 1, label: "Modelo:", placeholder: "Ex: Gol" },
		{ type: 2, label: "Fabricante:", placeholder: " Ex: Volkswagen" },
		{ type: 3, label: "Ano:", placeholder: "Ex: 2020" },
		{ type: 4, label: "Preço:", placeholder: "Ex: 20000" },
		{ type: 5, label: "Categoria:", placeholder: "" },
	];

	// Adiciona campos específicos para Carro
	const carroFields = [
		{ type: 6, label: "Quantidade de Portas:", placeholder: "Ex: 4" },
		{ type: 7, label: "Combustível:", placeholder: "" },
	];

	// Adiciona campos específicos para Moto
	const motoFields = [
		{ type: 6, label: "Cilindrada:", placeholder: "Ex: 150" },
	];

	// Cadastrar Veículo
	const handleVehicleRegister = async (e: FormEvent) => {
		e.preventDefault();

		const anoAtual = new Date().getFullYear(); // Pega o ano atual

		// Validações
		if (vehicle.modelo && vehicle.fabricante && vehicle.ano && vehicle.preco) {
			if (vehicle.ano < 1900 || vehicle.ano > anoAtual) return toast.warn(`Insira um ano válido [1900-${anoAtual}]`);
			if (!Number(vehicle.preco)) return toast.warn(`Insira um preço válido!`);

			setVehicles((prevVehicles) => [...prevVehicles, vehicle]); // Adiciona o veículo na lista de Veículos(tabela)
			setVehicle({ modelo: '', fabricante: '', ano: 1900, preco: '' }); // Limpar o formulário
		} else return toast.warn('Preencha todos os campos!');

		setLoading(true);
		try {
			console.log(vehicle);
			const { data } = await api.post('/create-vehicle', {
				modelName: vehicle.modelo,
				makerName: vehicle.fabricante,
				price: parseFloat(vehicle.preco),
				year: vehicle.ano
			});

			toast.success(data.message);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	return (
		<Dialog.Root>
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
						<div className="grid grid-cols-2 gap-4 font-bold">
							{/* Mapeando os campos gerais */}
							{formFields.filter((_, index) => index !== 5).map((field, index) => (
								<div key={field.type} className={clsx(`flex justify-around`)}>
									<FormField
										typeNumber={field.type}
										label={field.label}
										placeholder={field.placeholder}
										setVehicleDataRegister={setVehicle}
										vehicleDataRegister={vehicle}
									/>
								</div>
							))}

							{/* Campo Categoria - ocupa a largura total */}
							{categoria && (
								<div className="col-span-2">
									<FormField
										typeNumber={5}
										setCategoria={setCategoria}
										vehicleDataRegister={vehicle}
										setVehicleDataRegister={setVehicle}
									/>
								</div>
							)}

							{/* Campos específicos de acordo com a categoria */}
							{categoria === 'Carro'
								? carroFields.map(field => (
									<div key={field.type} className="col-span-2">
										<FormField
											typeNumber={field.type}
											label={field.label}
											placeholder={field.placeholder}
											setCarro={setCarro}
											vehicleDataRegister={vehicle}
											setVehicleDataRegister={setVehicle}
										/>
									</div>
								))
								: categoria === 'Moto'
									? motoFields.map(field => (
										<div key={field.type} className="col-span-2">
											<FormField
												typeNumber={field.type}
												label={field.label}
												placeholder={field.placeholder}
												setMoto={setMoto}
												vehicleDataRegister={vehicle}
												setVehicleDataRegister={setVehicle}
											/>
										</div>
									))
									: null}
						</div>

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
