import { useContext, useEffect } from "react";
import { CarProps, MotoProps, VehicleProps } from "../@types/web";
import { VehicleContext } from "../Context/VehicleContext";
import { handleChange } from "../utils/handleChange";
import { carroFields, formFields, motoFields } from "../utils/formFields";
import { fieldMapVehicle } from "./FormField";
import { formatValue } from "../utils/formatValue";
import { selectFields } from "../utils/selectFields";


export const Filter = ({ setCurrentPage }: { vehicles: (CarProps & MotoProps)[]; setFilteredVehicles: React.Dispatch<React.SetStateAction<(CarProps & MotoProps)[]>>; setCurrentPage: React.Dispatch<React.SetStateAction<number>> }) => {
    const { filters, setFilters } = useContext(VehicleContext)

    // Filtra os veículos com base nos filtros selecionados
    useEffect(() => {
        setCurrentPage(1); // Resetando a página
    }, [filters, setCurrentPage]);

    
    return (
        <div className="w-full flex gap-2 items-center font-medium">
            {/* Select para Categoria */}
            <fieldset>
                <label htmlFor="categoryOptions">Categoria:</label>
                <select className="editFieldInput" name="categoryOptions" onChange={(e) => handleChange(e, setFilters, fieldMapVehicle)} >
                    <option className='text-center' value=''>Todos</option>
                    <option value="CARRO">🚙 Carro</option>
                    <option value="MOTO">🛵 Moto</option>
                </select>
            </fieldset>

            {formFields.filter(({ type }) => type !== 4).map(({ id, label, placeholder, type }) => (
                <fieldset key={id}>
                    <label htmlFor={id}>{label}</label>
                    <input
                        className="editFieldInput"
                        name={id}
                        type={type === 3 || type === 8 ? "number" : "text"}
                        min={type === 3 ? 1886 : 0} // Para o ano
                        max={type === 3 ? new Date().getFullYear() : undefined} // Para o ano
                        value={formatValue(id, filters?.[id as keyof VehicleProps])}
                        placeholder={placeholder}
                        onChange={(e) => handleChange(e, setFilters)}
                    />
                </fieldset>
            ))}

            {filters.tipo_veiculo === "CARRO" && carroFields.map(({ type, label }) => {
                const field = fieldMapVehicle[type]; // Obtém o campo com base no type
                const fieldSelect = selectFields[field]; // Obtém o selectField correspondente ao campo

                return field && fieldSelect ? (
                    <fieldset key={type}>
                        <label htmlFor={field}>{label}</label>
                        <select
                            className="editFieldInput"
                            name={field}
                            value={formatValue(field, filters?.[field as keyof VehicleProps])} // Usa formatValue aqui
                            onChange={(e) => handleChange(e, setFilters)}
                        >
                            {fieldSelect.options.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                ) : null;
            })}

            {/* 🔹 Renderiza campos específicos se for uma MOTO */}
            {
                filters.tipo_veiculo === "MOTO" && motoFields.map(({ type, label, placeholder }) => {
                    const field = fieldMapVehicle[type]; // 🔹 Usando fieldMapVehicle para moto
                    return (
                        <fieldset key={type} className="">
                            <label className="editFieldLabel" htmlFor={field}>{label}</label>
                            <input
                                className="editFieldInput"
                                name={field}
                                type="number"
                                value={formatValue(field, filters[field])}
                                placeholder={placeholder}
                                onChange={(e) => handleChange(e, setFilters)}
                            />
                        </fieldset>
                    );
                })
            }

        </div>
    )
}
