package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import infra.ConnectionFactory;
import model.Veiculo;

public class VeiculoDAO implements IVeiculoDAO {

    // Cadastrar
    @Override
    public Veiculo insert(Veiculo veiculo) {
        try (Connection connection = ConnectionFactory.getConnection()) {
            String sql = "INSERT INTO veiculos (modelo, fabricante, preco, ano) VALUES (?, ?, ?, ?)"; // Pra evitar SQL Injection SQL

            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, veiculo.getModelo());
            preparedStatement.setString(2, veiculo.getFabricante());
            preparedStatement.setDouble(3, veiculo.getPreco());
            preparedStatement.setInt(4, veiculo.getAno());

            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            resultSet.next();
            UUID returnedId = (UUID) resultSet.getObject("id"); // Pegar o id
            veiculo.setId(returnedId);

            // Executa a inserção e Verifica se inseriu
            int rowsAffected = preparedStatement.executeUpdate();

            if (rowsAffected > 0) {
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

    @Override
    public Veiculo update(Veiculo veiculo) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    // Apagar Veiculo
    @Override
    public void delete(UUID id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    // Get Veiculos
    @Override
    public List<Veiculo> findAll() {
        String sql = "SELECT * from veiculos";

        try (Connection connection = ConnectionFactory.getConnection()) {
            

            
        } catch (Exception ex) {
            // TODO: handle exception
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }

        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public Optional<Veiculo> findById(UUID id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }
}
