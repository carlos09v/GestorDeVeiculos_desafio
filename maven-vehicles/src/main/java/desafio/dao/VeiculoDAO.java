package desafio.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import desafio.enums.CarrosEnum.QuantidadePortasEnum;
import desafio.enums.CarrosEnum.TipoCombustivelEnum;
import desafio.model.Carro;
import desafio.model.Moto;
import desafio.model.Veiculo;

// Responsável pela Lógica com o DB
@Repository
public class VeiculoDAO implements IVeiculoDAO {
    // abstrai o código de manipulação de exceções, fechamento de conexões e outras
    // operações repetitivas, tornando o código mais limpo e fácil de manter.
    private final JdbcTemplate jdbcTemplate;

    // Construtor com injeção de dependência
    public VeiculoDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Cadastrar
    @Override
    public Veiculo insert(Veiculo veiculo) {
        // Pra evitar SQLInjection
        String sql = "INSERT INTO veiculos (modelo, fabricante, preco, ano, tipo_veiculo) VALUES (?, ?, ?, ?, ?) RETURNING id ";

        // Usando o JdbcTemplate para executar a query
        Object[] params = getInsertParameters(veiculo);

        System.out.println("Parâmetros da query: " + Arrays.toString(params));

        UUID veiculoId = jdbcTemplate.queryForObject(sql, params, UUID.class);
        veiculo.setId(veiculoId);

        if (veiculo instanceof Carro) {
            Carro carro = (Carro) veiculo;
            String sqlCarro = carro.getInsertSQL();

            System.out.println("Parâmetros da query CARRO: " + Arrays.toString(carro.getInsertParameters()));

            jdbcTemplate.update(sqlCarro, carro.getInsertParameters());
            System.out.println("Carro inserido: " + carro);
        } else if (veiculo instanceof Moto) {
            Moto moto = (Moto) veiculo;
            String sqlMoto = moto.getInsertSQL();
            jdbcTemplate.update(sqlMoto, moto.getInsertParameters());
            System.out.println("Moto inserida: " + moto);
        }

        System.out.println("Veículo inserido com sucesso!");

        return veiculo;
    }

    // Atualizar Veiculo
    @Override
    public void update(Veiculo veiculo) {
        // Montar o SQL dinamicamente
        StringBuilder sql = new StringBuilder("UPDATE veiculos SET ");
        List<Object> params = new ArrayList<>();

        // Adicionar parâmetros com base nos campos não nulos ou não zero
        if (veiculo.getModelo() != null) {
            sql.append("modelo = ?, ");
            params.add(veiculo.getModelo());
        }
        if (veiculo.getFabricante() != null) {
            sql.append("fabricante = ?, ");
            params.add(veiculo.getFabricante());
        }
        if (veiculo.getPreco() > 0) {
            sql.append("preco = ?, ");
            params.add(veiculo.getPreco());
        }
        if (veiculo.getAno() != 0) {
            sql.append("ano = ?, ");
            params.add(veiculo.getAno());
        }
        if (veiculo.getTipoVeiculo() != null) {
            sql.append("tipo_veiculo = ?, ");
            params.add(veiculo.getTipoVeiculo());
        }

        // Remover a última vírgula e espaço
        sql.delete(sql.length() - 2, sql.length());

        // Adicionar a cláusula WHERE
        sql.append(" WHERE id = ?");
        params.add(veiculo.getId());

        System.out.println("Parâmetros da query: " + Arrays.toString(params.toArray()));

        // Atualizar no banco de dados
        jdbcTemplate.update(sql.toString(), params.toArray());

        // Verifica se o veículo é um Carro e atualiza os parâmetros específicos
        if (veiculo instanceof Carro) {
            Carro carro = (Carro) veiculo;
            String sqlCarro = "UPDATE carro SET quantidade_portas = ?, tipo_combustivel = ? WHERE veiculo_id = ?";
            jdbcTemplate.update(sqlCarro, carro.getQuantidade_portas(), carro.getTipo_combustivel(), carro.getId());
        } else if (veiculo instanceof Moto) {
            Moto moto = (Moto) veiculo;
            String sqlMoto = "UPDATE moto SET cilindradas = ? WHERE veiculo_id = ?";
            System.out.println("Dados: " + moto);
            jdbcTemplate.update(sqlMoto, moto.getCilindrada(), moto.getId());
        }
    }

    // Apagar Veiculo
    @Override
    public void delete(UUID id) {
        String sql = "DELETE FROM veiculos WHERE id = ?";

        // Utiliza o JdbcTemplate para executar a exclusão
        jdbcTemplate.update(sql, id);
    }

    // Get Veiculos
    @Override
    public List<Veiculo> findAll() {
        // Consulta para veículos (com junção nas tabelas de carros e motos)
        String sql = "SELECT v.*, c.quantidade_portas, c.tipo_combustivel, m.cilindradas " +
                "FROM veiculos v " +
                "LEFT JOIN carro c ON v.id = c.veiculo_id " + // Junção com a tabela carros
                "LEFT JOIN moto m ON v.id = m.veiculo_id"; // Junção com a tabela motos

        // Definindo um RowMapper para mapear o ResultSet para a classe Veiculo
        RowMapper<Veiculo> rowMapper = (rs, rowNum) -> {
            UUID id = UUID.fromString(rs.getString("id"));
            String modelo = rs.getString("modelo");
            String fabricante = rs.getString("fabricante");
            double preco = rs.getDouble("preco");
            int ano = rs.getInt("ano");
            String tipoVeiculo = rs.getString("tipo_veiculo");

            System.out.println("TipoVeiculo lido: " + tipoVeiculo);

            // Lógica para instanciar Carro ou Moto com base no tipo_veiculo
            if ("CARRO".equals(tipoVeiculo)) {
                // Aqui você instancia um Carro, passando os parâmetros corretos
                // Valida se "quantidade_portas" não é nulo antes de mapear
                QuantidadePortasEnum quantidadePortas = null;
                String quantidadePortasString = rs.getString("quantidade_portas");
                if (quantidadePortasString != null && !quantidadePortasString.isBlank()) {
                    quantidadePortas = QuantidadePortasEnum.fromValor(quantidadePortasString);
                }

                TipoCombustivelEnum tipoCombustivel = null;
                String tipoCombustivelString = rs.getString("tipo_combustivel");
                if (tipoCombustivelString != null && !tipoCombustivelString.isBlank()) {
                    tipoCombustivel = TipoCombustivelEnum.valueOf(tipoCombustivelString);
                }
                return new Carro(id, modelo, fabricante, preco, ano, quantidadePortas,
                        tipoCombustivel);
            } else if ("MOTO".equals(tipoVeiculo)) {
                int cilindrada = rs.getInt("cilindradas");
                return new Moto(id, modelo, fabricante, preco, ano, cilindrada);
            }

            // Retorna null ou lança exceção se o tipo de veículo não for encontrado
            throw new IllegalArgumentException("Tipo de veículo desconhecido: " + tipoVeiculo);
        };

        // Utiliza o JdbcTemplate para buscar os veículos
        return jdbcTemplate.query(sql, rowMapper);
    }

    // Get Veiculo by Id
    @Override
    public Optional<Veiculo> findById(UUID id) {
        String sql = "SELECT v.*, c.quantidade_portas, c.tipo_combustivel, m.cilindradas " +
                "FROM veiculos v " +
                "LEFT JOIN carro c ON v.id = c.veiculo_id " + // Junção com a tabela carros
                "LEFT JOIN moto m ON v.id = m.veiculo_id " + // Junção com a tabela motos
                "WHERE v.id = ?"; // Filtra pelo ID fornecido

        // Definindo um RowMapper para mapear o ResultSet para a classe Veiculo
        RowMapper<Veiculo> rowMapper = (rs, rowNum) -> {
            UUID pKey = UUID.fromString(rs.getString("id"));
            String modelo = rs.getString("modelo");
            String fabricante = rs.getString("fabricante");
            double preco = rs.getDouble("preco");
            int ano = rs.getInt("ano");
            String tipoVeiculo = rs.getString("tipo_veiculo"); // Obtendo o tipo de veículo

            // Instancia Carro ou Moto dependendo do tipo de veículo
            if ("CARRO".equals(tipoVeiculo)) {
                QuantidadePortasEnum quantidadePortas = QuantidadePortasEnum
                        .fromValor(rs.getString("quantidade_portas"));
                TipoCombustivelEnum tipoCombustivel = TipoCombustivelEnum.valueOf(rs.getString("tipo_combustivel"));
                return new Carro(pKey, modelo, fabricante, preco, ano, quantidadePortas, tipoCombustivel);
            } else if ("MOTO".equals(tipoVeiculo)) {
                int cilindrada = rs.getInt("cilindradas"); // Exemplo para moto, pode variar conforme sua modelagem
                return new Moto(pKey, modelo, fabricante, preco, ano, cilindrada);
            }

            return null; // Caso o tipo de veículo não seja reconhecido
        };

        // Utiliza o JdbcTemplate para buscar o veículo por ID
        List<Veiculo> veiculos = jdbcTemplate.query(sql, rowMapper, id);

        // Retorna o veículo encontrado, ou Optional.empty() caso não exista
        return veiculos.stream().findFirst();
    }
}
