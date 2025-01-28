package desafio.model;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonTypeName;

import desafio.enums.CarrosEnum.QuantidadePortasEnum;
import desafio.enums.CarrosEnum.TipoCombustivelEnum;
import desafio.enums.VeiculosEnum.TipoVeiculosEnum;


public class Carro extends Veiculo {
     private QuantidadePortasEnum quantidadePortas;
     private TipoCombustivelEnum tipoCombustivel;

     public Carro(UUID id, String modelo, String fabricante, double preco, int ano,
               QuantidadePortasEnum quantidadePortas, TipoCombustivelEnum tipoCombustivel) {
          super(id, modelo, fabricante, ano, preco, TipoVeiculosEnum.CARRO); // 'id' é o 'veiculo_id'
          this.quantidadePortas = quantidadePortas;
          this.tipoCombustivel = tipoCombustivel;
     }

     public Carro() {
     };


     // Métodos abstratos que as subclasses precisam implementar
     // Implementação do método abstrato getInsertSQL
     @Override
     public String getInsertSQL() {
          return "INSERT INTO carro (veiculo_id, quantidade_portas, tipo_combustivel) VALUES (?, ?, ?)";
     }

     // Implementação do método abstrato getInsertParameters
     @Override
     public Object[] getInsertParameters() {
          return new Object[] {
                    getId(),
                    quantidadePortas,
                    tipoCombustivel.name() // Converte o enum para String
          };
     }

     // Getters e Setters
     public QuantidadePortasEnum getQuantidade_portas() {
          return quantidadePortas;
     }

     public void setQuantidade_portas(QuantidadePortasEnum quantidade_portas) {
          this.quantidadePortas = quantidade_portas;
     }

     public TipoCombustivelEnum getTipo_combustivel() {
          return tipoCombustivel;
     }

     public void setTipo_combustivel(TipoCombustivelEnum tipo_combustivel) {
          this.tipoCombustivel = tipo_combustivel;
     }
}
