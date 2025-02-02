package desafio.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


import desafio.model.Carro;
import desafio.model.Moto;
import desafio.model.Veiculo;
import desafio.services.VeiculoRowMapper;

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

        // System.out.println("Parâmetros da query: " + Arrays.toString(params));

        UUID veiculoId = jdbcTemplate.queryForObject(sql, params, UUID.class);
        veiculo.setId(veiculoId);

        if (veiculo instanceof Carro) {
            Carro carro = (Carro) veiculo;
            String sqlCarro = carro.getInsertSQL();

            // System.out.println("Parâmetros da query CARRO: " +
            // Arrays.toString(carro.getInsertParameters()));

            jdbcTemplate.update(sqlCarro, carro.getInsertParameters());
        } else if (veiculo instanceof Moto) {
            Moto moto = (Moto) veiculo;
            String sqlMoto = moto.getInsertSQL();
            jdbcTemplate.update(sqlMoto, moto.getInsertParameters());
        }

        System.out.println("Veículo inserido com sucesso!");

        return veiculo;
    }

    // Atualizar Veiculo
    @Override
    public void update(Veiculo veiculo) {
        Map<String, Object> vehicleFields = new HashMap<>();
        if (veiculo.getModelo() != null)
            vehicleFields.put("modelo", veiculo.getModelo());
        if (veiculo.getFabricante() != null)
            vehicleFields.put("fabricante", veiculo.getFabricante());
        if (veiculo.getPreco() != null && veiculo.getPreco().compareTo(BigDecimal.ZERO) > 0) {
            vehicleFields.put("preco", veiculo.getPreco());
        }
        if (veiculo.getAno() != 0)
            vehicleFields.put("ano", veiculo.getAno());
        // ⚠️ NÃO ATUALIZA `tipo_veiculo`, pois deve permanecer inalterado

        updateTable("veiculos", vehicleFields, "id = ?", veiculo.getId());

        // Atualiza dados específicos de Carro ou Moto
        if (veiculo instanceof Carro) {
            Carro carro = (Carro) veiculo;
            Map<String, Object> carroFields = new HashMap<>();
            if (carro.getQuantidade_portas() != null) {
                carroFields.put("quantidade_portas", carro.getQuantidade_portas().getValor());
            }
            if (carro.getTipo_combustivel() != null) {
                carroFields.put("tipo_combustivel", carro.getTipo_combustivel().name());
            }
            updateTable("carro", carroFields, "veiculo_id = ?", carro.getId());
        } else if (veiculo instanceof Moto) {
            Moto moto = (Moto) veiculo;
            Map<String, Object> motoFields = new HashMap<>();
            if (moto.getCilindrada() != 0) {
                motoFields.put("cilindrada", moto.getCilindrada());
            }
            updateTable("moto", motoFields, "veiculo_id = ?", moto.getId());
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
        String sql = "SELECT v.*, c.quantidade_portas, c.tipo_combustivel, m.cilindrada " +
                "FROM veiculos v " +
                "LEFT JOIN carro c ON v.id = c.veiculo_id " + // Junção com a tabela carros
                "LEFT JOIN moto m ON v.id = m.veiculo_id"; // Junção com a tabela motos

        // Utiliza o JdbcTemplate para buscar os veículos
        return jdbcTemplate.query(sql, new VeiculoRowMapper());
    }

    // Get Veiculo by Id
    @Override
    public Optional<Veiculo> findById(UUID id) {
        String sql = "SELECT v.*, c.quantidade_portas, c.tipo_combustivel, m.cilindrada " +
                "FROM veiculos v " +
                "LEFT JOIN carro c ON v.id = c.veiculo_id " + // Junção com a tabela carros
                "LEFT JOIN moto m ON v.id = m.veiculo_id " + // Junção com a tabela motos
                "WHERE v.id = ?"; // Filtra pelo ID fornecido

        // Utiliza o JdbcTemplate para buscar o veículo por ID
        List<Veiculo> veiculos = jdbcTemplate.query(sql, new VeiculoRowMapper(), id);

        // Retorna o veículo encontrado, ou Optional.empty() caso não exista
        return veiculos.stream().findFirst();
    }

    // Métodos Auxiliares
    private void updateTable(String tableName, Map<String, Object> fields, String whereClause, Object... whereArgs) {
        if (fields.isEmpty()) {
            return; // Não há nada para atualizar
        }
        StringBuilder sql = new StringBuilder("UPDATE ").append(tableName).append(" SET ");
        List<Object> params = new ArrayList<>();

        for (Map.Entry<String, Object> entry : fields.entrySet()) {
            sql.append(entry.getKey()).append(" = ?, ");
            params.add(entry.getValue());
        }
        // Remove a vírgula extra
        sql.delete(sql.length() - 2, sql.length());
        sql.append(" WHERE ").append(whereClause);
        params.addAll(Arrays.asList(whereArgs));

        System.out.println("SQL gerada: " + sql);
        System.out.println("Parâmetros: " + params);

        jdbcTemplate.update(sql.toString(), params.toArray());
    }
}
