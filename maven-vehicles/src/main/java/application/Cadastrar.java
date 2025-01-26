package application;


import dao.VeiculoDAO;
import model.Veiculo;


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