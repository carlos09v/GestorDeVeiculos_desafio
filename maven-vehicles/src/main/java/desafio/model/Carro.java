package desafio.model;

import java.util.UUID;

public class Carro {
     private UUID id;
     private UUID veiculoId;   // Chave estrangeira referenciando a tabela 'veiculos'
     private int quantidade_portas;
     private TipoCombustivel tipo_combustivel;

     public Carro(UUID id, UUID veiculoId, int quantidade_portas, TipoCombustivel tipo_combustivel) {
          this.id = id;
          this.veiculoId = veiculoId;
          this.quantidade_portas = quantidade_portas;
          this.tipo_combustivel = tipo_combustivel;
     }

     // Getters e Setters
     public UUID getId() {
          return id;
     }
     public void setId(UUID id) {
          this.id = id;
     }
     public UUID getVeiculoId() {
          return veiculoId;
     }
     public void setVeiculoId(UUID veiculoId) {
          this.veiculoId = veiculoId;
     }
     public int getQuantidade_portas() {
          return quantidade_portas;
     }
     public void setQuantidade_portas(int quantidade_portas) {
          this.quantidade_portas = quantidade_portas;
     }
     public TipoCombustivel getTipo_combustivel() {
          return tipo_combustivel;
     }
     public void setTipo_combustivel(TipoCombustivel tipo_combustivel) {
          this.tipo_combustivel = tipo_combustivel;
     }
}
