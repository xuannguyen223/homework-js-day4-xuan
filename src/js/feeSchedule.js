// dùng để ẩn hiện biểu phí - ko liên quan đến code chính

// bài 2
let btnLevelFeeOfEBill = document.querySelector("#levelFeeOfEBill");
let divDetailEBill = document.querySelector("#detailEBill");

btnLevelFeeOfEBill.onclick = () => {
  divDetailEBill.classList.toggle("hidden");
};

// bài 3
let btnLevelFeeOfPITBill = document.querySelector("#levelFeeOfPITBill");
let divDetailPITBill = document.querySelector("#detailPITBill");

btnLevelFeeOfPITBill.onclick = () => {
  divDetailPITBill.classList.toggle("hidden");
};
