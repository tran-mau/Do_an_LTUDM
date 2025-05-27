package com.myapp.QLCT.service;


import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class CognitoService {

    @Value("${aws.cognito.clientId}")
    private String clientId;

    @Value("${aws.cognito.clientSecret}")
    private String clientSecret;

    @Value("${aws.cognito.userPoolId}")
    private String userPoolId;

    @Value("${aws.cognito.region}")
    private String region;

    @Value("${aws.cognito.accessKey}")
    private String accessKey;

    @Value("${aws.cognito.secretKey}")
    private String secretKey;

    private AWSCognitoIdentityProvider createCognitoClient() {
        BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        return AWSCognitoIdentityProviderClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.fromName(region))
                .build();
    }

    private String calculateSecretHash(String username) {
        if (clientSecret == null || clientSecret.isEmpty()) {
            return null; // Return null if no client secret is configured
        }

        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec signingKey = new SecretKeySpec(
                    clientSecret.getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256");
            mac.init(signingKey);

            mac.update(username.getBytes(StandardCharsets.UTF_8));
            byte[] rawHmac = mac.doFinal(clientId.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(rawHmac);
        } catch (Exception e) {
            throw new RuntimeException("Error calculating SECRET_HASH", e);
        }
    }

    public Map<String, String> signIn(String username, String password) {
        Map<String, String> authResult = new HashMap<>();

        try {
            AWSCognitoIdentityProvider cognitoClient = createCognitoClient();

            // Create auth parameters
            final Map<String, String> authParams = new HashMap<>();
            authParams.put("USERNAME", username);
            authParams.put("PASSWORD", password);

            // Add SECRET_HASH if client secret is configured
            String secretHash = calculateSecretHash(username);
            if (secretHash != null) {
                authParams.put("SECRET_HASH", secretHash);
            }

            // Use InitiateAuth with USER_PASSWORD_AUTH flow
            final InitiateAuthRequest authRequest = new InitiateAuthRequest()
                    .withAuthFlow(AuthFlowType.USER_PASSWORD_AUTH)
                    .withClientId(clientId)
                    .withAuthParameters(authParams);

            // Send login request
            InitiateAuthResult authResponse = cognitoClient.initiateAuth(authRequest);

            // Rest of your code handling the response...
            AuthenticationResultType resultType = authResponse.getAuthenticationResult();
            if (resultType != null) {
                authResult.put("accessToken", resultType.getAccessToken());
                authResult.put("idToken", resultType.getIdToken());
                authResult.put("refreshToken", resultType.getRefreshToken());
                authResult.put("status", "SUCCESS");
                String idToken = resultType.getIdToken();
                DecodedJWT decodedJWT = JWT.decode(idToken);
                String userId = decodedJWT.getSubject(); // lấy 'sub'
                authResult.put("userId", userId);
            } else if (authResponse.getChallengeName() != null) {
                authResult.put("challengeName", authResponse.getChallengeName());
                authResult.put("status", "CHALLENGE");
                authResult.put("session", authResponse.getSession());
            }
        } catch (UserNotFoundException ex) {
            authResult.put("status", "FAILED");
            authResult.put("message", "User does not exist");
        } catch (NotAuthorizedException ex) {
            authResult.put("status", "FAILED");
            authResult.put("message", "Incorrect username or password");
        } catch (Exception e) {
            authResult.put("status", "FAILED");
            authResult.put("message", e.getMessage());
        }

        return authResult;
    }

    public Map<String, String> signUp(String username, String password, String email, String firstName,
            String lastName) {
        Map<String, String> signUpResult = new HashMap<>();

        try {
            AWSCognitoIdentityProvider cognitoClient = createCognitoClient();

            // Trim trước
            username = username.trim();
            password = password.trim();
            email = email.trim();
            firstName = firstName.trim();
            lastName = lastName.trim();

            AttributeType emailAttr = new AttributeType()
                    .withName("email")
                    .withValue(email);

            AttributeType firstNameAttr = new AttributeType()
                    .withName("given_name")
                    .withValue(firstName);

            AttributeType lastNameAttr = new AttributeType()
                    .withName("family_name")
                    .withValue(lastName);

            SignUpRequest signUpRequest = new SignUpRequest()
                    .withClientId(clientId)
                    .withUsername(username)
                    .withUserAttributes(firstNameAttr, lastNameAttr, emailAttr)
                    .withPassword(password);

            String secretHash = calculateSecretHash(username);
            if (secretHash != null) {
                signUpRequest.withSecretHash(secretHash);
            }

            cognitoClient.signUp(signUpRequest);

            signUpResult.put("status", "SUCCESS");
            signUpResult.put("username", username);
        } catch (UsernameExistsException ex) {
            signUpResult.put("status", "FAILED");
            signUpResult.put("message", "Username already exists");
        } catch (Exception e) {
            signUpResult.put("status", "FAILED");
            signUpResult.put("message", e.getMessage());
        }

        return signUpResult;
    }

    public Map<String, String> confirmSignUp(String username, String confirmationCode) {
        Map<String, String> result = new HashMap<>();

        try {
            AWSCognitoIdentityProvider cognitoClient = createCognitoClient();

            // Tạo yêu cầu xác thực mã xác nhận
            ConfirmSignUpRequest confirmSignUpRequest = new ConfirmSignUpRequest()
                    .withUsername(username)
                    .withConfirmationCode(confirmationCode)
                    .withClientId(clientId); // Client ID của bạn từ Cognito

            String secretHash = calculateSecretHash(username);
            if (secretHash != null) {
                confirmSignUpRequest.withSecretHash(secretHash);
            }

            // Gọi API của AWS Cognito để xác thực mã xác nhận
            cognitoClient.confirmSignUp(confirmSignUpRequest);

            result.put("status", "SUCCESS");
        } catch (Exception e) {
            result.put("status", "FAILED");
            result.put("message", e.getMessage()); // Lỗi nếu có
        }

        return result;
    }

    public Map<String, String> resendConfirmationCode(String username) {
        Map<String, String> result = new HashMap<>();

        try {
            AWSCognitoIdentityProvider cognitoClient = createCognitoClient();

            // Tạo yêu cầu gửi mã xác nhận lại
            ResendConfirmationCodeRequest resendRequest = new ResendConfirmationCodeRequest()
                    .withUsername(username)
                    .withClientId(clientId); // Client ID của bạn từ Cognito

            String secretHash = calculateSecretHash(username);
            if (secretHash != null) {
                resendRequest.withSecretHash(secretHash);
            }

            // Gọi API của AWS Cognito để gửi mã xác nhận lại
            cognitoClient.resendConfirmationCode(resendRequest);

            result.put("status", "SUCCESS");
        } catch (Exception e) {
            result.put("status", "FAILED");
            result.put("message", e.getMessage()); // Lỗi nếu có
        }

        return result;
    }

    public void signOut(String accessToken) {
        try {
            AWSCognitoIdentityProvider cognitoClient = createCognitoClient();

            GlobalSignOutRequest signOutRequest = new GlobalSignOutRequest()
                    .withAccessToken(accessToken);

            cognitoClient.globalSignOut(signOutRequest);
        } catch (Exception e) {
            // Xử lý lỗi khi đăng xuất
            throw new RuntimeException("Error signing out: " + e.getMessage());
        }
    }

   public Map<String, String> resetPassword(String username, String newPassword) {
        Map<String, String> response = new HashMap<>();
        
        try {
            AWSCognitoIdentityProvider cognitoClient = createCognitoClient();

            // Tạo yêu cầu reset password
            AdminSetUserPasswordRequest resetPasswordRequest = new AdminSetUserPasswordRequest()
                    .withUserPoolId(userPoolId)
                    .withUsername(username)
                    .withPassword(newPassword)
                    .withPermanent(true); // QUAN TRỌNG: Bỏ comment dòng này để tránh user phải đổi mật khẩu lần đầu đăng nhập

            // Gọi API của AWS Cognito để reset password
            AdminSetUserPasswordResult result = cognitoClient.adminSetUserPassword(resetPasswordRequest);
            
            // Tùy chọn: Đánh dấu email/phone đã verified
            updateUserVerificationStatus(cognitoClient, username);
            
            response.put("status", "SUCCESS");
            response.put("message", "Password reset successfully");
            response.put("username", username);
            
            return response;
            
        } catch (UserNotFoundException e) {
            response.put("status", "ERROR");
            response.put("message", "User not found: " + username);
            response.put("errorCode", "USER_NOT_FOUND");
            return response;
            
        } catch (InvalidPasswordException e) {
            response.put("status", "ERROR");
            response.put("message", "Invalid password format: " + e.getMessage());
            response.put("errorCode", "INVALID_PASSWORD");
            return response;
            
        } catch (InvalidParameterException e) {
            response.put("status", "ERROR");
            response.put("message", "Invalid parameter: " + e.getMessage());
            response.put("errorCode", "INVALID_PARAMETER");
            return response;
            
        } catch (TooManyRequestsException e) {
            response.put("status", "ERROR");
            response.put("message", "Too many requests. Please try again later.");
            response.put("errorCode", "TOO_MANY_REQUESTS");
            return response;
            
        } catch (Exception e) {
            response.put("status", "ERROR");
            response.put("message", "Error resetting password: " + e.getMessage());
            response.put("errorCode", "UNKNOWN_ERROR");
            return response;
        }
    }
    
    // Method để đánh dấu user đã verified email/phone
    private void updateUserVerificationStatus(AWSCognitoIdentityProvider cognitoClient, String username) {
        try {
            AdminUpdateUserAttributesRequest updateRequest = new AdminUpdateUserAttributesRequest()
                    .withUserPoolId(userPoolId)
                    .withUsername(username)
                    .withUserAttributes(
                            new AttributeType().withName("email_verified").withValue("true"),
                            new AttributeType().withName("phone_number_verified").withValue("true")
                    );
                    
            cognitoClient.adminUpdateUserAttributes(updateRequest);
        } catch (Exception e) {
            // Log error nhưng không throw exception vì việc update verification không critical
            System.err.println("Warning: Could not update verification status for user " + username + ": " + e.getMessage());
        }
    }
}