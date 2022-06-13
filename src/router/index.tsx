import React, { FC } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { Home } from "../views/home";
import { AuthProvider } from "../state/auth";
import { PlaylistDetails } from "../components/playlist";
import { PlaylistsView } from "../views/playlists";

export const PlaylistDetailsRoute: FC = () => {
  const params = useParams();

  return <PlaylistDetails playlistId={params.id || ""} />;
};

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<PlaylistsView />} />
          <Route path="/playlists/:id" element={<PlaylistDetailsRoute />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
