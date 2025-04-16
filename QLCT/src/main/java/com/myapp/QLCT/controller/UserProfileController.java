package com.myapp.QLCT.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.QLCT.dto.request.UserProfileCreationRequest;
import com.myapp.QLCT.dto.request.UserProfileUpdateRequest;
import com.myapp.QLCT.entity.UserProfile;
import com.myapp.QLCT.service.UserProfileService;

@RestController
@RequestMapping("/userProfile")
public class UserProfileController {
    @Autowired
    private UserProfileService userProfileService;
    
    // tao thong tin nguoi dung 
    @PostMapping("/create")
    UserProfile createUserProfile(@RequestBody UserProfileCreationRequest request) {
        return userProfileService.createUserProfile(request);
    }
    
    // lay thong tin nguoi dung by id
    @GetMapping("/{user_id}")
    UserProfile getUserProfileById(@PathVariable("user_id") Long user_id) {
        return userProfileService.getUserProfileById(user_id);
    }
    // lay danh sach thong tin nguoi dung
    @GetMapping("/all")
    List<UserProfile> getAllUserProfiles() {
        return userProfileService.getAllUserProfiles();
    }
    // xoa thong tin nguoi dung by id
    @DeleteMapping("/{user_id}")
    void deleteUserProfileById(@PathVariable("user_id") Long user_id) {
        userProfileService.deleteUserProfileById(user_id);
    }
    // cap nhat thong tin nguoi dung by id
    @PostMapping("/{user_id}/update")
    UserProfile updateUserProfileById(@PathVariable("user_id") Long user_id, @RequestBody UserProfileUpdateRequest request) {
        return userProfileService.updateUserProfileById(user_id, request);
    }
}
