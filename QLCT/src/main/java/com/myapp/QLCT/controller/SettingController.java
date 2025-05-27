package com.myapp.QLCT.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.QLCT.dto.request.UserRequest;
import com.myapp.QLCT.entity.User;
import com.myapp.QLCT.service.SettingService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/settings")
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class SettingController {

    SettingService settingService;

    @GetMapping("/userProfile")
    public ResponseEntity<User> getUserProfile() {
        User user = settingService.getUserProfile();
        return ResponseEntity.ok(user);
    }

    @PostMapping("/editProfile")
    public ResponseEntity<User> editUserProfile(
            @RequestBody UserRequest request,
            @RequestHeader("Authorization") String authorizationHeader) {
        String accessToken = authorizationHeader.replace("Bearer ", "");
        User response = settingService.editUserProfile(accessToken, request);

        return ResponseEntity.ok(response);
    }
}
