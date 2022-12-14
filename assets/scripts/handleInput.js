const submitBtn = document.getElementById("submit-btn");

const resetBtn = document.getElementById("reset-btn");
const resetNoti = document.getElementById("reset-notification");
const resetBtn_Yes = document.getElementById("yes-reset-btn");
const resetBtn_No = document.getElementById("no-reset-btn");

const initModal = document.getElementById("init-modal");
const resetModal = document.getElementById("reset-modal");

const predContainer = document.querySelector(".prediction-container")
const predLoadIcon = document.getElementById("predict-loading-ico");
const inputs = document.querySelectorAll(".value-input");
const price = document.getElementById("price");



const cutObj = {
  'fair': 0,
  'good': 1,
  'very good': 4,
  'premium': 3,
  'ideal': 2
}
const colorObj = {
  'j': 6,
  'i': 5,
  'h': 4,
  'g': 3,
  'f': 2,
  'e': 1,
  'd': 0
}
const clarityObj = {
  'i1': 0,
  'if': 1,
  'si1': 2,
  'si2': 3,
  'vs1': 4,
  'vs2': 5,
  'vvs1': 6,
  'vvs2': 7
}

const diaAttrs = {
  'cut': cutObj,
  'color': colorObj,
  'clarity': clarityObj
}

function autorun(){
  initModal.style.display = 'flex'

  data = {
    carat: 1,
    clarity: 0,
    color: 6,
    cut: 0,
    depth: 1,
    table: 1,
    x: 1,
    y: 1,
    z: 1
  }
  postData("https://diamond-price-prediction.onrender.com", data).then(
      (output) => {
        initModal.style.display = 'none'
      }
    );

}
autorun()

resetBtn.onclick = (e)=>{
  e.preventDefault();
  resetModal.style.display = 'flex';
}
resetBtn_Yes.onclick = (e)=>{
  e.preventDefault();
  price.innerHTML = ``;
  predContainer.style.border = 'none'

  for(let input of inputs){
    if(input.type === 'text'){
      input.value = '';
    }else{
      if(input.classList.contains("dropdown__filter-selected")){
        let diamondAttrName = input.dataset.diamondattribute;
        input.textContent = diamondAttrName.toUpperCase();
      }
    }
  }
  resetModal.style.display = 'none';
}
resetBtn_No.onclick = (e)=>{
  e.preventDefault();
  resetModal.style.display = 'none';
}
resetModal.onclick = (e)=>{
  resetModal.style.display = 'none';
}
resetNoti.onclick = (e)=>{
  e.stopPropagation();
}

submitBtn.onclick = (e) => {
  e.preventDefault();
  price.innerHTML = ``;
  predContainer.style.border = '1px solid #E80000'
  data = {};
  isValid = 1;


  for (let input of inputs) {
    if (input.classList.contains("dropdown__filter-selected")) {
      let diamondAttr = input.textContent.toLowerCase().trim();
      if (
        diamondAttr === "clarity" ||
        diamondAttr === "color" ||
        diamondAttr === "cut"
      ) {
        isValid = 0;
        price.style.color = "red";
        price.innerHTML = `'${diamondAttr}' is invalid !!!`;

        break;
      }else{
        console.log(input)
        let diamondAttrName = input.dataset.diamondattribute
        data = {
          ...data,
          [diamondAttrName]: parseFloat(diaAttrs[diamondAttrName][diamondAttr]),
        };
      }
    } else {
      if (
        input.name !== "cut" &&
        input.name !== "color" &&
        input.name !== "clarity"
      ) {
        if (
          /^[0-9.,]+$/.test(input.value) &&
          !isNaN(parseFloat(input.value)) &&
          parseFloat(input.value) > 0 &&
          (input.value.match(/,/g) || []).length <= 1 &&
          (input.value.match(/\./g) || []).length <= 1 &&
          (input.value.match(/,/g) || []).length +
            (input.value.match(/\./g) || []).length <=
            1
        ) {
          data = {
            ...data,
            [input.name]: parseFloat(input.value),
          };
        } else {
          isValid = 0;
          price.style.color = "red";
          price.innerHTML = `'${input.name}' is invalid !!!`;

          break;
        }
      } else {
        data = {
          ...data,
          [input.name]: parseFloat(input.value),
        };
      }
    }
  }
  // console.log(data)
  if (isValid === 1) {
    predLoadIcon.style.display = 'block';
    postData("https://diamond-price-prediction.onrender.com", data).then(
      (output) => {
        predLoadIcon.style.display = 'none';
        price.style.color = '#000';
        price.innerHTML = `Predicted price: $${output}`;
      }
    );
  }
};
