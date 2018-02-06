const BASEPATH = 'https://riopiwbvwh.execute-api.us-east-1.amazonaws.com/Test/';

export const Config = {
    PROD : {
        BASEPATH: BASEPATH,
        ORGANIZATION: BASEPATH + 'organization/',
        ASSETS: '/asset',
        TOKEN: {
            AUTORIZATION_URL: 'https://autenticacion.udistrital.edu.co/oauth2/authorize',
            URL_USER_INFO: 'https://autenticacion.udistrital.edu.co/oauth2/userinfo',
            CLIENTE_ID: '',
            REDIRECT_URL: '',
            RESPONSE_TYPE: 'code',
            SCOPE: 'openid email',
            SIGN_OUT_URL: 'https://autenticacion.udistrital.edu.co/oidc/logout',
            SIGN_OUT_REDIRECT_URL: 'http://localhost:9000/',
            REFRESH_TOKEN: 'https://autenticacion.udistrital.edu.co/oauth2/token',
            CLIENT_SECRET: '',
        },
    },
};
