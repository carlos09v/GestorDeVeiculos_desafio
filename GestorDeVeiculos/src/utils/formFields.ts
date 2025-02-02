// src/data/formFields.ts

export const formFields = [
    { id: 'modelo', type: 1, label: "Modelo:", placeholder: "Ex: Gol" },
    { id: 'fabricante', type: 2, label: "Fabricante:", placeholder: " Ex: Volkswagen" },
    { id: 'ano', type: 3, label: "Ano:", placeholder: "Ex: 2020" },
    { id: 'preco', type: 4, label: "Preço R$:", placeholder: "Ex: 2000.00" },
];

// Campos específicos para Carro
export const carroFields = [
    { id: 'quantidade_portas', type: 6, label: "Quantidade de Portas:" },
    { id: 'tipo_combustivel', type: 7, label: "Combustível:" },
];

// Campos específicos para Moto
export const motoFields = [
    { id: 'cilindrada', type: 8, label: "Cilindrada:", placeholder: "Ex: 150" },
];


