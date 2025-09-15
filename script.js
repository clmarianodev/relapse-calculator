const display = document.getElementById("display");
const music = document.getElementById("music");
const music2 = document.getElementById("music2");
const music3 = document.getElementById("music3");
const music4 = document.getElementById("music4");

let expression = "";
let justEvaluated = false;
let isTypingLyrics = false;

const lyricsSong1 = [
  ["Hindi na ", 700, 100],
  ["makalaya", 2000, 180],
  ["Dinadalaw mo 'ko bawat gabi", 1600, 100],
  ["Wala mang", 500, 85],
  ["nakikita", 2000, 150],
  ["Haplos mo'y ramdam pa rin sa dilim", 1500, 90],
  ["Hindi na", 600, 85],
  ["nananaginip", 1500, 160],
  ["Hindi na", 600, 85],
  ["ma-makagising", 1400, 160],
  ["Pasindi", 600, 85],
  ["na ng ilaw", 2200, 120],
  ["Minumulto na 'ko ng damdamin ko", 900, 100],
  ["Ng damdamin ko", 800, 85],
  ["Hindi mo ba ako lilisanin?", 1200, 100],
  ["hindi pa ba sapat pagpapahirap sa'kin?", 500, 120],
  ["hindi na ba ma-mamamayapa?", 1000, 120],
  ["hindi na ba ma-mamamayapa?", 800, 120],
  ["Hindi na makalaya", 2000, 130],
];

const lyricsSong2 = [
  ["...", 300, 100],
  ["Bakit ka nag-iba?", 5300, 140],
  ["Meron na bang iba?", 4100, 100],
  ["Sana sinabi mo", 1000, 130],
  ["Para 'di na umasang may tayo pa sa huli", 900, 90],
  ["Sana sinabi mo", 1000, 130],
  ["Hahayaan naman kitang sumaya't umalis", 700, 100],
  ["Sana sinabi mo", 1000, 130],
  ["Para 'di na umasang may tayo pa sa huli", 800, 90],
  ["Sana sinabi mo", 1000, 130],
  ["Hahayaan namang kita", 2000, 120],
];

const lyricsSong3 = [
  ["Woooooooooooooahh, ohh, ohh", 600, 140],
  ["Nandito ako", 2000, 160],
  ["umiibig sa'yo", 1400, 140],
  ["Kahit na", 1000, 120],
  ["nagdurugo", 1000, 130],
  ["ang puso 💔", 1500, 120],
  ["At kung sakaling", 1000, 105],
  ["iwanan ka niya", 2800, 130],
  ["'Wag kang mag-alala", 1500, 120],
  ["may nagmamahal sa'yo", 800, 120],
  ["Nandito ako", 3500, 140],
  ["ohh, ohh", 2000, 120],
];

function typeLyrics(lyrics) {
  let index = 0;
  isTypingLyrics = true;

  function showNext() {
    if (index < lyrics.length) {
      const [line, delay, speed] = lyrics[index];
      let charIndex = 0;
      display.value = "";
      function typeChar() {
        if (charIndex < line.length) {
          display.value += line[charIndex];
          charIndex++;
          setTimeout(typeChar, speed);
        } else {
          index++;
          setTimeout(showNext, delay);
        }
      }
      typeChar();
    } else {
      display.value = "0";
      expression = "";
      justEvaluated = false;
      isTypingLyrics = false;
    }
  }

  showNext();
}

document.querySelectorAll(".buttons button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.textContent;

    if (isTypingLyrics) return;

    if (!isNaN(val) || val === ".") {
      if (display.value === "0" || justEvaluated) {
        display.value = val;
        justEvaluated = false;
      } else {
        display.value += val;
      }
      expression += val;
    } else if (["+", "-", "×", "÷"].includes(val)) {
      display.value += val;
      expression += val === "×" ? "*" : val === "÷" ? "/" : val;
      justEvaluated = false;
    } else if (val === "AC") {
      display.value = "0";
      expression = "";
      justEvaluated = false;
    } else if (val === "+/-") {
      if (display.value.startsWith("-")) {
        display.value = display.value.slice(1);
      } else {
        display.value = "-" + display.value;
      }
      expression = display.value;
    } else if (val === "%") {
      try {
        const result = eval(expression + "/100");
        display.value = result;
        expression = String(result);
      } catch {
        display.value = "Error";
        expression = "";
      }
    } else if (val === "√") {
      try {
        const result = Math.sqrt(eval(expression));
        display.value = result;
        expression = String(result);
      } catch {
        display.value = "Error";
        expression = "";
      }
    } else if (val === "=") {
      try {
        const result = eval(expression);
        display.value = result;
        expression = String(result);
        justEvaluated = true;

        if (expression === "2") {
          music.currentTime = 0;
          music.play();
          typeLyrics(lyricsSong1);
        }
        if (expression === "4") {
          music2.currentTime = 0;
          music2.play();
          typeLyrics(lyricsSong2);
        }
        if (expression === "6") {
          music3.currentTime = 0;
          music3.play();
          typeLyrics(lyricsSong3);
        }
      } catch {
        display.value = "Error";
        expression = "";
      }
    }
  });
});
