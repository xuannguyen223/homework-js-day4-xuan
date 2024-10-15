// COMMON FUNCTION
const getElement = (selector) => document.querySelector(selector);

// FUNCTION TOÁN BẬC THANG (dùng chung cho bài 2,3)

function calculateBilling(amount, levelAmount, levelValue) {
  let currentLevel = findCurrentLevel(amount, levelAmount);
  let currentLevelValue =
    (amount - levelAmount[currentLevel]) * levelValue[currentLevel];
  let sumPreviousValue = calculateValuePreviousLevels(
    levelAmount,
    levelValue,
    currentLevel
  );
  return parseFloat((currentLevelValue + sumPreviousValue).toFixed(2));
}

// tạo function tìm tầng hiện tại của amount
function findCurrentLevel(amount, levelAmount) {
  let i = 0;
  while (i < levelAmount.length - 1 && amount > levelAmount[i + 1]) {
    i++;
  }
  return i;
}

// tạo function tính value của tất cả các tầng trước đó
function calculateValuePreviousLevels(levelAmount, levelValue, level) {
  let sum = 0;
  for (i = level; i > 0; i--) {
    sum += (levelAmount[i] - levelAmount[i - 1]) * levelValue[i - 1];
  }
  return sum;
}

// *********** QUẢN LÝ TUYỂN SINH **************
/* Điều kiện trúng tuyển: tổng điểm >= điểm chuẩn && ko có môn nào <= 0 
Tổng điểm = sum(điểm 3 môn) + areaScore + objectScore 
Điểm cộng theo khu vực (areaScore) = A: 2đ ; B: 1đ ; C: 0.5đ ; default = 0 
Điểm cộng theo đối tượng (objectScore) = 1: 2.5đ ; 2: 1.5đ ; 3: 1đ ; default = 0 */

let btnResult = getElement("#result");

btnResult.onclick = () => {
  let cutoffScore = getElement("#cutoffScore").value * 1;
  let score1 = getElement("#score1").value * 1;
  let score2 = getElement("#score2").value * 1;
  let score3 = getElement("#score3").value * 1;
  let areaScore = getElement("#area").value * 1;
  let objectScore = getElement("#object").value * 1;
  let totalScore = score1 + score2 + score3 + areaScore + objectScore;

  if (score1 <= 0 || score2 <= 0 || score3 <= 0) {
    getElement("#admissionResult").innerHTML =
      "Bạn đã rớt. Do có điểm nhỏ hơn hoặc bằng 0";
  } else if (totalScore >= cutoffScore) {
    getElement(
      "#admissionResult"
    ).innerHTML = `Bạn đã đậu. Tổng điểm: ${totalScore}`;
  } else {
    getElement(
      "#admissionResult"
    ).innerHTML = `Bạn đã rớt. Tổng điểm: ${totalScore}`;
  }
};

// *********** TÍNH TIỀN ĐIỆN **************

let btnEBill = getElement("#eBill");

btnEBill.onclick = () => {
  let customerName = getElement("#customerName").value;
  let kw = getElement("#kw").value * 1;

  if (kw <= 0) {
    getElement("#eBillResult").innerHTML =
      "Số kw không hợp lệ! Vui lòng nhập lại";
  } else {
    let kwLevel = [0, 50, 100, 200, 350];
    let kwPrice = [500, 650, 850, 1100, 1300];
    let eBill = calculateBilling(kw, kwLevel, kwPrice);

    getElement(
      "#eBillResult"
    ).innerHTML = `Họ tên: ${customerName} ; Tiền điện: ${eBill}`;
  }
};

// *********** TÍNH THUẾ THU NHẬP CÁ NHÂN **************
