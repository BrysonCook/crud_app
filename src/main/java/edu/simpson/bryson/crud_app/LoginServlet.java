package edu.simpson.bryson.crud_app;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "LoginServlet", value = "/api/login_servlet")
public class LoginServlet extends HttpServlet{
    private final static Logger log = Logger.getLogger(LoginServlet.class.getName());

    /** Method for posts */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        // Set up our response
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Get the data passed in from the request string
        String sessionKey = "loginId";
        String sessionValue = request.getParameter("loginId");

        // Get a session object so we can get/set items in our session.
        // This will automatically create a JSESSIONID cookie for us.
        // It also must happen BEFORE we try writing output to the user.
        HttpSession session = request.getSession();

        // Associate, in server memory, a key/value pair.
        session.setAttribute(sessionKey, sessionValue);
        log.log(Level.INFO, session.getId());
        log.log(Level.INFO, (String) session.getAttribute(sessionKey));

        out.println("Done setting the session variable");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
