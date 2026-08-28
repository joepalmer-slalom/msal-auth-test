import { ReactNode } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { msalInstance as msalInstanceAAD } from "./Authenticator";
import { tokenRequest as tokenRequestAAD } from "./authConfig";
import { msalConfig } from "./authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

type Props = {
    children: ReactNode;
};

// Function to get auto renewed access from Azure AD
export async function getAadAuthToken() {
  const account = msalInstanceAAD.getAllAccounts()[0];
  const request = {
    scopes: tokenRequestAAD.scopes,
    account: account,
  };

  try {
    // Traditionally, we are using refresh token to get new access token when it is expired.
    // MSAL(Microsoft Authentication Library) does not expose the refresh token directly due to security reasons.
    // Thus here we call acquireTokenSilent recommended by MSAL, it checks if there’s a valid access token.
    // If the access token is expired or not present,
    // MSAL automatically uses the stored refresh token to obtain a new access token.
    const response = await msalInstanceAAD.acquireTokenSilent(request);
    return response.accessToken;
  } catch (err) {
    if (err === "No current user") {
      throw err;
    }
  }
}

export const AADAuthenticator = ({ children }: Props) => {
    return (
        <MsalProvider instance={msalInstance}>
            <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>{children}</MsalAuthenticationTemplate>
        </MsalProvider>
    );
};
