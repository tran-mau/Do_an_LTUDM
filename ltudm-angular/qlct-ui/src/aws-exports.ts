const awsconfig = {
  Auth: {
    Cognito: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_wlAhCjwgf',
      userPoolClientId: '6hk3h7leaqb8tkv6of0a7vs7oc',
      loginWith: {
        username: true,
        email: false,
        phone: false
      }
    }
  }
};

export default awsconfig;