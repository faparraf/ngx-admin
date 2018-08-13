const BASEPATH = 'https://riopiwbvwh.execute-api.us-east-1.amazonaws.com/Test/';
// const BASEPATH_PROD = 'https://riopiwbvwh.execute-api.us-east-1.amazonaws.com/production/'

export const Config = {
    PROD: {
        BASEPATH: BASEPATH,
        ORGANIZATION: BASEPATH + 'organization/',
        ASSETS: '/asset',
        INTERATION: BASEPATH + 'iteration',
        ASSET: BASEPATH + '/asset/',
        ASSET_ITERACION: BASEPATH + 'iteration/getmerge',
        CLUSTERIZACION: BASEPATH + 'cluster',
    },
    LOCAL: {
        GRAPHQL:'https://ukx5ybfbxnfcni3mfaociyy3je.appsync-api.us-east-1.amazonaws.com/graphql',
        KEY:'da2-ciau7bbyundm3okwhuldg3tzvi',
        BASEPATH: BASEPATH,
        ORGANIZATION: BASEPATH + 'organization/',
        ASSET_ITERACION: BASEPATH + 'iteration/getmerge',
        CLUSTERIZACION: BASEPATH + 'cluster',
        TOKEN: {
            AUTORIZATION_URL: 'https://clustuserpool.auth.us-east-1.amazoncognito.com/oauth2/authorize',
            URL_USER_INFO: 'https://clustuserpool.auth.us-east-1.amazoncognito.com/oauth2/userinfo',
            CLIENTE_ID: '4hm0vb3nre5frmvdklkclnkmt9',
            CLIENT_SECRET: 'j1b7ov4klfmij1f95lt7anqltb704p8b63hfu6v8faageilir0u',
            REDIRECT_URL: 'https://clust.dijkstra-ing.com/',
            RESPONSE_TYPE: 'code',
            SCOPE: 'openid+profile+email+aws.cognito.signin.user.admin',
            BUTTON_CLASS: 'btn btn-warning btn-sm',
            SIGN_OUT_URL: 'https://clustuserpool.auth.us-east-1.amazoncognito.com/logout',
            SIGN_OUT_REDIRECT_URL: 'https://clust.dijkstra-ing.com/',
            REFRESH_TOKEN: 'https://clustuserpool.auth.us-east-1.amazoncognito.com/oauth2/token',
        },
    },
};
