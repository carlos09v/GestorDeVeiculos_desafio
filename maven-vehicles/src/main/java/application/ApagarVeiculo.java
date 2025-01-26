package application;

import java.util.UUID;
import dao.VeiculoDAO;


public class ApagarVeiculo {
    public static void main(String[] args) {
        VeiculoDAO dao = new VeiculoDAO();

        // ID do veículo que você quer apagar
        UUID id = UUID.fromString("88037b4d-2a8b-4704-90a3-76a56aac2c0e");

        boolean sucesso = dao.delete(id);

        if (sucesso) {
            System.out.println("Veículo deletado com sucesso!");
        } else {
            System.out.println("Veículo não encontrado!");
        }
    }
}
