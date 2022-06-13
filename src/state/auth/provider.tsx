import React, {
  useEffect,
  useState,
  FC,
  useContext,
  createContext,
} from "react";
import { LoadingSpinner } from "../../components/loading";
import { useSpotifyUser, ISpotifyUser } from "../../api/spotify";

interface SpotifyProviderProps {
  token?: string;
  children: any;
}

interface SpotifyProviderContext {
  token?: string;
  user?: ISpotifyUser;
}

const SpotifyContext = createContext<SpotifyProviderContext>({
  token: undefined,
});

export const SpotifyProvider: FC<SpotifyProviderProps> = ({
  token,
  children,
}) => {
  const { data: user, error, loading } = useSpotifyUser();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log("ERROR", error);
    return <div>Error error</div>;
  }

  console.log("Loaded user", user);

  return (
    <SpotifyContext.Provider value={{ token, user }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  return useContext(SpotifyContext);
};
