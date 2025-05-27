package com.myapp.QLCT.controller;


import com.myapp.QLCT.service.CognitoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private CognitoService cognitoService;

    @PostMapping("/signin")
    public ResponseEntity<Map<String, String>> signIn(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Map<String, String> result = cognitoService.signIn(username, password);

        if ("SUCCESS".equals(result.get("status"))) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signUp(@RequestBody Map<String, String> userData) {
        String username = userData.get("username").trim();
        String password = userData.get("password").trim();
        String email = userData.get("email").trim();
        String firstName = userData.get("firstName").trim();
        String lastName = userData.get("lastName").trim();

        Map<String, String> result = cognitoService.signUp(username, password, email, firstName, lastName);

        if ("SUCCESS".equals(result.get("status"))) {
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @PostMapping("/signout")
    public ResponseEntity<Void> signOut(@RequestBody Map<String, String> tokenData) {
        String accessToken = tokenData.get("accessToken");
        cognitoService.signOut(accessToken);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/confirm-signup")
    public ResponseEntity<Map<String, String>> confirmSignUp(@RequestBody Map<String, String> confirmationData) {
        String username = confirmationData.get("username");
        String confirmationCode = confirmationData.get("confirmationCode");

        Map<String, String> result = cognitoService.confirmSignUp(username, confirmationCode);

        if ("SUCCESS".equals(result.get("status"))) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @PostMapping("/resend-confirmation")
    public ResponseEntity<Map<String, String>> resendConfirmation(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");

        Map<String, String> result = cognitoService.resendConfirmationCode(username);

        if ("SUCCESS".equals(result.get("status"))) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        String newPassword = userData.get("newPassword");

        Map<String, String> result = cognitoService.resetPassword(username, newPassword);

        if ("SUCCESS".equals(result.get("status"))) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
    
}
