package servlets;

import beans.EntriesResults;
import beans.Result;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        EntriesResults pb = (EntriesResults) req.getSession().getAttribute("results");

        if (pb == null) {
            req.getSession().setAttribute("results", new EntriesResults());
        }

        switch (req.getParameter("type")) {
            case "check":
                req.getRequestDispatcher("/check").forward(req, resp);
                break;
            case "clear":
                req.getRequestDispatcher("/clear").forward(req, resp);
                break;
            default:
                req.getRequestDispatcher("/error").forward(req, resp);
        }
    }

    public boolean validate(String x, String y, String r) {
        if (x == null || y == null || r == null)
            return false;
        try {
            double xd = Double.parseDouble(x);
            double yd = Double.parseDouble(y);
            double rd = Double.parseDouble(r);
        } catch (Exception e) {
            return false;
        }
        return true;
    }
}
