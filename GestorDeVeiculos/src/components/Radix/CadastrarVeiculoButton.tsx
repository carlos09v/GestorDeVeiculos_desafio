import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { VehicleContext } from "../../Context/VehicleContext";
import { FormField } from "../FormField";
import { CarProps, MotoProps } from "../../@types/web";
import { validateForm } from "../../utils/validateForm";
import { carroFields, formFields, motoFields } from "../../utils/formFields";

const CadastrarVeiculoModalButton = () => {
	const { vehicle, setVehicle, setVehicles, isCar, isMoto, initialVehicle } = useContext(VehicleContext);
	const [modalOpen, setModalOpen] = useState(false);


	// Cadastrar Veículo
	const handleVehicleRegister = async (e: FormEvent) => {
		e.preventDefault();
		if (!validateForm(vehicle, isCar, isMoto)) return // validar

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
