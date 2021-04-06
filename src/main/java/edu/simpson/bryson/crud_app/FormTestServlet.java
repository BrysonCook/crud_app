package edu.simpson.bryson.crud_app;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "FormTestServlet", value = "/api/form_test_servlet")
public class FormTestServlet extends HttpServlet {

    private Pattern nameValidationPattern;
    private Pattern phoneNumValidationPattern;
    private Pattern dateValidationPattern;
    private Pattern emailValidationPattern;

    public FormTestServlet(){
        nameValidationPattern = Pattern.compile("^[A-zÀ-ú\\s]+$");
        phoneNumValidationPattern = Pattern.compile("^(\\d{3}){1,2}(\\d{4})$");
        dateValidationPattern = Pattern.compile("^(\\d{4})[-](\\d{2})[-](\\d{2})$");
        emailValidationPattern = Pattern.compile("^[\\w.]+@\\w+\\.\\w+$");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Print that this is a get, not a post
        out.println("Get");

        // Grab the data we got via a parameter
        String fieldname = request.getParameter("fieldname");

        // Just print the data out to confirm we got it.
        out.println("fieldname='"+fieldname+"'");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Print that this is a post
        out.println("Post");

        // Grab the data we got via a parameter
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String email = request.getParameter("email");
        String birthday = request.getParameter("birthday");
        String phone = request.getParameter("phone");

        // Just print the data out to confirm we got it.
        out.println("firstName='"+firstName+"'");

        // Now create matcher object.
        Matcher fname = nameValidationPattern.matcher(firstName);
        if (fname.find( )) {
            out.println("success");
        } else {
            out.println("error");
        }
        Matcher lname = nameValidationPattern.matcher(lastName);
        if (lname.find( )) {
            out.println("success");
        } else {
            out.println("error");
        }
        Matcher emailMatch = emailValidationPattern.matcher(email);
        if (emailMatch.find( )) {
            out.println("success");
        } else {
            out.println("error");
        }
        Matcher phoneMatch = phoneNumValidationPattern.matcher(phone);
        if (phoneMatch.find( )) {
            out.println("success");
        } else {
            out.println("error");
        }
        Matcher dateMatch = dateValidationPattern.matcher(birthday);
        if (dateMatch.find( )) {
            out.println("success");
        } else {
            out.println("error");
        }
    }
}
