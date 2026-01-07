import React, { useState, useEffect } from "react";
import { getMatchesTeam } from "../openligaDb.js";
import TeamWahlen from "./TeamWahlen.jsx";
import TeamAnzeigen from "./TeamAnzeigen.jsx";
import TeamUrl from "./TeamUrl.jsx";
import TeamTable from "./TeamTable.jsx";

export default function TeamFinder3() {
  const [games, setGames] = useState([]);
  const [team, setTeam] = useState('Werder Bremen');
  const [league, setLeague] = useState("bl1");

  const handleTeamChange = ({ league, team }) => {
    if (league) setLeague(league);
    if (team) setTeam(team);
  };

  useEffect(() => {
    const fetchGames = async () => {
      if (!team || !league) return;
      try {
        const data = await getMatchesTeam(league, 2025, team);
        setGames(data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Spiele:", error);
      }
    };

    fetchGames();
  }, [team, league]);

  return (
    <div className="search-page">
      
      <TeamWahlen 
        leagueName={league}
        leagueSaison="2025"
        selectedTeam={team}
        onTeamChange={handleTeamChange}
      />

      <TeamTable 
        leagueName={league}
        leagueSaison="2025"
        favoriteTeam={team}
      />

      <TeamAnzeigen 
        leagueName={league}
        leagueSaison="2025"
        favoriteTeam={team}
      />

      <TeamUrl favoriteTeam={team} />
    </div>
  );
}
