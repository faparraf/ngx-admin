const BASEPATH = 'https://riopiwbvwh.execute-api.us-east-1.amazonaws.com/Test/';

export const Config = {
    PROD: {
        BASEPATH: BASEPATH,
        ORGANIZATION: BASEPATH + 'organization/',
        ASSETS: '/asset',
        ASSET: 'https://riopiwbvwh.execute-api.us-east-1.amazonaws.com/Test/asset/',
    },
    LOCAL: {
        BASEPATH: 'https://clustuserpool.auth.us-east-1.amazoncognito.com',
        TOKEN: {
            AUTORIZATION_URL: 'https://clustuserpool.auth.us-east-1.amazoncognito.com/oauth2/authorize',
            URL_USER_INFO: 'https://clustuserpool.auth.us-east-1.amazoncognito.com/oauth2/userinfo',
            CLIENTE_ID: '4hm0vb3nre5frmvdklkclnkmt9',
            CLIENT_SECRET: 'j1b7ov4klfmij1f95lt7anqltb704p8b63hfu6v8faageilir0u',
            REDIRECT_URL: 'https://clust.dijkstra-ing.com/',
            RESPONSE_TYPE: 'code',
            SCOPE: ['openid','profile','email','aws.cognito.signin.user.admin'],
            BUTTON_CLASS: 'btn btn-warning btn-sm',
            SIGN_OUT_URL: 'https://clustuserpool.auth.us-east-1.amazoncognito.com/oidc/logout',
            SIGN_OUT_REDIRECT_URL: 'https://clust.dijkstra-ing.com/',
            REFRESH_TOKEN: 'https://clustuserpool.auth.us-east-1.amazoncognito.com/oauth2/token',
            USER_POOL_ID: 'us-east-1_Z0hXhJBy3',
        },
    },
};
