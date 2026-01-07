import React, { useEffect, useState } from 'react';
import { getTable } from '../openligaDb.js';

export default function TeamTable({ leagueName, leagueSaison, favoriteTeam }) {
  const [teamInTable, setTeamInTable] = useState([]);

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const tableData = await getTable(leagueName, leagueSaison);
        setTeamInTable(tableData); // Setze die geladene Tabelle
      } catch (error) {
        console.error("Fehler beim Abrufen der Tabelle:", error);
      }
    };

    fetchTable(); // Tabelle abrufen
  }, [leagueName, leagueSaison]);

  const myTeam = teamInTable.find(
    (team) => team.teamName.toLowerCase() === favoriteTeam.toLowerCase()
  );
  
  console.log(myTeam);
  

  return (
    <div>
      {myTeam ? 
      (
        <div key={myTeam.teamInfoId} className="game">
          <div className="team-tabel">
         
            
            <div className="team-details">
              {/* Jede Zeile als eigenes div mit der Klasse "tabelle-row" */}
              <div >
                <img
              className="team-logo-tabelle"
              src={myTeam.teamIconUrl}
              alt={myTeam.teamName}
            />
              </div>

    

             
              <div className="tabelle-row">
                <span>Gewonnene </span>
                <span>{myTeam.won}</span>
              </div>
              <div className="tabelle-row">
                <span>Unentschieden</span>
                <span>{myTeam.draw}</span>
              </div>
              <div className="tabelle-row">
                <span>Verlorene </span>
                <span>{myTeam.lost}</span>
              </div>

              <div className="tabelle-row">
                <span>Tordifferenz</span>
                <span>{myTeam.goalDiff}</span>
              </div>
              <div className="tabelle-row">
                <span>Punkte</span>
                <span>{myTeam.points}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Team nicht in der Tabelle gefunden.</p>
      )}
    </div>
  );
}