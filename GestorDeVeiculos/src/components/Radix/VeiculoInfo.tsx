import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { CarProps, MotoProps, VehicleContextProps, VehicleProps } from "../../@types/web";
import { selectFields } from "../../utils/selectFields";
import { formatValue } from "../../utils/formatValue";
import { useContext, useState } from "react";
import { validateForm } from "../../utils/validateForm";
import { VehicleContext } from "../../Context/VehicleContext";
import { handleChange } from "../../utils/handleChange";
import { api } from "../../services/api";
import { toast } from "react-toastify";


export const VeiculoInfo = ({ vehicle, setVehicles }: Partial<VehicleContextProps>) => {
    const { isCar, isMoto } = useContext(VehicleContext)
    const [modalOpen, setModalOpen] = useState(false);
    if (!vehicle) return null; // Evita erro se `vehicle` for undefined
    const [tempVehicle, setTempVehicle] = useState<CarProps & MotoProps>(vehicle)

    // 🔹 Lista de campos comuns para todos os veículos
    const vehicleFields = [
        { id: "modelo", label: "Modelo:", type: "text", disabled: false },
        { id: "fabricante", label: "Fabricante:", type: "text", disabled: false },
        { id: "preco", label: "Preço:", type: "number", disabled: false },
        { id: "ano", label: "Ano:", type: "number", disabled: false },
        { id: "tipo_veiculo", label: "Categoria:", type: "text", disabled: true }, // 🔹 Categoria não pode ser editada
    ];

    // 🔹 Lista de campos específicos de acordo com o tipo_veiculo
    const additionalFields =
        vehicle.tipo_veiculo === "CARRO"
            ? [
                { id: "quantidade_portas", label: "Quantidade de Portas:", type: "number" },
                { id: "tipo_combustivel", label: "Tipo de Combustível:", type: "text" },
            ]
            : vehicle.tipo_veiculo === "MOTO"
                ? [{ id: "cilindrada", label: "Cilindrada:", type: "number" }]
                : [];


    const updateVehicle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm(tempVehicle, isCar, isMoto)) return
        console.log('Temp Vehicle: ' + tempVehicle)

        try {
            // Envio para a API
            const { data } = await api.patch(`/veiculos/${tempVehicle.id}`, tempVehicle);

            if (setVehicles) {
                setVehicles((prevVehicles) => {
                    // Atualiza o veículo com o mesmo id
                    return prevVehicles.map(vehicle =>
                        vehicle.id === tempVehicle.id ? data.veiculoAtualizado : vehicle
                    );
                });
            }
            toast.success(data.message);
            // Fecha o modal
            setModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
            <Dialog.Trigger asChild>
                <td className="absolute left-2 top-1/2 -translate-y-1/2 rounded p-2 bg-blue-400 cursor-pointer hover:scale-105 duration-300 group">
                    <MagnifyingGlassIcon className="text-lg duration-300" />
                </td>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-lime-500/50 dialog-overlay" />
                <Dialog.Content className="max-w-[400px] dialog-content shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px, _hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] ">
                    <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
                        Editar Veiculo
                    </Dialog.Title>
                    <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
                        Visualize seu veiculo e faça mudanças! <br />
                        <p className="text-sm">ID:  <span className="text-blue-500">{tempVehicle.id}</span></p>
                    </Dialog.Description>
                    <form onSubmit={updateVehicle} className="flex flex-col">
                        {/* 🔹 Mapeia os campos comuns */}
                        {vehicleFields.map(({ id, label, type, disabled }) => (
                            <fieldset key={id} className={`editFieldset ${id === "ano" || id === 'preco' ? "w-2/3" : "w-full"}`}>
                                <label className="editFieldLabel" htmlFor={id}>{label}</label>
                                <input
                                    className={`editFieldInput ${disabled ? "bg-gray-300 cursor-not-allowed" : ""}`}
                                    name={id}
                                    id={id}
                                    type={type}
                                    min={id === 'ano' ? 1886 : 0}
                                    max={id === 'ano' ? new Date().getFullYear() : undefined}
                                    step={id === 'preco' ? 0.01 : undefined}
                                    maxLength={id === 'modelo' || id === 'fabricante' ? 20 : undefined}
                                    defaultValue={formatValue(id, vehicle?.[id as keyof VehicleProps])}
                                    readOnly={disabled} // 🔹 Impede digitação, mas mantém foco acessível
                                    onChange={(e) => handleChange(e, setTempVehicle)}
                                />
                            </fieldset>
                        ))}

                        {/* 🔹 Mapeia os campos específicos (Carro/Moto) */}
                        {additionalFields.map(({ id, label, type }) => (
                            <fieldset key={id} className={`editFieldset ${id === "quantidade_portas" ? "w-1/2" : "w-full"}`}>
                                <label className="editFieldLabel" htmlFor={id}>{label}</label>
                                {/* 🔹 Renderiza um `<select>` se o campo estiver em `selectFields`, senão usa `<input>` */}
                                {selectFields[id] ? (
                                    <select
                                        onChange={(e) => handleChange(e, setTempVehicle)}
                                        className="p-2 border-2 border-black rounded"
                                        name={id}
                                        defaultValue={formatValue(id, vehicle?.[id as keyof VehicleProps])}
                                    >
                                        {selectFields[id].options.map(({ value, label }) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        onChange={(e) => handleChange(e, setTempVehicle)}
                                        className="editFieldInput"
                                        id={id}
                                        name={id}
                                        type={type}
                                        defaultValue={formatValue(id, vehicle?.[id as keyof VehicleProps])}
                                    />
                                )}
                            </fieldset>
                        ))}


                        <div className="mt-[25px] flex justify-end">
                            <button className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 outline-none outline-offset-1 hover:bg-green5 focus-visible:outline-2 focus-visible:outline-green6 select-none" type="submit">
                                Atualizar
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
        </Dialog.Root>
    )
}
