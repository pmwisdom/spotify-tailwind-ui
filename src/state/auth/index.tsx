// @ts-ignore
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import React, { useState, FC } from "react";
// @ts-ignore
import Cookies from "js-cookie";
import { SpotifyProvider } from "./provider";

export const AuthProvider: FC<{ children: any }> = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));

  return (
    <div className="app">
      {token ? (
        <SpotifyProvider token={token}>{children}</SpotifyProvider>
      ) : (
        <SpotifyAuth
          redirectUri="http://localhost:3000/callback"
          clientID="86d17715b0244e85919998f1db01c67c"
          scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
          onAccessToken={(token: any) => {
            setToken(token);
          }}
        />
      )}
    </div>
  );
};

export * from "./provider";
