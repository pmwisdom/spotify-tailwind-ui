import React, { FC } from "react";
import { Playlists } from "../../components/playlists";
import { useSpotify } from "../../state/auth";

export const PlaylistsView = () => {
  const { user } = useSpotify();

  console.log("USER");

  if (!user) {
    return null;
  }

  return <Playlists userId={user?.id} />;
};
