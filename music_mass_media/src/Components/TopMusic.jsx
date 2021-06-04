import { useEffect, useState } from "react";

export function TopChart(props) {
  const [songList, setSongList] = useState([]);

  async function LoadSongs() {
    let response = await fetch("http://localhost:8000/api/song", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      let listSong = await response.json();
      console.log(listSong);
      setSongList(listSong);
    }
  }

  useEffect(() => {
    LoadSongs();
  }, []);

  return (
    <div className="main_wrapper">
      <h3>Top Chart</h3>
      <table className="highlight">
        <thead>
          <tr>
            <th width="30%">Image</th>
            <th>Song</th>
            <th>Artist</th>
            <th style={{ width: "5%" }}>Duration</th>
          </tr>
        </thead>
        <tbody>
          {songList?.map((row) => (
            <tr>
              <td>
                <img width="10%" src={row.image} alt="#" />
              </td>
              <td>{row.name}</td>
              <td>{row.artist.username}</td>
              <td>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
