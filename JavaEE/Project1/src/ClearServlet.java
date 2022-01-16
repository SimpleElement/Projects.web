import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.GregorianCalendar;

public class ClearServlet extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {

        long start = System.nanoTime();
        GregorianCalendar date = new GregorianCalendar();
        HttpSession session = req.getSession();
        session.getServletContext().removeAttribute("points");

        PrintWriter pw = res.getWriter();
        long finish = System.nanoTime();
        pw.println("<tr>" +
                "<td width=\"95px\">Clear</td>" +
                "<td width=\"20px\">-</td>" +
                "<td width=\"20px\">-</td>" +
                "<td width=\"20px\">-</td>" +
                "<td>"+ String.valueOf(finish-start) + " ns" +"</td>" +
                "<td>" + date.get(Calendar.HOUR) + ":" + date.get(Calendar.MINUTE) + ":" + date.get(Calendar.SECOND) +"</td>" +
                "<tr>"
        );
    }
}
