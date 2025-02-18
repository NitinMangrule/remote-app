import { useState } from "react";
import Modal from "../Modal/Modal";
import { Song } from "../../types";
import SearchFilterSection from "../SearchFilterSection/SearchFilterSection";
import SongList from "../SongList/SongList";
import AdminControls from "../AdminControls/AdminControls";
import { SONGS_DATA } from "../../constants";

interface MusicLibraryProps {
  userRole?: { role: string };
}

function MusicLibrary(props: MusicLibraryProps) {
  const { userRole } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [songs, setSongs] = useState(SONGS_DATA);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<keyof Song>("title");
  const [newSong, setNewSong] = useState({ title: "", artist: "", album: "" });

  const filteredSongs = songs
    .filter((song) =>
      Object.values(song).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(filter.toLowerCase())
      )
    )
    .sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));

  const addSong = () => {
    if (newSong.title && newSong.artist && newSong.album) {
      setSongs([...songs, { id: Date.now(), ...newSong }]);
      setNewSong({ title: "", artist: "", album: "" });
    }
    setIsModalOpen(false);
  };

  const removeSong = (id: number) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  if (userRole?.role !== "admin" && userRole?.role !== "user") {
    return (
      <div className="container mx-auto p-4 mt-2 flex justify-center items-center h-screen">
        <p className="text-xl mt-2 mb-4 text-center">Please login to proceed</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-2">
      <h2 className="text-3xl text-blue-500 font-bold mt-2 mb-4">
        Music Library
      </h2>
      <SearchFilterSection
        filter={filter}
        setFilter={setFilter}
        sortKey={sortKey}
        setSortKey={setSortKey}
        userRole={userRole}
        setIsModalOpen={setIsModalOpen}
      />
      <SongList
        songs={filteredSongs}
        userRole={userRole}
        removeSong={removeSong}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AdminControls
          newSong={newSong}
          setNewSong={setNewSong}
          addSong={addSong}
        />
      </Modal>
    </div>
  );
}

export default MusicLibrary;
