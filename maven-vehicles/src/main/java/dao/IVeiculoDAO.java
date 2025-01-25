package dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import model.Veiculo;

public interface IVeiculoDAO {
    Veiculo insert(Veiculo veiculo);
    Veiculo update(Veiculo veiculo);
    void delete(UUID id);
    List<Veiculo> findAll();
    Optional<Veiculo> findById(UUID id); // Optional - pode não encontrar nada
}
