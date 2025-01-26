package desafio.application;

import java.util.Optional;
import java.util.UUID;

import desafio.dao.VeiculoDAO;
import desafio.model.Veiculo;

public class ListarById {
    public static void main(String[] args) {
        VeiculoDAO dao = new VeiculoDAO();

        // ID do veículo que você quer buscar
        UUID id = UUID.fromString("88037b4d-2a8b-4704-90a3-76a56aac2c0e");

        // Busca o veículo pelo ID
        Optional<Veiculo> veiculoOptional = dao.findById(id);

        // Verifica se o veículo foi encontrado
        if (veiculoOptional.isPresent()) {
            Veiculo veiculo = veiculoOptional.get();
            System.out.println("ID: " + veiculo.getId());
            System.out.println("Modelo: " + veiculo.getModelo());
            System.out.println("Fabricante: " + veiculo.getFabricante());
            System.out.println("Ano: " + veiculo.getAno());
            System.out.println("Preço: " + veiculo.getPreco());
        } else {
            System.out.println("Veículo com ID " + id + " não encontrado.");
        }
    }
}
