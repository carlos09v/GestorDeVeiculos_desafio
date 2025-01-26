package desafio.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.UUID;

import desafio.infra.ConnectionFactory;
import desafio.model.Carro;
import desafio.model.Veiculo;

public class CarroDAO extends VeiculoDAO {
    
    // @Override
    // public Veiculo insert(Veiculo veiculo) {
    //     if (veiculo instanceof Carro) {
    //         // Certifique-se de que o tipo de veiculo seja Carro
    //        Carro carro = (Carro) veiculo;
   
    //        String sql = "INSERT INTO carros (veiculo_id, quantidade_portas, tipo_combustivel) VALUES (?, ?, ?)";
   
    //        try (Connection connection = ConnectionFactory.getConnection()) {
    //            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
   
    //            // Inserir dados na tabela veiculos
    //            super.insert(carro); // Insere o veiculo (modelo, fabricante, etc.)
   
    //            // Inserir dados específicos de carro
    //            preparedStatement.setObject(1, carro.getId());  // Assumindo que 'veiculo_id' é a FK na tabela carros
    //            preparedStatement.setInt(2, carro.getQuantidade_portas());
    //            preparedStatement.setObject(3, carro.getTipo_combustivel());
   
    //            ResultSet resultSet = preparedStatement.getGeneratedKeys();
    //            resultSet.next();
    //            UUID returnedId = (UUID) resultSet.getObject("id");
    //            carro.setId(returnedId);
   
    //            int rowsAffected = preparedStatement.executeUpdate();
   
    //            if (rowsAffected > 0) {
    //                System.out.println("Carro inserido com sucesso!");
    //            } else {
    //                System.out.println("Nenhum carro foi inserido.");
    //            }
   
    //        } catch (Exception ex) {
    //            ex.printStackTrace();
    //            throw new RuntimeException(ex);
    //        }
   
    //        return carro;
    //     }
    // }
}
