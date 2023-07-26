var docById = function (id) { return document.getElementById(id); };

docById('btnDigital').addEventListener('click', () => { startDigital() });
docById('btnAnalog').addEventListener('click', () => { startAnalog() });
docById('digitalArea').addEventListener('click', () => { rollDice() });
docById('btnReset').addEventListener('click', () => { reset() });

var btnNums = document.getElementsByClassName("btn-num");
for (var i = 0; i < btnNums.length; i++) {
   btnNums[i].addEventListener('click', setAnalogNum, false);
   btnNums[i].myParam = btnNums[i].innerText;
}

function handleCellClick(index) {
  console.log(docById("btnNum" + (index + 2)));
}

let historyData = [];

function startDigital() {
  docById("startArea").style.display = "none";
  docById("digitalArea").style.display = "block";
  docById("statsArea").style.display = "block";
  rollDice();
}

function startAnalog() {
  docById("startArea").style.display = "none";
  docById("analogArea").style.display = "block";
  docById("statsArea").style.display = "block";
}

function reset() {
  historyData = [];
  docById("startArea").style.display = "block";
  docById("digitalArea").style.display = "none";
  docById("analogArea").style.display = "none";
  docById("statsArea").style.display = "none";
  updateChart();
}

function setAnalogNum(evt) {
  var sum = parseInt(evt.currentTarget.myParam,10);
  const numBtn = docById("btnNum" + sum);
  numBtn.classList.add('shakeNum');
  setTimeout(() => {
    setAnalogNumEnd(sum);
  }, 750);
}

function setAnalogNumEnd(sum) {
  addToHistory(sum);
  updateChart();
  const numBtn = docById("btnNum" + sum);
  numBtn.classList.remove('shakeNum');
}

function rollDice() {
  displayDiceImages(0, 0);
  setTimeout(() => {
    rollDiceEnd();
  }, 750);
}

function rollDiceEnd() {
  const result1 = Math.floor(Math.random() * 6) + 1;
  const result2 = Math.floor(Math.random() * 6) + 1;
  const sum = result1 + result2;

  displayDiceImages(result1, result2);

  addToHistory(sum);
  updateChart();
}

function displayDiceImages(result1, result2) {
  displayDiceImage(1, result1)
  displayDiceImage(2, result2)
}

function displayDiceImage(index, result) {
  const diceImage = docById("diceImage" + index);
  if (result === 0) {
    diceImage.classList.add("shake");
  } else {
    diceImage.classList.remove("shake");
  }

  diceImage.src = `./images/wuerfel${result}.png`;
}

function addToHistory(sum) {
  historyData.push(sum);
  docById("counter").innerText = `${historyData.length} ${historyData.length === 1 ? "Wurf" : "Würfe"}`;
}

function updateChart() {
  const historyChart = docById("historyChart").getContext("2d");
  const labels = Array.from({ length: 11 }, (_, i) => i + 2); // Possible sums from 2 to 12
  const data = labels.map(sum => historyData.filter(item => item === sum).length);

  if (window.myBarChart) {
    window.myBarChart.destroy();
  }

  window.myBarChart = new Chart(historyChart, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Historie",
        data: data,
        backgroundColor: "rgba(31, 102, 216, 1)",
        borderColor: "rgba(31, 102, 216, 1)",
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          precision: 0,
          suggestedMax: Math.max(...data) + 1
        }
      },
      animation: {
        duration: 0
      },
      plugins: {
        legend: {
          display: false // Hide the legend
        }
      }
    }
  });
}