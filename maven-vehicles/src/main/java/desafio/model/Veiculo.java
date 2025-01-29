package desafio.model;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import desafio.enums.VeiculosEnum.TipoVeiculosEnum;


public class Veiculo {
    private UUID id;
    private String modelo;
    private String fabricante;
    private int ano;
    private double preco;
    @JsonProperty("tipo_veiculo")
    private String tipoVeiculo;

    public Veiculo(
            UUID id,
            String modelo,
            String fabricante,
            int ano,
            double preco,
            String tipo_veiculo) {
        this.id = id;
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.ano = ano;
        this.preco = preco;
        this.tipoVeiculo = tipo_veiculo;
    }

    public Veiculo() {}

    @Override
    public String toString() {
        return "Veiculo{" +
                "id=" + id +
                ", modelo='" + modelo + '\'' +
                ", fabricante='" + fabricante + '\'' +
                ", preco=" + preco +
                ", ano=" + ano +
                ", tipoVeiculo='" + tipoVeiculo + '\'' +
                '}';
    }
    
    @JsonIgnore
    public String getInsertSQL() {
        return "INSERT INTO veiculos (modelo, fabricante, ano, preco, tipo_veiculo) VALUES (?, ?, ?, ?, ?)";
    }
    @JsonIgnore
    public Object[] getInsertParameters() {
        return new Object[] { modelo, fabricante, preco, ano, tipoVeiculo };
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public String getTipoVeiculo() {
        return tipoVeiculo;
    }

    public void setTipoVeiculo(String tipoVeiculo) {
        if (tipoVeiculo == null || tipoVeiculo.isEmpty()) {
            throw new IllegalArgumentException("O tipo de veículo não pode ser nulo.");
        }
        System.out.println("Convertendo tipo de veículo: " + tipoVeiculo);
        this.tipoVeiculo = TipoVeiculosEnum.fromValor(tipoVeiculo).name();
    }
}
