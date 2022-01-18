package servlets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.GregorianCalendar;

public class ClearServlet extends HttpServlet {
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {

        long start = System.nanoTime();
        GregorianCalendar date = new GregorianCalendar();

        req.getSession().removeAttribute("results");

        PrintWriter pw = res.getWriter();
        long finish = System.nanoTime();
    }
}
