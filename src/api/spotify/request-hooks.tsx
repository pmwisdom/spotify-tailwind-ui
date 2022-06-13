import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSpotify } from "../../state/auth";
// @ts-expect-error
import Cookies from "js-cookie";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

interface UseSpotifyFetchOptions {
  method: string;
  path: string;
}

interface UseSpotifyFetchValue<Data extends unknown> {
  loading: boolean;
  data?: Data;
  error?: Error;
}

interface ISpotifyListResponse<Data extends unknown> {
  items: Array<Data>;
  next?: string;
  previous?: string;
  limit: number;
  offset: number;
  total: number;
}

export interface ISpotifyTrack {
  name: string;
  id: string;
  artists: ISpotifyArtist[];
}

export interface ISpotifyArtist {
  name: string;
}

export interface ISpotifyTrackDetails {
  track: ISpotifyTrack;
}

export interface ISpotifyPlaylistResponse {
  name: string;
  description: string;
  tracks: ISpotifyListResponse<ISpotifyTrackDetails>;
}

export interface ISpotifyUser {
  email: string;
  display_name: string;
  images: Array<{ url: string }>;
  id: string;
}

export const useSpotifyFetch = <Data extends unknown>({
  method,
  path,
}: UseSpotifyFetchOptions): UseSpotifyFetchValue<Data> => {
  const { token } = useSpotify();
  const [data, setData] = useState<undefined | Data>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method,
          headers: {
            Authorization: `Bearer ${token || Cookies.get("spotifyAuthToken")}`,
          },
          url: `${SPOTIFY_BASE_URL}${path}`,
        });

        setData(response.data as Data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }

      setLoading(false);
    })();
  }, []);

  return { data, loading, error };
};

export const useSpotifyUser = () => {
  return useSpotifyFetch<ISpotifyUser>({
    method: "GET",
    path: "/me",
  });
};

export const useSpotifyPlaylists = ({ userId }: { userId: string }) => {
  return useSpotifyFetch<ISpotifyListResponse<{ id: string; name: string }>>({
    method: "GET",
    path: `/users/${userId}/playlists`,
  });
};

export const useSpotifyPlaylist = ({ playlistId }: { playlistId: string }) => {
  return useSpotifyFetch<ISpotifyPlaylistResponse>({
    method: "GET",
    path: `/playlists/${playlistId}`,
  });
};
