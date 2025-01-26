package desafio.application;

import java.util.List;

import desafio.dao.VeiculoDAO;
import desafio.model.Veiculo;

public class ListarVeiculos {
    public static void main(String[] args) {
        VeiculoDAO dao = new VeiculoDAO();
        List<Veiculo> veiculos = dao.findAll();

        for(Veiculo veiculo: veiculos) {
            System.out.println("ID: " + veiculo.getId());
            System.out.println("Modelo: " + veiculo.getModelo());
            System.out.println("Fabricante: " + veiculo.getFabricante());
            System.out.println("Ano: " + veiculo.getAno());
            System.out.println("Preço: " + veiculo.getPreco());
            System.out.println("--------------------");
        }
    }
}
