import java.sql.*;
import java.util.ArrayList;

public class DataBase {
    final String URL = "jdbc:postgresql://localhost:5432/WebChatJava2";
    final String USER = "postgres";
    final String PASS = "27100603";

    public void writeNewUser(User user) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
             Statement statement = conn.createStatement()) {
            String sql = "INSERT INTO users (login, password, token) VALUES " +
                    "('" + user.getLogin() + "', '" + user.getPass() + "', '" + user.getToken() + "');";
            statement.execute(sql);
            System.out.println("User " + user.getLogin() + "was added to database");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public ArrayList<User> getAllUsers() {
        ArrayList<User> result = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
             Statement statement = conn.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT * FROM users")){

            while (resultSet.next()) {
                result.add(new User(resultSet.getString(2),
                                    resultSet.getString(3),
                                    resultSet.getString(4)));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }

    User getUserByToken(String token) {
        User user = null;
        try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
             Statement statement = conn.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT * FROM users WHERE token = '" + token + "'")){
            while (resultSet.next()) {
                user = new User(resultSet.getString("login"),
                                resultSet.getString("password"),
                                resultSet.getString("token"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }
}
