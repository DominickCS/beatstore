package com.dominickcs.beatstore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class BeatUploadController {
  @GetMapping("/hello")
  public void sayHello() {
    System.out.println("Hello endpoint was hit.");
  }
}
