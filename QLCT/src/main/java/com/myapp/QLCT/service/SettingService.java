package com.myapp.QLCT.service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SettingService {
    
    UserAccountRepository userAccountRepository;
    
}
