import React, { FC } from "react";
import {
  useSpotifyPlaylist,
  ISpotifyTrackDetails,
} from "../../api/spotify/request-hooks";
import { LoadingSpinner } from "../loading";
import { Table } from "../table";

export const PlaylistDetails: FC<{ playlistId: string }> = ({ playlistId }) => {
  const {
    data: playlistDetails,
    loading,
    error,
  } = useSpotifyPlaylist({ playlistId });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!playlistDetails) {
    return <div></div>;
  }

  console.log("DATA", playlistDetails);

  return (
    <Table<ISpotifyTrackDetails>
      data={playlistDetails.tracks.items}
      columns={[
        {
          header: "",
          renderer: (data) => {
            return (
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
            );
          },
        },
        {
          header: "Name",
          renderer: (data) => {
            return <td className="px-6 py-4">{data.track.name}</td>;
          },
        },
        {
          header: "Artist",
          renderer: (data) => {
            return (
              <td className="px-6 py-4">{data.track.artists?.[0].name}</td>
            );
          },
        },
      ]}
    />
  );
};
