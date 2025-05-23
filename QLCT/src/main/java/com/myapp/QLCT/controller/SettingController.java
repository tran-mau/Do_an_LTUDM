package myapp.QLCT.controller;

@RestController
@RequestMapping("/api/settings")
public class SettingController {

    SettingService settingService;

    @GetMapping("/user")
    public ResponseEntity<UserAccount> getCurrentUserInfo() {
        UserAccount userAccount = settingService.getUserAccount();
        return ResponseEntity.ok(userAccount);
    }
}