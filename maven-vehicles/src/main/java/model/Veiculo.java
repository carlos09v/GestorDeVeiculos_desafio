package model;

import java.util.UUID;

public class Veiculo {
    private UUID id;
    private String modelo;
    private String fabricante;
    private int ano;
    private double preco;

    public Veiculo(UUID id, String modelo, String fabricante, int ano, double preco) {
        this.id = id;
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.ano = ano;
        this.preco = preco;
    }

    public Veiculo() {}

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
}
