import { Song } from "../../types";

function SongList({
  songs,
  userRole,
  removeSong,
}: {
  songs: Song[];
  userRole: { role: string };
  removeSong: (id: number) => void;
}) {
  return (
    <div className="min-h-screen grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-10">
      {songs.length > 0 ? (
        songs?.map((song) => (
          <div
            key={song.id}
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 relative transform transition duration-500 hover:scale-105"
          >
            <h3 className="text-lg font-semibold">{song.title}</h3>
            <p className="text-gray-600">by {song.artist}</p>
            <p className="text-gray-600">Album: {song.album}</p>
            {userRole.role === "admin" && (
              <button
                className="absolute top-2 right-2 text-red-500"
                onClick={() => removeSong(song.id)}
              >
                &times;
              </button>
            )}
          </div>
        ))
      ) : (
        <div>No song available</div>
      )}
    </div>
  );
}

export default SongList;
