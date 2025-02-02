// src/utils/formatValue.ts
export const formatValue = (_: string, value: any) => {
    if (value instanceof Date) {
        return value.toISOString().split("T")[0]; // 🔹 Converte Date para YYYY-MM-DD
    }
    return value ?? ""; // Se value for undefined ou null, retorna uma string vazia
};