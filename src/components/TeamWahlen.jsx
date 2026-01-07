import React, { useEffect, useState } from "react";
import { getAllTeams } from "../openligaDb.js";

export default function TeamWahlen({ leagueName, leagueSaison, selectedTeam, onTeamChange }) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        if (!leagueName || !leagueSaison) return;
        const teamsData = await getAllTeams(leagueName, leagueSaison);
        teamsData.sort((a, b) => a-b); // Alphabetische Sortierung
        setTeams(teamsData);
      } catch (error) {
        console.error("Fehler beim Abrufen der Teams:", error);
      }
    };

    fetchTeams();
  }, [leagueName, leagueSaison]);

  return (
    <div>
 {leagueName === 'bl1' ? (
  <h3>1. Fußball-Bundesliga 2025/2026</h3>
) : (
  <h3>2. Fußball-Bundesliga 2025/2026</h3>
)}
<br />



      <label htmlFor="league">Liga auswählen:</label>
      <select id="league" value={leagueName || ""} onChange={(e) => onTeamChange({ league: e.target.value })}>
        <option value="">Bitte eine Liga auswählen</option>
        <option value="bl1">1. Fußball-Bundesliga 2025/2026</option>
        <option value="bl2">2. Fußball-Bundesliga 2025/2026</option>
      </select>

      <br />

      <label htmlFor="team">Team auswählen:</label>
      <select id="team" value={selectedTeam || ""} onChange={(e) => onTeamChange({ team: e.target.value })} disabled={!leagueName}>
        <option value="">Bitte ein Team auswählen</option>
        {teams.map((team) => (
          <option key={team.teamId} value={team.teamName}>
            {team.teamName}
          </option>
        ))}
      </select>
    </div>
  );
}
