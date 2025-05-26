package com.myapp.QLCT.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.cognitoidentityprovider.model.AttributeType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.UpdateUserAttributesRequest;

import com.myapp.QLCT.dto.request.UserRequest;
import com.myapp.QLCT.entity.User;
import com.myapp.QLCT.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class SettingService {

    CognitoIdentityProviderClient cognitoClient;
    
    UserRepository userRepository;
    
    public User getUserProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userID = auth.getName();
        
        User user = userRepository.findById(userID).orElseThrow(() -> new RuntimeException("User not found"));
        return user;
    }

    public User editUserProfile(String accessToken, UserRequest user) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userID = auth.getName();
        
        User existingUser = userRepository.findById(userID).orElseThrow(() -> new RuntimeException("User not found"));

        List<AttributeType> attributes = new ArrayList<>();
        attributes.add(AttributeType.builder().name("given_name").value(user.getFirstname()).build());
        attributes.add(AttributeType.builder().name("family_name").value(user.getLastname()).build());

        UpdateUserAttributesRequest request = UpdateUserAttributesRequest.builder()
            .accessToken(accessToken)
            .userAttributes(attributes)
            .build();

        try {
            cognitoClient.updateUserAttributes(request);
        } 
        catch (Exception e) {
            throw new RuntimeException("Failed to update Cognito user attributes: " + e.getMessage(), e);
        }
        
        existingUser.setUsername(user.getUsername());
        existingUser.setFirstname(user.getFirstname());
        existingUser.setLastname(user.getLastname());
        existingUser.setEmail(user.getEmail());

        return userRepository.save(existingUser);
    }
}
