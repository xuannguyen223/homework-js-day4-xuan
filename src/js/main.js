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
    ).innerHTML = `Họ tên: ${customerName} ; Tiền điện: ${eBill.toLocaleString(
      "vi-VN",
      { style: "currency", currency: "VND" }
    )}`;
  }
};

// *********** TÍNH THUẾ THU NHẬP CÁ NHÂN **************

let btnPITBill = getElement("#PITBill");

btnPITBill.onclick = () => {
  let customerName = getElement("#tax #customerName").value;
  let income = getElement("#income").value * 1;
  let dependent = getElement("#dependent").value * 1;
  let taxableIncome = income - 4000000 - dependent * 1600000;

  if (income < 0 || dependent < 0) {
    getElement("#PITBillResult").innerHTML =
      " Nội dung bị thiếu hoặc không hợp lệ! Vui lòng nhập lại";
  } else if (taxableIncome <= 0) {
    getElement(
      "#PITBillResult"
    ).innerHTML = `Họ tên: ${customerName} ; Tiền thuế thu nhập cá nhân: 0 VND`;
  } else {
    let taxLevel = [0, 60, 120, 210, 384, 624, 960];
    let taxPercent = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35];
    let PITBill = calculateBilling(taxableIncome, taxLevel, taxPercent);

    getElement(
      "#PITBillResult"
    ).innerHTML = `Họ tên: ${customerName} ; Tiền thuế thu nhập cá nhân: ${PITBill.toLocaleString(
      "vi-VN",
      { style: "currency", currency: "VND" }
    )}`;
  }
};

// *********** TÍNH TIỀN CÁP **************
const B2B = getElement("#business").value;
const B2C = getElement("#consumer").value;
const UNDEFINED_CUSTOMER = getElement("#undefinedCustomer").value;

const B2C_PROCESSING_FEE = 4.5;
const B2C_BASIC_SERVICE_FEE_FOR_CONNECTIONS = 20.5;
const B2C_PREMIUM_FEE_PER_CHANNEL = 7.5;

const B2B_PROCESSING_FEE = 15;
const B2B_BASIC_SERVICE_FEE_FOR_FIRST_10_CONNECTIONS = 75;
const B2B_BSF_FOR_ADD_CONNECTIONS_AFTER_10_PER_CHANNEL = 5;
const B2B_PREMIUM_FEE_PER_CHANNEL = 50;

// Khách hàng doanh nghiệp thì hiện số kết nối
let typeCustomer = getElement("#typeCustomer");

typeCustomer.onchange = () => {
  if (typeCustomer.value === B2B) {
    getElement("#connections").classList.remove("hidden");
  } else {
    getElement("#connections").classList.add("hidden");
  }
};

function showResultInternetFee(id, bill) {
  getElement(
    "#internetFeeResult"
  ).innerHTML = `Mã khách hàng: ${id} ; Tiền cáp: ${bill.toLocaleString(
    "en-US",
    { style: "currency", currency: "USD" }
  )}`;
}

// Tính phí internet
btnInternetFee = getElement("#internetFee");

btnInternetFee.onclick = () => {
  let typeCustomerValue = typeCustomer.value;
  let customerID = getElement("#customerID").value;
  let premiumChannel = getElement("#premiumChannel").value * 1;
  let numberOfConnections = getElement("#connections").value * 1;

  if (premiumChannel < 0 || numberOfConnections < 0) {
    getElement("#internetFeeResult").innerHTML =
      "Số kênh cao cấp, số kết nối tối thiểu là 0. Vui lòng nhập lại! ";
  } else {
    switch (typeCustomerValue) {
      case UNDEFINED_CUSTOMER:
        getElement("#internetFeeResult").innerHTML =
          " Vui lòng chọn loại khách hàng";
        break;
      case B2C:
        let internetFeeB2C =
          B2C_PROCESSING_FEE +
          B2C_BASIC_SERVICE_FEE_FOR_CONNECTIONS +
          B2C_PREMIUM_FEE_PER_CHANNEL * premiumChannel;
        showResultInternetFee(customerID, internetFeeB2C);
        break;
      case B2B:
        let internetFeeB2B =
          B2B_PROCESSING_FEE +
          B2B_BASIC_SERVICE_FEE_FOR_FIRST_10_CONNECTIONS +
          B2B_PREMIUM_FEE_PER_CHANNEL * premiumChannel;
        if (numberOfConnections > 10) {
          internetFeeB2B +=
            B2B_BSF_FOR_ADD_CONNECTIONS_AFTER_10_PER_CHANNEL *
            (numberOfConnections - 10);
        }
        showResultInternetFee(customerID, internetFeeB2B);
    }
  }
};
