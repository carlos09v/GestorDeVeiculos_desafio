package desafio.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import desafio.model.Veiculo;

// Responsável pela Lógica com o DB
@Repository
public class VeiculoDAO implements IVeiculoDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    // abstrai o código de manipulação de exceções, fechamento de conexões e outras operações repetitivas, tornando o código mais limpo e fácil de manter.

    // Cadastrar
    @Override
    public Veiculo insert(Veiculo veiculo) {
        String sql = "INSERT INTO veiculos (modelo, fabricante, preco, ano) VALUES (?, ?, ?, ?) RETURNING id"; // Pra evitar
                                                                                                  // SQLInjection
        // Usando o JdbcTemplate para executar a query
        UUID veiculoId = jdbcTemplate.queryForObject(
            sql,
            new Object[] { veiculo.getModelo(), veiculo.getFabricante(), veiculo.getPreco(), veiculo.getAno() },
            UUID.class // Mapeia o resultado para UUID
        );

        veiculo.setId(veiculoId); // Atribui o id ao objeto

        System.out.println("Veículo inserido com sucesso!");

        return veiculo;
    }

    // Atualizar Veiculo
    @Override
    public void update(Veiculo veiculo) {
        String sql = "UPDATE veiculos SET modelo = ?, fabricante = ?, ano = ?, preco = ? WHERE id = ?";

        // Utiliza o JdbcTemplate para executar a atualização
        jdbcTemplate.update(sql, veiculo.getModelo(), veiculo.getFabricante(), veiculo.getAno(), veiculo.getPreco(), veiculo.getId());
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
        String sql = "SELECT * from veiculos";

        // Definindo um RowMapper para mapear o ResultSet para a classe Veiculo
        RowMapper<Veiculo> rowMapper = (rs, rowNum) -> {
            UUID id = UUID.fromString(rs.getString("id"));
            String modelo = rs.getString("modelo");
            String fabricante = rs.getString("fabricante");
            double preco = rs.getDouble("preco");
            int ano = rs.getInt("ano");
            return new Veiculo(id, modelo, fabricante, ano, preco);
        };

        // Utiliza o JdbcTemplate para buscar os veículos
        return jdbcTemplate.query(sql, rowMapper);
    }

    // Get Veiculo by Id
    @Override
    public Optional<Veiculo> findById(UUID id) {
        String sql = "SELECT * from veiculos WHERE id = ?";

        // Definindo um RowMapper para mapear o ResultSet para a classe Veiculo
        RowMapper<Veiculo> rowMapper = (rs, rowNum) -> {
            UUID pKey = UUID.fromString(rs.getString("id"));
            String modelo = rs.getString("modelo");
            String fabricante = rs.getString("fabricante");
            double preco = rs.getDouble("preco");
            int ano = rs.getInt("ano");
            return new Veiculo(pKey, modelo, fabricante, ano, preco);
        };

        // Utiliza o JdbcTemplate para buscar o veículo por ID
        List<Veiculo> veiculos = jdbcTemplate.query(sql, rowMapper, id);

        // Retorna o veículo encontrado, ou Optional.empty() caso não exista
        return veiculos.stream().findFirst();
    }
}
