import React, { useEffect, useState } from 'react'
import { getMatchesTeam } from '../openligaDb.js';

export default function TeamAnzeigen({
    leagueName, 
    leagueSaison,
    favoriteTeam
}) {

    const [teamSpielData, setTeamSpielData] = useState([]);

  useEffect(() => {
    const fetchSpiels = async () => {
      try {
        const teamSpielData = await getMatchesTeam(leagueName, leagueSaison , favoriteTeam);
        setTeamSpielData(teamSpielData); // Setze die geladenen Teams
      } catch (error) {
        console.error("Fehler beim Abrufen der Teams:", error);
      }
    };

    if (favoriteTeam) fetchSpiels(); // Nur laden, wenn ein Team ausgewählt ist
  }, [leagueName, leagueSaison, favoriteTeam]);


 // Bestimmt den Status des Spiels: gewonnen, verloren oder unentschieden
 const getGameStatus = (team1Points, team2Points) => {
    if (team1Points < team2Points) {
      return "lost"; // Team 1 hat verloren
    } else if (team1Points > team2Points) {
      return "won"; // Team 1 hat gewonnen
    } else {
      return "draw"; // Unentschieden
    }
  };



  return (
    <div>




      {/* Kompakte Anzeige der Spiele */}
      <div className="games-list">
      {teamSpielData && teamSpielData.length === 0 && <p>Keine Spiele gefunden.</p>}
      {teamSpielData?.map((game) => (

<div
  key={game.matchID}
  className={`game-box ${
    game.team1.teamName === favoriteTeam
      ? getGameStatus(
          game.matchResults[1]?.pointsTeam1,
          game.matchResults[1]?.pointsTeam2
        )
      : getGameStatus(
          game.matchResults[1]?.pointsTeam2,
          game.matchResults[1]?.pointsTeam1
        )
  }`}
>

            <div className="game-row">
              {/* Team 1 mit Flagge und Status */}
              <div className="team">
                <span>{game.group.groupName}</span>
                <img
                  className="team-logo"
                  src={game.team1.teamIconUrl}
                  alt={game.team1.teamName}
                />
                <span>{game.team1.teamName}</span>
                <span>{game.matchResults[1]?.pointsTeam1 ?? "-"}</span>
              </div>
              {/* VS */}
              <span className="vs">vs</span>
              {/* Team 2 mit Flagge und Status */}
              <div className="team">
                <span>{game.matchResults[1]?.pointsTeam2 ?? "-"}</span>
                <span>{game.team2.teamName}</span>
                <img
                  className="team-logo"
                  src={game.team2.teamIconUrl}
                  alt={game.team2.teamName}
                />
              </div>
            </div>

            {/* Endergebnis anzeigen */}
        

            {/* Tore anzeigen */}
         
          </div>
        ))}
      </div>













    </div>
  )
}
