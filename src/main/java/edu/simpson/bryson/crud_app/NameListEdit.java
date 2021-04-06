package edu.simpson.bryson.crud_app;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "NameListEdit", value = "/api/name_list_edit")
public class NameListEdit extends HttpServlet{
    private final static Logger log = Logger.getLogger(NameListEdit.class.getName());

    private Pattern nameValidationPattern;
    private Pattern phoneNumValidationPattern;
    private Pattern dateValidationPattern;
    private Pattern emailValidationPattern;

    public NameListEdit(){
        nameValidationPattern = Pattern.compile("^[A-z\\s]+$");
        phoneNumValidationPattern = Pattern.compile("^(\\d{3}){1,2}(\\d{4})$");
        dateValidationPattern = Pattern.compile("^(\\d{4})[-](\\d{2})[-](\\d{2})$");
        emailValidationPattern = Pattern.compile("^[\\w.]+@\\w+\\.\\w+$");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        log.log(Level.INFO, "doPost for NameListEdit");

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        log.log(Level.INFO, requestString);

        Jsonb jsonb = JsonbBuilder.create();
        Person person = jsonb.fromJson(requestString, Person.class);

        log.log(Level.INFO, "Object test: " + person.getFirst());

        Matcher fname = nameValidationPattern.matcher(person.getFirst());
        if (!fname.find( )) {
            out.println("error");
            return;
        }
        Matcher lname = nameValidationPattern.matcher(person.getLast());
        if (!lname.find()){
            out.println("error");
            return;
        }
        Matcher email = emailValidationPattern.matcher(person.getEmail());
        if (!email.find()){
            out.println("error");
            return;
        }
        Matcher phone = phoneNumValidationPattern.matcher(person.getPhone());
        if (!phone.find()){
            out.println("error");
            return;
        }
        Matcher birthday = dateValidationPattern.matcher(person.getBirthday());
        if (!birthday.find()){
            out.println("error");
            return;
        }

        PersonDAO.addPerson(person);
    }
}
