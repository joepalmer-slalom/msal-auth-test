import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_AZURE_AAD_APP_CLIENT_ID ?? "",
        authority: process.env.REACT_APP_AZURE_AAD_AUTHORITY ?? "",
        redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI ?? ""
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: any, message: string, containsPii: boolean) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            }
        }
    }
};

export const apiConfig = {
    aadScopes: [
        `${process.env.REACT_APP_AZURE_AAD_APP_FUNCTION_SCOPE_URI}/${process.env.REACT_APP_AZURE_AAD_APP_READ_SCOPE}`,
        `${process.env.REACT_APP_AZURE_AAD_APP_FUNCTION_SCOPE_URI}/${process.env.REACT_APP_AZURE_AAD_APP_WRITE_SCOPE}`
    ]
};

export const tokenRequest = {
    scopes: [...apiConfig.aadScopes],
    forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
};

/**
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ["openid", "offline_access", ...apiConfig.aadScopes]
};
