package desafio.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import org.apache.commons.lang3.EnumUtils;
import org.springframework.stereotype.Service;

import desafio.dao.IVeiculoDAO;
import desafio.enums.CarrosEnum.QuantidadePortasEnum;
import desafio.enums.CarrosEnum.TipoCombustivelEnum;
import desafio.model.Carro;
import desafio.model.Moto;
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

        validateVeiculo(veiculoExistente);

        // Atualiza os campos de forma parcial
        if (veiculo.getModelo() != null) {
            veiculoExistente.setModelo(veiculo.getModelo());
        }
        if (veiculo.getFabricante() != null) {
            veiculoExistente.setFabricante(veiculo.getFabricante());
        }
        if (veiculo.getPreco() > 0) {
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

        // Validações específicas para Carro
        if (veiculo instanceof Carro) {
            Carro carro = (Carro) veiculo;

            // Validação da quantidade de portas com base no enum
            if (carro.getQuantidade_portas() == null
                    || !EnumUtils.isValidEnum(QuantidadePortasEnum.class, carro.getQuantidade_portas().name())) {
                throw new IllegalArgumentException("A quantidade de portas do carro deve ser um valor válido.");
            }

            // Validação do tipo de combustível com base no enum
            if (carro.getTipo_combustivel() == null
                    || !EnumUtils.isValidEnum(TipoCombustivelEnum.class, carro.getTipo_combustivel().name())) {
                throw new IllegalArgumentException("O tipo de combustível do carro deve ser um valor válido.");
            }
        }

        // Validações específicas para Moto
        if (veiculo instanceof Moto) {
            Moto moto = (Moto) veiculo;

            // Validação da categoria da moto
            if (moto.getCilindrada() <= 0) {
                throw new IllegalArgumentException("A categoria da moto não pode ser vazia.");
            }
        }
    }
}
