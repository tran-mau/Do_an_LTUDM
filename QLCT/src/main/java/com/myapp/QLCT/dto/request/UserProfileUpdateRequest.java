package com.myapp.QLCT.dto.request;

public class UserProfileUpdateRequest {
    private String gender;
    private String date_of_birth;
    private String address;
    private String phone_number;
    
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
}
