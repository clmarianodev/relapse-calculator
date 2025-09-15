const display = document.getElementById("display");
const music = document.getElementById("music");
const music2 = document.getElementById("music2");
const music3 = document.getElementById("music3");
const music4 = document.getElementById("music4");

let expression = "";
let justEvaluated = false;
let isTypingLyrics = false; // prevent mixing input with lyrics

// SONG LYRICS
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

// Typewriter effect for lyrics inside calculator display
function typeLyrics(lyrics) {
  let index = 0;
  isTypingLyrics = true; // lock calculator while typing

  function showNext() {
    if (index < lyrics.length) {
      const [line, delay, speed] = lyrics[index];
      let charIndex = 0;
      display.value = ""; // clear before new line

      function typeChar() {
        if (charIndex < line.length) {
          display.value += line[charIndex];
          charIndex++;
          setTimeout(typeChar, speed); // type each char
        } else {
          index++;
          setTimeout(showNext, delay); // move to next line
        }
      }
      typeChar();
    } else {
      // when done, reset display to calculator mode
      display.value = "0";
      expression = "";
      justEvaluated = false;
      isTypingLyrics = false;
    }
  }

  showNext();
}

// Calculator buttons logic
document.querySelectorAll(".buttons button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.textContent;

    if (isTypingLyrics) return; // ignore clicks during lyrics

    // Numbers & decimal
    if (!isNaN(val) || val === ".") {
      if (display.value === "0" || justEvaluated) {
        display.value = val;
        justEvaluated = false;
      } else {
        display.value += val;
      }
      expression += val;

      // Operators
    } else if (["+", "-", "×", "÷"].includes(val)) {
      display.value += val;
      expression += val === "×" ? "*" : val === "÷" ? "/" : val;
      justEvaluated = false;

      // Clear
    } else if (val === "AC") {
      display.value = "0";
      expression = "";
      justEvaluated = false;

      // Sign toggle
    } else if (val === "+/-") {
      if (display.value.startsWith("-")) {
        display.value = display.value.slice(1);
      } else {
        display.value = "-" + display.value;
      }
      expression = display.value;

      // Percent
    } else if (val === "%") {
      try {
        const result = eval(expression + "/100");
        display.value = result;
        expression = String(result);
      } catch {
        display.value = "Error";
        expression = "";
      }

      // Square root
    } else if (val === "√") {
      try {
        const result = Math.sqrt(eval(expression));
        display.value = result;
        expression = String(result);
      } catch {
        display.value = "Error";
        expression = "";
      }

      // Evaluate
    } else if (val === "=") {
      try {
        const result = eval(expression);
        display.value = result;
        expression = String(result);
        justEvaluated = true;

        // 🎵 Song triggers
        if (expression === "2") {
          // 1+1
          music.currentTime = 0;
          music.play();
          typeLyrics(lyricsSong1);
        }
        if (expression === "4") {
          // 2+2
          music2.currentTime = 0;
          music2.play();
          typeLyrics(lyricsSong2);
        }
        if (expression === "6") {
          // 3+3
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
