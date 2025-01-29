package desafio.model;

import java.util.UUID;

public class Moto extends Veiculo {
    private int cilindrada;

    public Moto(UUID id, String modelo, String fabricante, double preco, int ano,
            int cilindrada) {
        super(id, modelo, fabricante, ano, preco, "CARRO"); // 'id' é o 'veiculo_id'
        this.cilindrada = cilindrada;
    }

    public Moto() {};


     @Override
     public String getInsertSQL() {
          return "INSERT INTO moto (veiculo_id, cilindradas) VALUES (?, ?)";
     }

     @Override
     public Object[] getInsertParameters() {
        if (getId() == null) {
            throw new IllegalArgumentException("O ID não pode ser nulo.");
        }
        
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
