document.getElementById('submit-team').addEventListener('click', function() {
  const teamName = document.getElementById('team-name').value;
  const teamOwner = document.getElementById('team-owner').value;
  const qb1 = document.getElementById('qb1').value;
  const qb2 = document.getElementById('qb2').value;
  const qb3 = document.getElementById('qb3').value;
  const rb1 = document.getElementById('rb1').value;
  const rb2 = document.getElementById('rb2').value;
  const rb3 = document.getElementById('rb3').value;

  const teamData = {
    teamName: teamName,
    teamOwner: teamOwner,
    quarterbacks: [qb1, qb2, qb3],
    runningBacks: [rb1, rb2, rb3]
  };

  console.log(JSON.stringify(teamData));
});