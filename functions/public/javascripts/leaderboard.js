document.getElementById('leaderboard-selector').addEventListener('change', async function() {
  const selectedValue = document.getElementById('leaderboard-select').value;
  if (selectedValue === 'players') {
    const response = await fetch('https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/players?view=mRoster');
    const data = await response.json();
    console.log("Player data:", data);
    // const players = data.items.map(player => {
    //   return {
    //     name: player.playerPoolEntry.player.fullName,
    //     score: player.playerPoolEntry.appliedStatTotal
    //   };
    // });
    // const sortedPlayers = players.sort((a, b) => b.score - a.score);
    // const leaderboardList = document.getElementById('leaderboard-list');
    // leaderboardList.innerHTML = '';
    // sortedPlayers.forEach(player => {
    //   const listItem = document.createElement('li');
    //   listItem.textContent = `${player.name} - ${player.score}`;
    //   leaderboardList.appendChild(listItem);
    // });
  }
});
