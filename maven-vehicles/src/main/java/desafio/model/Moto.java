package desafio.model;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonTypeName;

import desafio.enums.VeiculosEnum.TipoVeiculosEnum;



public class Moto extends Veiculo {
    private int cilindrada;

    public Moto(UUID id, String modelo, String fabricante, double preco, int ano,
            int cilindrada) {
        super(id, modelo, fabricante, ano, preco, TipoVeiculosEnum.MOTO); // 'id' é o 'veiculo_id'
        this.cilindrada = cilindrada;
    }

    public Moto() {};

    // Métodos abstratos que as subclasses precisam implementar
     // Implementação do método abstrato getInsertSQL
     @Override
     public String getInsertSQL() {
          return "INSERT INTO moto (veiculo_id, quantidade_portas, tipo_combustivel) VALUES (?, ?, ?)";
     }

     // Implementação do método abstrato getInsertParameters
     @Override
     public Object[] getInsertParameters() {
          return new Object[] {
                    getId(),
                    cilindrada
          };
     }

    // Getters e Setters
    public int getCilindrada() {
        return cilindrada;
    }

    public void setCilindrada(int cilindrada) {
        this.cilindrada = cilindrada;
    }
}
