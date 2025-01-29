package desafio.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Consumer;

import org.apache.commons.lang3.EnumUtils;
import org.springframework.stereotype.Service;

import desafio.dao.IVeiculoDAO;
import desafio.enums.CarrosEnum.QuantidadePortasEnum;
import desafio.enums.CarrosEnum.TipoCombustivelEnum;
import desafio.enums.VeiculosEnum.TipoVeiculosEnum;
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
    public Veiculo create(Map<String, Object> veiculoData) {
        String tipoVeiculo = (String) veiculoData.get("tipo_veiculo");
        if (tipoVeiculo == null || tipoVeiculo.isEmpty()) {
            throw new IllegalArgumentException("O campo 'tipo_veiculo' é obrigatório.");
        }

        // Validação do tipo de veículo
        validateTipoVeiculo(tipoVeiculo);

        Veiculo veiculo;
        if ("CARRO".equalsIgnoreCase(tipoVeiculo)) {
            // Mapear para um Carro
            veiculo = mapToCarro(veiculoData);
        } else if ("MOTO".equalsIgnoreCase(tipoVeiculo)) {
            // Mapear para uma Moto
            veiculo = mapToMoto(veiculoData);
        } else {
            throw new IllegalArgumentException("Tipo de veículo inválido: " + tipoVeiculo);
        }
        veiculo.setTipoVeiculo(tipoVeiculo);  // Atribui o tipo do veículo corretamente

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

        // Valida Nulos e Atualiza os campos de forma parcial
        updateFieldIfNotNull(veiculo.getModelo(), veiculoExistente::setModelo);
        updateFieldIfNotNull(veiculo.getFabricante(), veiculoExistente::setFabricante);
        updateFieldIfNotNull(veiculo.getPreco(), veiculoExistente::setPreco);
        updateFieldIfNotNull(veiculo.getAno(), veiculoExistente::setAno);
        updateFieldIfNotNull(veiculo.getTipoVeiculo(), veiculoExistente::setTipoVeiculo);

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

    // Validação do tipo de veículo
    private void validateTipoVeiculo(String tipoVeiculo) {
        try {
            TipoVeiculosEnum.fromValor(tipoVeiculo); // Usando o método do Enum para validação
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Tipo de veículo inválido: " + tipoVeiculo);
        }
    }

     // Método auxiliar para verificar se o campo é não nulo e válido antes de atualizar
     private <T> void updateFieldIfNotNull(T fieldValue, Consumer<T> setter) {
        if (fieldValue != null && !(fieldValue instanceof Integer && (Integer) fieldValue == 0)) {
            setter.accept(fieldValue);
        }
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
        if (veiculo.getAno() < 1886 || veiculo.getAno() > LocalDate.now().getYear()) {
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
                throw new IllegalArgumentException("A Cilindrada da moto não pode ser vazia.");
            }
        }
    }

    // Mapeamento do Tipos de Veiculo
    private Carro mapToCarro(Map<String, Object> data) {
        Carro carro = new Carro();
        carro.setModelo((String) data.get("modelo"));
        carro.setFabricante((String) data.get("fabricante"));
        carro.setPreco((Double) data.get("preco"));
        carro.setAno((Integer) data.get("ano"));
        carro.setQuantidade_portas((String) data.get("quantidade_portas"));
        carro.setTipo_combustivel((String) data.get("tipo_combustivel"));
        return carro;
    }
    
    private Moto mapToMoto(Map<String, Object> data) {
        Moto moto = new Moto();
        moto.setModelo((String) data.get("modelo"));
        moto.setFabricante((String) data.get("fabricante"));
        moto.setPreco((Double) data.get("preco"));
        moto.setAno((Integer) data.get("ano"));
        moto.setCilindrada((Integer) data.get("cilindradas"));
        return moto;
    }
}
