package cs4050.A6.CinemaBookingSystem;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model; 

@Controller
public class CinemaBookingController {
    
    @RequestMapping("/")
    public String home(Model map) {
        return "homepage";
    }

    @GetMapping("/login")
    public String loginPage(Model map) {
        return "login";
    }
}
