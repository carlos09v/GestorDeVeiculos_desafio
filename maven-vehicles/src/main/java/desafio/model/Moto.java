package desafio.model;

import java.util.UUID;

public class Moto {
    private UUID id;
    private int cilindrada;
    private UUID veiculoId;   // Chave estrangeira referenciando a tabela 'veiculos'

    // Getters e Setters
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public int getCilindrada() {
        return cilindrada;
    }
    public void setCilindrada(int cilindrada) {
        this.cilindrada = cilindrada;
    }
    public UUID getVeiculoId() {
        return veiculoId;
    }
    public void setVeiculoId(UUID veiculoId) {
        this.veiculoId = veiculoId;
    }
}
