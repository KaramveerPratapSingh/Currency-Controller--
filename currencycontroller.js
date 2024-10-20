const BASE_URL ="https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
    for (Currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = Currcode;
        newOption.value=Currcode;
        if(select.name === "from" && Currcode === "USD"){
            newOption.selected="selected";
        }else if(select.name === "to" && Currcode === "INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateflag(evt.target);
    })

}

const updateflag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchangeRate= async() =>{
    let amount=document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal <1){
        amtVal=1;
        amount.value = "1";
    }

     //console.log(fromCurr.value,toCurr.value); 
    const URL = `${BASE_URL}/${toCurr.value}_${fromCurr.value}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rate;
    // console.log(rate);
    // console.log(amount.value);

    let finalamt = amtVal * rate;
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;

}



btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate()
//     let amount=document.querySelector(".amount input");
//     let amtVal = amount.value;
//     if(amtVal === "" || amtVal <1){
//         amtVal=1;
//         amount.value = "1";
//     }

//      //console.log(fromCurr.value,toCurr.value); 
//     const URL = `${BASE_URL}/${toCurr.value}_${fromCurr.value}.json`;
//     let response = await fetch(URL);
//     let data = await response.json();
//     let rate = data.rate;
//     // console.log(rate);
//      console.log(amount.value);

//     let finalamt = amtVal * rate;
//     msg.innerText = `${amount.value} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;


 }); 

 window.addEventListener("load",() =>{
    updateExchangeRate();
})