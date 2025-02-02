export const selectFields: Record<string, { name: string; options: { value: string; label: string }[] }> = {
    quantidade_portas: {
        name: "quantidade_portas",
        options: [
            { value: "", label: "Selecione" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
            { value: "6", label: "6" },
        ],
    },
    tipo_combustivel: {
        name: "tipo_combustivel",
        options: [
            { value: "", label: "--- ⛽ ---" },
            { value: "GASOLINA", label: "Gasolina" },
            { value: "ETANOL", label: "Etanol" },
            { value: "DIESEL", label: "Diesel" },
            { value: "FLEX", label: "Flex" },
        ],
    },
};
