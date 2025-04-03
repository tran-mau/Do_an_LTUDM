package com.myapp.QLCT.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "userinfo")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long user_id;
    private String full_name;
    private String gender;
    private String date_of_birth;
    private String address;
    private String phone_number;
    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
    public void setDate_of_birth(String date_of_birth) {
        this.date_of_birth = date_of_birth;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }
    public Long getUser_id() {
        return user_id;
    }
    public String getFull_name() {
        return full_name;
    }
    public String getGender() {
        return gender;
    }
    public String getDate_of_birth() {
        return date_of_birth;
    }
    public String getAddress() {
        return address;
    }
    public String getPhone_number() {
        return phone_number;
    }

    

    
    
}
