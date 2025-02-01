package desafio.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public class Moto extends Veiculo {
    private int cilindrada;

    public Moto(UUID id, String modelo, String fabricante, BigDecimal preco, int ano,
            int cilindrada,  LocalDateTime createdAt) {
        super(id, "MOTO", modelo, fabricante, ano, preco, createdAt); // 'id' é o 'veiculo_id'
        this.cilindrada = cilindrada;
    }

    public Moto() {};


     @Override
     public String getInsertSQL() {
          return "INSERT INTO moto (veiculo_id, cilindrada) VALUES (?, ?)";
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
        System.out.println("Setando cilindrada: " + cilindrada);
        this.cilindrada = cilindrada;
    }
}
