package desafio.enums;

public class VeiculosEnum {

    public enum TipoVeiculosEnum {
        CARRO,
        MOTO;

     
        public static TipoVeiculosEnum fromValor(String value) {
            try {
                return TipoVeiculosEnum.valueOf(value.toUpperCase());
            } catch (IllegalArgumentException | NullPointerException e) {
                throw new IllegalArgumentException("Tipo de veículo inválido: " + value);
            }
        }
    }
}
