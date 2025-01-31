package desafio.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import desafio.model.Veiculo;

public interface IVeiculoDAO {
    Veiculo insert(Veiculo veiculo);

    void update(Veiculo veiculo);

    void delete(UUID id);

    List<Veiculo> findAll();

    Optional<Veiculo> findById(UUID id); // Optional - pode não encontrar nada

    // Implementação default
    public default Object[] getInsertParameters(Veiculo veiculo) {
        // if (veiculo.getTipoVeiculo() == null) {
        //     throw new IllegalArgumentException("O tipo do veículo não pode ser nulo.");
        // }

        return new Object[] {
            veiculo.getModelo(),
            veiculo.getFabricante(),
            veiculo.getPreco(),
            veiculo.getAno(),
            veiculo.getTipoVeiculo()
        };
    }
}
