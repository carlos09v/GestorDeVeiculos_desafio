package desafio.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;


import org.springframework.stereotype.Service;

import desafio.dao.IVeiculoDAO;
import desafio.model.Veiculo;

// Reponsável pelas validações
@Service
public class VeiculoService {
    private final IVeiculoDAO veiculoDAO;

    // Injeção de dependência
    public VeiculoService(IVeiculoDAO veiculoDAO) {
        this.veiculoDAO = veiculoDAO;
    }

    // ----- CRUD
    // Cadastro de veículo
    public Veiculo create(Veiculo veiculo) {
        validateVeiculo(veiculo); // Chama validações
        return veiculoDAO.insert(veiculo); // Chama o DAO para salvar
    }

    // Buscar veículo por ID
    public Veiculo findById(String id) {
        UUID uuid = validateUUID(id);
        Veiculo veiculo = validateVeiculoExists(uuid);

        return veiculo;
    }

    // Atualizar veículo em PACTH
    public Veiculo updatePartial(String id, Veiculo veiculo) {
        UUID uuid = validateUUID(id);
        // Valida se o veículo existe antes de atualizar
        Veiculo veiculoExistente = validateVeiculoExists(uuid);

        // Atualiza os campos de forma parcial
        if (veiculo.getModelo() != null) {
            veiculoExistente.setModelo(veiculo.getModelo());
        }
        if (veiculo.getFabricante() != null) {
            veiculoExistente.setFabricante(veiculo.getFabricante());
        }
        if (veiculo.getPreco() != 0.0) {
            veiculoExistente.setPreco(veiculo.getPreco());
        }
        if (veiculo.getAno() != 0) {
            veiculoExistente.setAno(veiculo.getAno());
        }

        // Salva e retorna o veículo atualizado
        veiculoDAO.update(veiculoExistente);
        return veiculoExistente;
    }

    // Deletar veículo por ID
    public void delete(String id) {
        UUID uuid = validateUUID(id);

        validateVeiculoExists(uuid); // Verifica se o ID existe
        
        veiculoDAO.delete(uuid); // Deleta o veículo
    }

    // Buscar todos os veículos
    public List<Veiculo> findAll() {
        return veiculoDAO.findAll();
    }

    
    // Métodos Auxiliares (Validações)
    // verificar se o veículo existe e retorna Veiculo
    private Veiculo validateVeiculoExists(UUID id) {
        Optional<Veiculo> veiculoOptional = veiculoDAO.findById(id); // Procura ID
        if (veiculoOptional.isEmpty()) {
            throw new NoSuchElementException("Veículo com o ID " + id + " não encontrado!");
        }
        // Retorna o veículo caso ele exista
        return veiculoOptional.get();
    }

    // Validar UUID recebido
    private UUID validateUUID(String id) {
        try {
            return UUID.fromString(id); // Converte e valida o formato
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("O ID fornecido não é um UUID válido: " + id);
        }
    }

    // Validações de negócio
    private void validateVeiculo(Veiculo veiculo) {
        if (veiculo.getModelo() == null || veiculo.getModelo().isEmpty()) {
            throw new IllegalArgumentException("O modelo do veículo não pode ser vazio.");
        }
        if (veiculo.getFabricante() == null || veiculo.getFabricante().isEmpty()) {
            throw new IllegalArgumentException("O fabricante do veículo não pode ser vazio.");
        }
        if (veiculo.getAno() < 1886 || veiculo.getAno() > 2100) {
            throw new IllegalArgumentException("O ano do veículo é inválido.");
        }
        if (veiculo.getPreco() <= 0) {
            throw new IllegalArgumentException("O preço do veículo deve ser maior que zero.");
        }
    }
}
