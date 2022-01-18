package servlets;

import beans.EntriesResults;
import beans.Result;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Calendar;
import java.util.GregorianCalendar;

import static java.lang.Math.pow;
import static java.lang.Math.sqrt;

public class AreaCheckServlet extends HttpServlet {
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
        long start = System.nanoTime();

        EntriesResults pb = (EntriesResults) req.getSession().getAttribute("results");

        GregorianCalendar date = new GregorianCalendar();
        long finish = System.nanoTime();

        pb.add(new Result(checkHit(req.getParameter("x"), req.getParameter("y"), req.getParameter("r")) ? "True" : "False", String.valueOf(Double.parseDouble(req.getParameter("x"))), String.valueOf(Double.parseDouble(req.getParameter("y"))), String.valueOf(Double.parseDouble(req.getParameter("r"))), String.valueOf(finish-start) + " ns", date.get(Calendar.HOUR) + ":" + date.get(Calendar.MINUTE) + ":" + date.get(Calendar.SECOND)));

        req.getRequestDispatcher("project/assets/Table.jsp").forward(req, res);
    }

    public boolean checkHit(String x, String y, String r) {
        double xd = Double.parseDouble(x);
        double yd = Double.parseDouble(y);
        double rd = Double.parseDouble(r);
        if (xd <= 0 && yd <= 0) {
            if (xd >= -rd && yd >= -rd/2) {
                return true;
            }
            return false;
        }
        if (xd >= 0 && yd >= 0) {
            if (xd <= rd/2 && yd <= rd/2 && yd + xd <= rd/2) return true;
            return false;
        }
        if (xd >= 0 &&  yd <= 0) {
            if (-rd <= xd && rd >= yd && sqrt(pow(xd, 2) + pow(yd, 2)) <= rd) {
                return true;
            }
            return false;
        }
        return false;
    }
}
