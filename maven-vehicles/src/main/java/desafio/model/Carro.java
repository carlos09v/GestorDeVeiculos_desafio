package desafio.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import desafio.enums.CarrosEnum.QuantidadePortasEnum;
import desafio.enums.CarrosEnum.TipoCombustivelEnum;

public class Carro extends Veiculo {
     private QuantidadePortasEnum quantidadePortas;
     private TipoCombustivelEnum tipoCombustivel;

     public Carro(UUID id, String modelo, String fabricante, BigDecimal preco, int ano,
               QuantidadePortasEnum quantidadePortas, TipoCombustivelEnum tipoCombustivel,  LocalDateTime createdAt) {
          super(id, "CARRO", modelo, fabricante, ano, preco, createdAt); // 'id' é o 'veiculo_id'
          this.quantidadePortas = quantidadePortas;
          this.tipoCombustivel = tipoCombustivel;
     }

     public Carro() {
     };


     @Override
     public String getInsertSQL() {
          return "INSERT INTO carro (veiculo_id, quantidade_portas, tipo_combustivel) VALUES (?, ?, ?)";
     }

     @Override
     public Object[] getInsertParameters() {
          if (getId() == null) {
               throw new IllegalArgumentException("O ID não pode ser nulo.");
           }
           
          return new Object[] {
                    getId(),
                    quantidadePortas != null ? quantidadePortas.getValor() : null,
                    tipoCombustivel != null ? tipoCombustivel.name() : null // Converte o enum para String
          };
     }

     // Getters e Setters
     public QuantidadePortasEnum getQuantidade_portas() {
          return quantidadePortas;
     }

     public void setQuantidade_portas(String quantidade_portas) {
          this.quantidadePortas = QuantidadePortasEnum.fromValor(quantidade_portas);
     }

     public TipoCombustivelEnum getTipo_combustivel() {
          return tipoCombustivel;
     }

     public void setTipo_combustivel(String tipo_combustivel) {
          this.tipoCombustivel = TipoCombustivelEnum.fromValor(tipo_combustivel);
     }
}
