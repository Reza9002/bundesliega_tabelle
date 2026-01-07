import axios from 'redaxios';

// Axios-Instanz erstellen
export const fetchOpenligaDb = axios.create({
  baseURL: 'https://api.openligadb.de/getmatchdata',
  headers: {
    // Authorization: 'Bearer YOUR_API_KEY', // Optional: Für zukünftige API-Versionen
  },
  timeout: 5000, // Timeout: 5 Sekunden
});

// Beispielanfrage
export const getMatches = async (league = 'bl1', season = 2024, matchday = 1) => {
  try {
    const response = await fetchOpenligaDb.get(`/${league}/${season}/${matchday}`);
    return response.data; // Liefert die Daten der Spiele
  } catch (error) {
    console.error('Fehler bei der API-Anfrage:', error.message);
    throw error;
  }
};

// Funktion zum Abrufen der Spiele eines bestimmten Teams
// export const getMatchesTeam = async (league = 'bl1', season = 2024, team = 'Bayer Leverkusen') => {
//   try {
//     const response = await fetchOpenligaDb.get(`/${league}/${season}/${team}`);
//     return response.data; // Liefert die Daten der Spiele
//   } catch (error) {
//     console.error('Fehler bei der API-Anfrage:', error.message);
//     throw error;
//   }
// };


// Funktion zum Abrufen der Spiele eines bestimmten Teams

export async function getMatchesTeam(leagueName , leagueSaison , teamName) {

  try {
    const response = await fetch(`https://api.openligadb.de/getmatchdata/${leagueName}/${leagueSaison}/${teamName}`);
   
    if(!response.ok){
      throw new Error(`Fehler beim Abrufen der Teams: ${response.status} ${response.statusText}`) 
    }
  
    const favoriteTeamSpiels = await response.json();
    return favoriteTeamSpiels;
    
  } catch (error) {
    console.error("Fehler in getAllTeams:", error.message);
    throw error; // Fehler weitergeben, damit der Aufrufer darauf reagieren kann
  
  }
  } 













// Funktion zum Abrufen der Teams eines bestimmten Liga +saision

export async function getAllTeams(leagueName , leagueSaison) {

try {
  const response = await fetch(`https://api.openligadb.de/getavailableteams/${leagueName}/${leagueSaison}`);

  if(!response.ok){
    throw new Error(`Fehler beim Abrufen der Teams: ${response.status} ${response.statusText}`) 
  }

  const allTeams = await response.json();
  return allTeams;
  
} catch (error) {
  console.error("Fehler in getAllTeams:", error.message);
  throw error; // Fehler weitergeben, damit der Aufrufer darauf reagieren kann

}
} 



// Funktion zum Abrufen der Tabelle

export async function getTable(leagueName , leagueSaison) {

  try {
    const response = await fetch(`https://api.openligadb.de/getbltable/${leagueName}/${leagueSaison}`);
  
    if(!response.ok){
      throw new Error(`Fehler beim Abrufen der Teams: ${response.status} ${response.statusText}`) 
    }
  
    const allTeams = await response.json();
    return allTeams;
    
  } catch (error) {
    console.error("Fehler in getAllTeams:", error.message);
    throw error; // Fehler weitergeben, damit der Aufrufer darauf reagieren kann
  
  }
  } 



  // Funktion zum Abrufen der Liga

export async function getLeagues() {

  try {
    const response = await fetch('https://api.openligadb.de/getavailableleagues');
  
    if(!response.ok){
      throw new Error(`Fehler beim Abrufen der Teams: ${response.status} ${response.statusText}`) 
    }
  
    const allLeagues = await response.json();
    return allLeagues;
    
  } catch (error) {
    console.error("Fehler in getAllTeams:", error.message);
    throw error; // Fehler weitergeben, damit der Aufrufer darauf reagieren kann
  
  }
  } 