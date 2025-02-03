package desafio.services;

import org.springframework.jdbc.core.RowMapper;

import desafio.enums.CarrosEnum.QuantidadePortasEnum;
import desafio.enums.CarrosEnum.TipoCombustivelEnum;
import desafio.model.Carro;
import desafio.model.Moto;
import desafio.model.Veiculo;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

// Mapeamento pra usar no DAO findAll() e findById()
public class VeiculoRowMapper implements RowMapper<Veiculo> {

    @Override
    public Veiculo mapRow(ResultSet rs, int rowNum) throws SQLException {
        UUID id = UUID.fromString(rs.getString("id"));
        String modelo = rs.getString("modelo");
        String fabricante = rs.getString("fabricante");
        BigDecimal preco = rs.getBigDecimal("preco");
        int ano = rs.getInt("ano");
        String tipoVeiculo = rs.getString("tipo_veiculo");
        Timestamp createdAtTimestamp = rs.getTimestamp("created_at");

        LocalDateTime createdAt = createdAtTimestamp != null ? createdAtTimestamp.toLocalDateTime() : null;

        // Mapeia o veículo de acordo com o tipo
        if ("CARRO".equals(tipoVeiculo)) {
            String quantidadePortasStr = rs.getString("quantidade_portas");
            QuantidadePortasEnum quantidadePortas = quantidadePortasStr != null
                    ? QuantidadePortasEnum.fromValor(quantidadePortasStr)
                    : QuantidadePortasEnum.DUAS; // Defina um valor padrão

            String tipoCombustivelStr = rs.getString("tipo_combustivel");
            TipoCombustivelEnum tipoCombustivel = tipoCombustivelStr != null
                    ? TipoCombustivelEnum.valueOf(tipoCombustivelStr)
                    : TipoCombustivelEnum.GASOLINA; // Defina um valor padrão

            return new Carro(id, modelo, fabricante, preco, ano, quantidadePortas, tipoCombustivel, createdAt);
        } else if ("MOTO".equals(tipoVeiculo)) {
            int cilindrada = rs.getInt("cilindrada");
            return new Moto(id, modelo, fabricante, preco, ano, cilindrada, createdAt);
        }

        throw new IllegalArgumentException("Tipo de veículo desconhecido: " + tipoVeiculo);
    }
}