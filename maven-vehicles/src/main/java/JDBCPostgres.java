import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class JDBCPostgres {
    private JDBCPostgres() {}

    public static void main(String[] args) {
        Connection conn = null;

        try {
            String url = "jdbc:postgresql://localhost:5432/gestorVeiculos_db";
            Properties props = new Properties();
            props.setProperty("user", "postgres");
            props.setProperty("password", "postgres");
            // props.setProperty("ssl", "true");

            // Estabelecendo conexão
            conn = DriverManager.getConnection(url, props);
            System.out.println("Conexão bem-sucedida!");

        } catch (Exception ex) {
            // TODO: handle exception
            ex.printStackTrace();
        }finally {
            // Fechando a conexão, se ela estiver aberta
            if (conn != null) {
                try {
                    conn.close();
                    System.out.println("Conexão fechada.");
                } catch (SQLException ex) {
                    ex.printStackTrace();
                }
            }
        }

    }
}
