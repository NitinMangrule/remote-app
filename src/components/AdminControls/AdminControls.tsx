interface AdminControlsProps {
  newSong: { title: string; artist: string; album: string };
  setNewSong: (song: { title: string; artist: string; album: string }) => void;
  addSong: () => void;
}

function AdminControls({ newSong, setNewSong, addSong }: AdminControlsProps) {
  return (
    <div className="admin-controls flex flex-col sm:flex-row gap-4">
      <input
        className="border border-gray-300 p-2 rounded-md w-full"
        placeholder="Title"
        value={newSong.title}
        onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
      />
      <input
        className="border border-gray-300 p-2 rounded-md w-full"
        placeholder="Artist"
        value={newSong.artist}
        onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
      />
      <input
        className="border border-gray-300 p-2 rounded-md w-full"
        placeholder="Album"
        value={newSong.album}
        onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
      />
      <button
        className="bg-red-500 text-white p-2 rounded-md mt-2"
        onClick={addSong}
      >
        Add Song
      </button>
    </div>
  );
}
export default AdminControls;
