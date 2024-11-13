function startGame() {
    document.getElementById("container").style.display = "block";
    document.querySelector(".start-btn").style.display = "none";
}

function save() {
    const player1Name = document.getElementById('name1').value;
    const player2Name = document.getElementById('name2').value;

    if (!player1Name || !player2Name) {
        Swal.fire('Error', 'Please enter both player names before starting the toss.', 'error');
        return;
    }

    document.getElementById('player1').innerHTML = player1Name;
    document.getElementById('player2').innerHTML = player2Name;

    tossStart(player1Name, player2Name);
}

async function tossStart(player1, player2) {
    const { value: player1Choice } = await Swal.fire({
        title: `${player1}, choose Head or Tail`,
        input: 'select',
        inputOptions: {
            head: 'Head',
            tail: 'Tail'
        },
        inputPlaceholder: 'Select Head or Tail',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to choose Head or Tail!';
            }
        }
    });

    if (player1Choice) {
        let player2Choice = player1Choice === 'head' ? 'tail' : 'head';

        document.getElementById("player1Choice").innerHTML = `<div style='background-color:#cf7200; color:white; padding:2px; border-radius:2px;'>${player1} chose: ${player1Choice} </div>`;
        document.getElementById("player2Choice").innerHTML = `<div style='background-color:#cf7200; color:white; padding:2px; border-radius:2px;'>${player2} gets: ${player2Choice} </div>`;

        document.getElementById("winner").innerHTML = `<img width='80px' height='80px' src="assets/flip.gif" id="coinFlip" alt="Coin is flipping...">`;

        setTimeout(() => {
            let tossResult = Math.random() > 0.5 ? 'head' : 'tail';
            let winner = tossResult === player1Choice ? player1 : player2;

            document.getElementById("winner").innerHTML = `${winner} won! The result is ${tossResult} <img src="assets/joy.gif" id="victory">`;
        }, 2000);
    }
}
