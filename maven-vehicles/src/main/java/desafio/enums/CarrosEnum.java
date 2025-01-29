package desafio.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public class CarrosEnum {
    public enum QuantidadePortasEnum {
        DUAS("2"),
        TRES("3"),
        QUATRO("4"),
        CINCO("5"),
        SEIS("6");

        private final String valor;

        QuantidadePortasEnum(String valor) {
            this.valor = valor;
        }

        @JsonValue
        public String getValor() {
            return valor;
        }

        @JsonCreator
        public static QuantidadePortasEnum fromValor(String valor) {
            for (QuantidadePortasEnum portas : QuantidadePortasEnum.values()) {
                if (portas.valor.equals(valor)) {
                    return portas;
                }
            }
            throw new IllegalArgumentException("Nenhum enum constante encontrado para o valor: " + valor);
        }
    }

    public enum TipoCombustivelEnum {
        GASOLINA,
        ETANOL,
        DIESEL,
        FLEX;

        // Converte uma String do banco de dados para o enum correspondente
        public static TipoCombustivelEnum fromValor(String valor) {
            try {
                return TipoCombustivelEnum.valueOf(valor.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Valor inválido para TipoCombustivel: " + valor);
            }
        }
    }
}
