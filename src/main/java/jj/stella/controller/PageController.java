package jj.stella.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PageController {
	
	@GetMapping(value={"/"})
	public ModelAndView page() throws Exception {
		
		ModelAndView result = new ModelAndView();
		result.setViewName("index");
		
		return result;
		
	}
	
}