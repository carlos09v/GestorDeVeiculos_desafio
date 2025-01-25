import dao.VeiculoDAO;
import infra.ConnectionFactory;
import model.Veiculo;

public class Application {
    
    
    public static void main(String[] args) {
        // ConnectionFactory.testConnection(); // Testar conexão
        VeiculoDAO dao = new VeiculoDAO();

        Veiculo veiculo = new Veiculo();
        veiculo.setModelo("Calabresa");
        veiculo.setFabricante("Honda");
        veiculo.setAno(1950);
        veiculo.setPreco(1254.33);

        Veiculo veiculoRetornado = dao.insert(veiculo);
        System.out.println(veiculoRetornado.getId());
    }
}