package edu.simpson.bryson.crud_app;

import javax.imageio.ImageIO;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "memeServlet", value = "/meme")
public class memeServlet extends HttpServlet {
    private final static Logger log = Logger.getLogger(memeServlet.class.getName());

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        log.log(Level.INFO, "Meme servlet");

        ServletContext context = getServletContext();
        InputStream imageStream = context.getResourceAsStream("WEB-INF/classes/carFlip.jpg");
        BufferedImage image = ImageIO.read(imageStream);

        Graphics g = image.getGraphics();
        String fontName = "Times New Roman";
        int fontSize = 70;
        int fontStyle = Font.BOLD;
        Font font = new Font(fontName, fontStyle, fontSize);
        g.setFont(font);

        Color myColor = new Color(205, 0, 0);
        g.setColor(myColor);

        String message = request.getParameter("message");
        if (message == null) {
            message = "The Ultimate Driving Machine!";
        }

        g.drawString(message, 100, 100);

        g.dispose();

        response.setContentType("image/jpg");
        OutputStream out = response.getOutputStream();
        ImageIO.write(image, "JPG", out);
    }
}
