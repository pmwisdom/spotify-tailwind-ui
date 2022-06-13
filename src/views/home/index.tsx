import { useSpotifyUser } from "../../api/spotify";
import { Button } from "../../components/button";
import "react-spotify-auth/dist/index.css";
import { useNavigate } from "react-router";

export const Home = () => {
  const { data: user, loading, error } = useSpotifyUser();
  const navigate = useNavigate();

  if (loading) {
    return null;
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!user) {
    return <div>User Not found</div>;
  }

  return (
    <div>
      <div>
        <img
          className="w-24 h-24 p-1 rounded-full"
          src={user.images?.[0]?.url}
          alt="Bordered avatar"
        />
      </div>
      <div>Name: {user.display_name}</div>
      <div>Email: {user.email}</div>
      <Button onClick={() => navigate("/playlists")}>Playlists</Button>
    </div>
  );
};
