package org.jeecg.modules.wx;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/wx/test")
@Slf4j
public class WxController {
@GetMapping("/hello")
    public String hello(){
    return "hello";
}
}
