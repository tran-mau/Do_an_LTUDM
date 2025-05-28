package com.myapp.QLCT.security;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.URL;
import java.text.ParseException;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Value("${aws.cognito.jwkUrl}")
    private String jwkUrl;
    
    @Value("${aws.cognito.userPoolId}")
    private String userPoolId;

    private JWKSet jwkSet;
    private final long cacheTime = 3600000; // 1 giờ tính bằng milliseconds
    private long lastFetchTime = 0;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Bỏ qua các endpoint không cần xác thực
        String path = request.getRequestURI();
    if (path.startsWith("/api/auth/") || 
        path.equals("/signup") || 
        path.equals("/signin") || 
        path.equals("/confirm-signup") || 
        path.equals("/") ||
        path.equals("/index.html") || 
        path.startsWith("/css/") ||
        path.startsWith("/js/") || 
        path.startsWith("/static/")) {
        filterChain.doFilter(request, response);
        return;
    }

        // Lấy JWT token từ header
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String token = authHeader.substring(7);

        try {
            // Tải JWK Set nếu cần thiết
            if (jwkSet == null || System.currentTimeMillis() - lastFetchTime > cacheTime) {
                jwkSet = JWKSet.load(new URL(jwkUrl));
                lastFetchTime = System.currentTimeMillis();
            }

            // Phân tích JWT
            SignedJWT signedJWT = SignedJWT.parse(token);
            
            // Lấy Key ID từ header của JWT
            String keyId = signedJWT.getHeader().getKeyID();
            
            // Tìm khóa công khai phù hợp trong JWK set
            JWK jwk = jwkSet.getKeyByKeyId(keyId);
            if (jwk == null) {
                throw new JOSEException("Không tìm thấy khóa công khai trong JWK set");
            }
            
            // Tạo RSA verifier
            RSAKey rsaKey = RSAKey.parse(jwk.toJSONObject());
            JWSVerifier verifier = new RSASSAVerifier(rsaKey.toRSAPublicKey());
            
            // Xác thực chữ ký
            if (!signedJWT.verify(verifier)) {
                throw new JOSEException("Chữ ký token không hợp lệ");
            }
            
            // Xác thực các claims
            JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
            
            // Kiểm tra xem token có hết hạn không
            Date expirationTime = claimsSet.getExpirationTime();
            if (expirationTime != null && expirationTime.before(new Date())) {
                throw new JOSEException("Token đã hết hạn");
            }
            
            // Xác thực nhà phát hành (issuer)
            String expectedIssuer = "https://cognito-idp." + userPoolId.split("_")[0] + ".amazonaws.com/" + userPoolId;
            if (!expectedIssuer.equals(claimsSet.getIssuer())) {
                throw new JOSEException("Nhà phát hành token không hợp lệ");
            }
            
            // Lấy tên người dùng/email từ claims
            String username = claimsSet.getSubject();
            
            // Tùy chọn: Trích xuất các vai trò/grupos của người dùng từ token
            // List<String> groups = null;
            // if (claimsSet.getClaim("cognito:groups") != null) {
            //     groups = (List<String>) claimsSet.getClaim("cognito:groups");
            // }
            
            // Tạo authentication token với thông tin người dùng
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    username, null, Collections.emptyList());
            
            SecurityContextHolder.getContext().setAuthentication(auth);

            filterChain.doFilter(request, response);

            
            
        } catch (ParseException | JOSEException e) {
            logger.error("Lỗi xác thực JWT", e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}