import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSpotifyPlaylists } from "../../api/spotify/request-hooks";
import { Table } from "../table";
import { LoadingSpinner } from "../loading";

export const Playlists: FC<{ userId: string }> = ({ userId }) => {
  const { data: playlists, loading } = useSpotifyPlaylists({
    userId,
  });
  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!playlists) {
    return <div></div>;
  }

  return (
    <Table<{ id: string; name: string }>
      data={playlists.items}
      columns={[
        {
          header: "name",
          renderer: (data) => {
            return (
              <td
                onClick={() => navigate(`/playlists/${data.id}`)}
                className="px-6 py-4 cursor-pointer"
              >
                {data.name}
              </td>
            );
          },
        },
      ]}
    />
  );
};
