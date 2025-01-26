package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import infra.ConnectionFactory;
import model.Veiculo;

public class VeiculoDAO implements IVeiculoDAO {
    // Cadastrar
    @Override
    public Veiculo insert(Veiculo veiculo) {
        String sql = "INSERT INTO veiculos (modelo, fabricante, preco, ano) VALUES (?, ?, ?, ?)"; // Pra evitar
                                                                                                  // SQLInjection
        try (Connection connection = ConnectionFactory.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, veiculo.getModelo());
            preparedStatement.setString(2, veiculo.getFabricante());
            preparedStatement.setDouble(3, veiculo.getPreco());
            preparedStatement.setInt(4, veiculo.getAno());

            // Executa a inserção e Verifica se inseriu
            int rowsAffected = preparedStatement.executeUpdate();

            if (rowsAffected > 0) {
                // Pega o generated keys
                ResultSet resultSet = preparedStatement.getGeneratedKeys();
                if (resultSet.next()) {
                    UUID returnedId = (UUID) resultSet.getObject("id"); // Pega o id gerado
                    veiculo.setId(returnedId); // Atribui o id ao objeto
                }

                System.out.println("Veículo inserido com sucesso!");
            } else {
                System.out.println("Nenhum veículo foi inserido.");
            }
        } catch (Exception ex) {
            // TODO: handle exception
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }

        return veiculo;
    }

    // Atualizar Veiculo
    @Override
    public Veiculo update(Veiculo veiculo) {
        String sql = "UPDATE veiculos SET modelo = ?, fabricante = ?, ano = ?, preco = ? WHERE id = ?";

        try (Connection connection = ConnectionFactory.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, veiculo.getModelo());
            preparedStatement.setString(2, veiculo.getFabricante());
            preparedStatement.setInt(3, veiculo.getAno());
            preparedStatement.setDouble(4, veiculo.getPreco());
            preparedStatement.setObject(5, veiculo.getId());

            preparedStatement.executeUpdate();

        } catch (Exception ex) {
            // TODO: handle exception
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }

        return veiculo;
    }

    // Apagar Veiculo
    @Override
    public boolean delete(UUID id) {
        String sql = "DELETE FROM veiculos WHERE id = ?";

        try (Connection connection = ConnectionFactory.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setObject(1, id);

            int rowsAffected = preparedStatement.executeUpdate();

            // Se rowsAffected for maior que 0, significa que pelo menos 1 registro foi
            // deletado
            return rowsAffected > 0;
        } catch (Exception ex) {
            // TODO: handle exception
            ex.printStackTrace();
        }

        return false; // Se não deletar nada
    }

    // Get Veiculos
    @Override
    public List<Veiculo> findAll() {
        String sql = "SELECT * from veiculos";

        List<Veiculo> veiculos = new ArrayList<>(); // Criar Lista

        try (Connection connection = ConnectionFactory.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet rs = preparedStatement.executeQuery();

            while (rs.next()) {
                // Obtendo valores do ResultSet
                UUID id = UUID.fromString(rs.getString("id"));
                String modelo = rs.getString("modelo");
                String fabricante = rs.getString("fabricante");
                double preco = rs.getDouble("preco");
                int ano = rs.getInt("ano");

                // Adicionar na lista
                Veiculo veiculo = new Veiculo(id, modelo, fabricante, ano, preco);
                veiculos.add(veiculo);
            }
        } catch (Exception ex) {
            // TODO: handle exception
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }

        // TODO Auto-generated method stub
        return veiculos;
    }

    // Get Veiculo by Id
    @Override
    public Optional<Veiculo> findById(UUID id) {
        String sql = "SELECT * from veiculos WHERE id = ?";

        Veiculo veiculo = null;

        try (Connection connection = ConnectionFactory.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setObject(1, id);
            ResultSet rs = preparedStatement.executeQuery();

            while (rs.next()) {
                // Obtendo valores do ResultSet
                UUID pKey = UUID.fromString(rs.getString("id"));
                String modelo = rs.getString("modelo");
                String fabricante = rs.getString("fabricante");
                double preco = rs.getDouble("preco");
                int ano = rs.getInt("ano");

                veiculo = new Veiculo(pKey, modelo, fabricante, ano, preco);
            }
        } catch (Exception ex) {
            // TODO: handle exception
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }

        return Optional.ofNullable(veiculo); // Pode ser null
    }
}
