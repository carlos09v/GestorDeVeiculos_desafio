package infra;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConnectionFactory {
    private static final String URL = "jdbc:postgresql://localhost:5432/gestorVeiculos_db";
    private static final String USER = "postgres";
    private static final String PASSWORD = "postgres";

    // Método estático para obter uma conexão
    public static Connection getConnection() {
        try {
            Properties props = new Properties();
            props.setProperty("user", USER);
            props.setProperty("password", PASSWORD);
            // props.setProperty("ssl", "true");

            return DriverManager.getConnection(URL, props);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao conectar ao banco de dados.", e);
        }
    }

    public static void testConnection() {
        try (Connection conn = getConnection()) {
            System.out.println("Conexão ao banco de dados bem-sucedida!");
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao conectar ao banco de dados: " + e.getMessage(), e);
        }
    }
}