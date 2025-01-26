package application;
import java.util.Optional;
import java.util.UUID;

import dao.VeiculoDAO;
import model.Veiculo;

public class AtualizarVeiculo {
    public static void main(String[] args) {
        VeiculoDAO dao = new VeiculoDAO();

        UUID convertedId = UUID.fromString("88037b4d-2a8b-4704-90a3-76a56aac2c0e"); // // Convertendo a String para UUID
        Optional<Veiculo> veiculoOptional = dao.findById(convertedId);
        // Verificar se ID existe!
        if (veiculoOptional.isPresent()) {
            Veiculo veiculo = veiculoOptional.get();

            veiculo.setModelo("atualizado");
            veiculo.setFabricante("atualizado");
            veiculo.setAno(2020);
            veiculo.setPreco(99999);

            dao.update(veiculo);
            System.out.println("Veículo atualizado!");
        } else {
            System.out.println("Veículo não encontrado!");
        }

    }
}
