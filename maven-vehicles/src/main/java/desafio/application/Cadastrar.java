package desafio.application;


import desafio.dao.VeiculoDAO;
import desafio.model.Veiculo;


public class Cadastrar {

    public static void main(String[] args) {
        // ConnectionFactory.testConnection(); // Testar conexão
        VeiculoDAO dao = new VeiculoDAO();

        Veiculo veiculo = new Veiculo();
        veiculo.setModelo("Novo Veículo");
        veiculo.setFabricante("Honda");
        veiculo.setAno(2023);
        veiculo.setPreco(50000);

        dao.insert(veiculo);
    }
}