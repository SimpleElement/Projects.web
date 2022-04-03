package service.command.commands;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import database.dao.PointsDAO;
import database.model.Point;
import org.json.JSONObject;
import service.command.UserController;

import javax.ejb.EJB;
import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Path("/points")
@ApplicationScoped
public class PointsResource {

    @EJB
    UserController userController;

    @EJB
    PointsDAO pointsDAO;

    Gson gson =  new GsonBuilder().serializeNulls().setPrettyPrinting().create();

    @POST
    @Path("/add")
    public Response add(@HeaderParam("Authorization") String userToken, String strRequest) {
        JSONObject request = new JSONObject(strRequest);

        String[] userAndPassword = userController.getUsernameAndPassword(userToken);

        String username = userAndPassword[0];
        String password = userAndPassword[1];

        if (userController.checkAuth(username, password)) {
            String x = request.getString("x");
            String y = request.getString("y");
            String r = request.getString("r");

            if (pointsDAO.addUserPoint(username,x, y, r)) {
                String response = this.gson.toJson(new Out(username, x, y, r));

                return Response.ok().entity(response).build();
            } else {
                return Response.status(500).build();
            }
        } else {
            return Response.status(401).build();
        }
    }

    @POST
    @Path("/clear")
    public Response clear(@HeaderParam("Authorization") String userToken) {
        String[] userAndPassword = userController.getUsernameAndPassword(userToken);

        String username = userAndPassword[0];
        String password = userAndPassword[1];

        if (userController.checkAuth(username, password)) {
            if (pointsDAO.clearUserPoints(username)) {
                return Response.ok().build();
            } else {
                return Response.status(500).build();
            }
        } else {
            return Response.status(401).build();
        }
    }

    @GET
    @Path("/get")
    public Response get(@HeaderParam("Authorization") String userToken) {
        String[] userAndPassword = userController.getUsernameAndPassword(userToken);

        String username = userAndPassword[0];
        String password = userAndPassword[1];

        if (userController.checkAuth(username, password)) {
            List<Out> result = new ArrayList<>();

            for (Point point: pointsDAO.getUserPoints(username)) {
                result.add(new Out(username, point.getX(), point.getY(), point.getR(), point.isHitResult()));
            }

            String resultJson = this.gson.toJson(result);

            return Response.ok().entity(resultJson).build();
        } else {
            return Response.status(401).build();
        }
    }

    class Out implements Serializable {
        private double x;
        private double y;
        private double r;
        private boolean hitResult;
        private String username;

        public Out(String username, double x, double y, double r, boolean hitResult) {
            this.username =username;
            this.x = x;
            this.y = y;
            this.r = r;
            this.hitResult = hitResult;
        }

        public Out(String username, String x, String y, String r) {
            this.username =username;
            this.x = Double.parseDouble(x);
            this.y = Double.parseDouble(y);
            this.r = Double.parseDouble(r);
            this.hitResult = computeHitResult();
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public boolean isHitResult() {
            return hitResult;
        }

        public void setHitResult(boolean hitResult) {
            this.hitResult = hitResult;
        }

        public double getR() {
            return r;
        }

        public void setR(double r) {
            this.r = r;
        }

        public double getY() {
            return y;
        }

        public void setY(double y) {
            this.y = y;
        }

        public double getX() {
            return x;
        }

        public void setX(double x) {
            this.x = x;
        }

        private boolean computeHitResult() {
            if (this.r >= 0) {
                return (checkPositiveTriangle(this.x, this.y, this.r) ||  checkPositiveRectangle(this.x, this.y, this.r) || checkPositiveSemicircle(this.x, this.y, this.r));
            } else {
                return (checkNegativeTriangle(this.x, this.y, this.r) ||  checkNegativeRectangle(this.x, this.y, this.r) || checkNegativeSemicircle(this.x, this.y, this.r));
            }
        }

        private boolean checkPositiveTriangle(Double x, Double y, Double r) {
            if ((x >= 0 && y >= 0) &&
                    (x + y <= r / 2)) {
                return true;
            }
            return false;
        }

        private boolean checkPositiveRectangle(Double x, Double y, Double r) {
            if (
                    (0 <= x && x <= r) &&
                            (0 >= y && y >= -r / 2)
            )
                return true;
            return false;
        }

        private boolean checkPositiveSemicircle(Double x, Double y, Double r) {
            if (
                    (x <= 0 && y >= 0) &&
                            (x*x + y*y <= (r / 2) * (r / 2))
            ) {
                return true;
            }
            return false;
        }

        private boolean checkNegativeTriangle(Double x, Double y, Double r) {
            if ((x <= 0 && y >= 0) &&
                    (-x + y <= - r / 2)) {
                return true;
            }
            return false;
        }

        private boolean checkNegativeRectangle(Double x, Double y, Double r) {
            if (
                    (0 >= x && x >= r) &&
                            (0 >= y && y >= r/2)
            ) {
                return true;
            }
            return false;
        }

        private boolean checkNegativeSemicircle(Double x, Double y, Double r) {
            if (
                    (x >= 0 && y >= 0) &&
                            (x*x + y*y <= (r / 2) * (r / 2))
            ) {
                return true;
            }
            return false;
        }
    }
}
