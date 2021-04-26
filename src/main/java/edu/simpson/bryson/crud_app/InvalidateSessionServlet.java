package edu.simpson.bryson.crud_app;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "InvalidateSessionServlet", value = "/api/invalidate_session_servlet")
public class InvalidateSessionServlet extends HttpServlet {
    private final static Logger log = Logger.getLogger(InvalidateSessionServlet.class.getName());
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Get the session
        HttpSession session = request.getSession();
        log.log(Level.INFO, "session ended");

        // Invalidate it
        session.invalidate();
    }
}
