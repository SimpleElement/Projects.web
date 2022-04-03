package service.identification;

import com.google.common.hash.Hashing;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import database.dao.UsersDAO;
import org.json.JSONObject;

import javax.ejb.EJB;
import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.nio.charset.StandardCharsets;

@Path("/users")
@ApplicationScoped
public class UsersResource {

    @EJB
    UsersDAO usersDAO;

    Gson gson = new GsonBuilder().serializeNulls().setPrettyPrinting().create();

    @POST
    @Path("/auth")
    public Response auth(String strRequest) {
        JSONObject request = new JSONObject(strRequest);

        String username = request.getString("username");
        String password = request.getString("password");

        if (username == null || password == null || username.length() == 0 || password.length() == 0) {
            String response = this.gson.toJson(new Message("Incorrect username or password", 401));
            return Response.status(401).entity(response).build();
        }
        String hashPassword = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();
        if (usersDAO.checkUserExists(username, hashPassword)) {
            String response = this.gson.toJson(new Message("Success", 200));
            return Response.status(200).entity(response).build();
        } else {
            String response = this.gson.toJson(new Message("Wrong login or password", 401));
            return Response.status(401).entity(response).build();
        }
    }

    @POST
    @Path("/reg")
    public Response reg(String strRequest) {
        JSONObject request = new JSONObject(strRequest);

        String username = request.getString("username");
        String password = request.getString("password");

        String hashPassword = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();
        if (usersDAO.registerUser(username, hashPassword)) {
            String response = this.gson.toJson(new Message("Success", 200));
            return Response.status(200).entity(response).build();
        } else {
            String response = gson.toJson(new Message("A user with the same username is already registered", 401));
            return Response.status(401).entity(response).build();
        }
    }

    class Message {
        private String message;
        private int status;

        public Message(String message, int status) {
            this.message = message;
            this.status = status;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public int getStatus() {
            return status;
        }

        public void setStatus(int status) {
            this.status = status;
        }
    }
}

