package com.myapp.QLCT.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Service;

import com.myapp.QLCT.dto.request.UserProfileCreationRequest;
import com.myapp.QLCT.dto.request.UserProfileUpdateRequest;
import com.myapp.QLCT.entity.UserProfile;
import com.myapp.QLCT.repository.UserProfileRepository;

@Service
public class UserProfileService {
    @Autowired
    private UserProfileRepository userProfileRepository;


    public UserProfile createUserProfile(UserProfileCreationRequest request) {
        UserProfile userProfile = new UserProfile();
        
        userProfile.setFull_name(request.getFull_name());
        userProfile.setGender(request.getGender());
        userProfile.setDate_of_birth(request.getDate_of_birth());
        userProfile.setAddress(request.getAddress());
        userProfile.setPhone_number(request.getPhone_number());

        return userProfileRepository.save(userProfile);
    }

    // lay danh sach thong tin nguoi dung
    public List<UserProfile> getAllUserProfiles() {
        return userProfileRepository.findAll();
    }
    
    // lay thong tin nguoi dung by id
    public UserProfile getUserProfileById(Long user_id){
        return userProfileRepository.findById(user_id).orElse(null);
    }

    // xoa thong tin nguoi dung by id
    public void deleteUserProfileById(Long user_id) {
        userProfileRepository.deleteById(user_id);
    }

    // cap nhat thong tin nguoi dung by id
    public UserProfile updateUserProfileById(Long user_id, UserProfileUpdateRequest request) {
        UserProfile userProfile = userProfileRepository.findById(user_id).orElse(null);
        if (userProfile != null) {
            userProfile.setGender(request.getGender());
            userProfile.setDate_of_birth(request.getDate_of_birth());
            userProfile.setAddress(request.getAddress());
            userProfile.setPhone_number(request.getPhone_number());
            return userProfileRepository.save(userProfile);
        }
        return null;
    }

}
