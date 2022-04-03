package service.command;

import com.google.common.hash.Hashing;
import database.dao.UsersDAO;
import org.postgresql.util.Base64;

import javax.ejb.EJB;
import javax.ejb.Stateful;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Stateful
public class UserController {

    @EJB
    UsersDAO usersDAO;

    public boolean checkAuth(String username, String password){
        String hashPassword = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();
        return usersDAO.checkUserExists(username, hashPassword);
    }

    public String[] getUsernameAndPassword(String basicToken) {
        byte[] valueDecoded = Base64.decode(basicToken.substring(6));
        return new String(valueDecoded).split(":");
    }
}
