// calculator.js

let current = localStorage.getItem("lastResult") || "";
let isResultDisplayed = false;
let errorState = false;

function updateDisplay() {
  $("#display").val(current);
  if (errorState) {
    $("#display").addClass("border-red-500");
  } else {
    $("#display").removeClass("border-red-500");
  }
}

function showAlert(msg) {
  alert(msg);
}

function calculateResult() {
  if (!current.trim()) {
    showAlert("Lütfen bir işlem giriniz.");
    return;
  }

  let stack = [];
  for (let i = 0; i < current.length; i++) {
    if (current[i] === "(") {
      stack.push(i);
    } else if (current[i] === ")") {
      const openIndex = stack.pop();
      if (openIndex !== undefined) {
        const inside = current.slice(openIndex + 1, i);
        if (!inside || /[+\-*/]$/.test(inside)) {
          showAlert("Boş veya hatalı parantez içeriği bulundu. Otomatik düzeltildi.");
          current = current.slice(0, openIndex) + current.slice(i + 1);
          i = openIndex - 1; // geri sar
        }
      }
    }
  }

  // Açılıp kapanmamış parantezleri kontrol et ve kapat
  let openCount = (current.match(/\(/g) || []).length;
  let closeCount = (current.match(/\)/g) || []).length;
  while (openCount > closeCount) {
    current += ")";
    closeCount++;
  }

  try {
    const result = eval(current);
    if (typeof result === "number" && isFinite(result)) {
      current = result.toString();
      localStorage.setItem("lastResult", current);
      isResultDisplayed = true;
      errorState = false;
    } else {
      throw "Invalid calculation";
    }
  } catch {
    showAlert("Hatalı işlem. Otomatik düzeltme uygulanıyor.");
    const lastChar = current.trim().slice(-1);
    if (["+", "-", "*", "/", "(", ")"].includes(lastChar)) {
      current = current.slice(0, -1);
    }
    errorState = false;
    updateDisplay();
    return;
  }
  updateDisplay();
}

function backspace() {
  if (isResultDisplayed || errorState) {
    current = "";
    isResultDisplayed = false;
    errorState = false;
  } else {
    current = current.slice(0, -1);
  }
  updateDisplay();
}

function isInvalidSequence(prev, next) {
  const ops = ["+", "-", "*", "/"];
  return ops.includes(prev) && ops.includes(next);
}

function isLastIncompleteParenthesis(expr) {
  const lastOpenIndex = expr.lastIndexOf("(");
  const lastCloseIndex = expr.lastIndexOf(")");
  return lastOpenIndex > lastCloseIndex;
}

$(document).ready(function () {
  updateDisplay();

  $(".btn").click(function () {
    let val = $(this).text();

    if (val === "C") {
      current = "";
      errorState = false;
      updateDisplay();
      return;
    }

    if (val === "=") {
      if (isLastIncompleteParenthesis(current)) {
        const lastChar = current.trim().slice(-1);
        if (["+", "-", "*", "/"].includes(lastChar)) {
          showAlert("İşlem tamamlanamadı. Parantez veya operatör hatası. Kapatılıyor.");
          current = current.slice(0, -1);
        }
        current += ")";
      }
      calculateResult();
      return;
    }

    if (val === "⌫") {
      backspace();
      return;
    }

    if (errorState || current === "Hata") {
      current = "";
      errorState = false;
    }

    if (!current && !/[\d(]/.test(val)) {
      if (val === ".") {
        current = "0.";
      } else {
        showAlert("Bir işlem başlatmak için sayı veya '(' kullanın.");
        return;
      }
    } else {
      const lastChar = current.slice(-1);

      if (isInvalidSequence(lastChar, val)) {
        showAlert("Yan yana iki işlem operatörü kullanılamaz.");
        return;
      }

      if (val === "(") {
        if (/[\d)]$/.test(current)) {
          current += "*";
        }
      }

      if (val.match(/^\d|\($/)) {
        if (/\)$/.test(current)) {
          current += "*";
        }
      }

      if (val === "." && (!current || /[^\d)]$/.test(current))) {
        current += "0.";
        updateDisplay();
        return;
      }

      if (isResultDisplayed) {
        if (/[\d(]/.test(val)) {
          current = val;
        } else {
          current += val;
        }
        isResultDisplayed = false;
      } else {
        current += val;
      }
    }

    updateDisplay();
  });
});