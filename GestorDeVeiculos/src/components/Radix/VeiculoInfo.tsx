import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";


export const VeiculoInfo = () => {
    return (
        <Dialog.Root>
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
                        Visualize seu veiculo e faça mudanças!
                    </Dialog.Description>
                    <form className="flex flex-col">
                    <fieldset className="editFieldset">
                        <label
                            className="editFieldLabel"
                            htmlFor="modelo"
                        >
                            Modelo
                        </label>
                        <input
                            className="editFieldInput"
                            id="modelo"
                            maxLength={20}
                        />
                    </fieldset>
                    <fieldset className="editFieldset">
                        <label
                            className="editFieldLabel"
                            htmlFor="fabricante"
                        >
                            Fabricante
                        </label>
                        <input
                            className="editFieldInput"
                            id="fabricante"
                        />
                    </fieldset>
                    <fieldset className="editFieldset w-2/3">
                        <label
                            className="editFieldLabel"
                            htmlFor="preco"
                        >
                            Preço
                        </label>
                        <input
                            className="editFieldInput"
                            type="number"
                            id="preco"
                        />
                    </fieldset>
                    <fieldset className="editFieldset w-1/2">
                        <label
                            className="editFieldLabel"
                            htmlFor="ano"
                        >
                            Ano
                        </label>
                        <input
                            className="editFieldInput"
                            type="number"
                            id="ano"
                           
                        />
                    </fieldset>


                    <div className="mt-[25px] flex justify-end">
                        <Dialog.Close asChild>
                            <button className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 outline-none outline-offset-1 hover:bg-green5 focus-visible:outline-2 focus-visible:outline-green6 select-none">
                                Atualizar
                            </button>
                        </Dialog.Close>
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
