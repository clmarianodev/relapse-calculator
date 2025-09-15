const display = document.getElementById("display");
const music = document.getElementById("music");
const music2 = document.getElementById("music2");
const music3 = document.getElementById("music3");
const music4 = document.getElementById("music4");

let expression = "";
let justEvaluated = false;

let waitingForSecond = false;

const lyricsSong1 = [
  ["Hindi na makalaya", 2300, 140],
  ["Dinadalaw mo 'ko bawat gabi", 1600, 120],
  ["Wala mang nakikita", 2000, 120],
  ["Haplos mo'y ramdam pa rin sa dilim", 1900, 90],
  ["Hindi na nananaginip", 2000, 110],
  ["Hindi na ma-makagising", 2000, 120],
  ["Pasindi na ng ilaw", 2200, 120],
  ["Minumulto na 'ko ng damdamin ko", 900, 120],
  ["Ng damdamin ko", 300, 100],
  ["Hindi mo ba ako lilisanin?", 1000, 100],
  ["hindi pa ba sapat pagpapahirap sa'kin?", 800, 120],
  ["hindi na ba ma-mamamayapa?", 1000, 120],
  ["hindi na ba ma-mamamayapa?", 800, 120],
  ["Hindi na makalaya", 3000, 120],
];

const lyricsSong2 = [
  ["...", 300, 100],
  ["Bakit ka nag-iba?", 5300, 140],
  ["Meron na bang iba?", 3900, 100],
  ["Sana sinabi mo", 1200, 130],
  ["Para 'di na umasang may tayo pa sa huli", 1200, 100],
  ["Sana sinabi mo", 1000, 130],
  ["Hahayaan naman kitang sumaya't umalis", 800, 100],
  ["Sana sinabi mo", 1000, 130],
  ["Para 'di na umasang may tayo pa sa huli", 1000, 90],
  ["Sana sinabi mo", 1000, 130],
  ["Hahayaan namang kita", 2000, 120],
];

const lyricsSong3 = [
  ["Woooooooooooooahh, ohh, ohh", 800, 140],
  ["Nandito ako", 2000, 150],
  ["umiibig sa'yo", 1800, 130],
  ["Kahit na", 1000, 140],
  ["nagdurugo", 1000, 140],
  ["ang puso 💔", 1500, 120],
  ["At kung sakaling", 1000, 120],
  ["iwanan ka niya", 3000, 110],
  ["'Wag kang mag-alala", 1000, 120],
  ["may nagmamahal sa'yo", 900, 120],
  ["Nandito ako", 3800, 130],
  ["ohh, ohh", 2000, 120],
];

function typeLyrics(lyrics, index = 0) {
  if (index >= lyrics.length) {
    display.value = "0";
    return;
  }

  const [word, delay, typingSpeed] = lyrics[index];
  let i = 0;
  display.value = "";

  const interval = setInterval(() => {
    display.value += word[i];
    i++;
    if (i >= word.length) {
      clearInterval(interval);
      setTimeout(() => typeLyrics(lyrics, index + 1), delay);
    }
  }, typingSpeed);
}

document.querySelectorAll(".buttons button").forEach((button) => {
  button.addEventListener("click", () => {
    const val = button.textContent;

    if (!isNaN(val) || val === ".") {
      if (waitingForSecond) {
        display.value = val;
        waitingForSecond = false;
      } else {
        display.value = display.value === "0" ? val : display.value + val;
      }
    } else if (val === "AC") {
      display.value = "0";
      num1 = null;
      operator = null;
    } else if (val === "+/-") {
      display.value = String(parseFloat(display.value) * -1);
    } else if (val === "%") {
      display.value = String(parseFloat(display.value) / 100);
    } else if (val === "√") {
      display.value = String(Math.sqrt(parseFloat(display.value)));
    } else if (val === "=") {
      if (operator && num1 !== null) {
        let num2 = parseFloat(display.value);
        let result;
        switch (operator) {
          case "+":
            result = num1 + num2;
            break;
          case "-":
            result = num1 - num2;
            break;
          case "×":
            result = num1 * num2;
            break;
          case "÷":
            result = num2 !== 0 ? num1 / num2 : 0;
            break;
        }
        display.value = result;

        if (num1 === 1 && num2 === 1 && operator === "+") {
          music.currentTime = 0;
          music.play();
          typeLyrics(lyricsSong1);
        }
        if (num1 === 2 && num2 === 2 && operator === "+") {
          music2.currentTime = 0;
          music2.play();
          typeLyrics(lyricsSong2);
        }

        if (num1 === 3 && num2 === 3 && operator === "+") {
          music3.currentTime = 0;
          music3.play();
          typeLyrics(lyricsSong3);
        }

        // if (num1 === 14) {
        //   music2.currentTime = 0;
        //   music2.play();
        //   typeLyrics(lyricsSong4);
        // }

        operator = null;
        num1 = null;
      }
    } else {
      num1 = parseFloat(display.value);
      operator = val;
      waitingForSecond = true;
    }
  });
});
