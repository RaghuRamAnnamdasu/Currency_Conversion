var data, currency1, currency2, value1, value2;
function createElement(tagName,classAttributeValue,content){
    var element = document.createElement(tagName);
    element.setAttribute("class",classAttributeValue);
    element.innerHTML=content;
    return element;
}
function fetchAPI(){
    var promise1 = fetch(`https://api.exchangerate.host/latest'`);
    promise1.then(
        (readableStreamValue)=>readableStreamValue.json()
        ).then(
            (array)=>{
            data = array;
            currencyConversion();
        }).catch(
            (err)=>`The error is : ${err}`
        );
}
fetchAPI();


var parentElement1 = document.getElementsByClassName("firstCurrency")[0];
var parentElement2 = document.getElementsByClassName("secondCurrency")[0];
var bodySection = document.getElementsByClassName("bodySection")[0];


function currencyConversion(){
    var currencyList = Object.keys(data.rates);
    currencyList.unshift("select");
    currencyList.forEach((value)=>{
        var element1 = createElement("option","",value);
        var element2 = createElement("option","",value);
        parentElement1.append(element1);
        parentElement2.append(element2);
    })
    
    var result = createElement("div","","");
    bodySection.append(result);
    parentElement1.addEventListener("change",((evt)=>{
        currency1 = evt.target.value;
        value1 = data.rates[currency1];
        if(value2 !== undefined && value1 !== undefined){
            result.setAttribute("class","resultDisplay");
            result.innerHTML = `1 ${currency1} = ${(value2/value1).toFixed(5)} ${currency2} `
        }
        
    
    }));
    parentElement2.addEventListener("change",((evt)=>{
        currency2 = evt.target.value;
        value2 = data.rates[currency2];
        if(value1 !== undefined && value2 !== undefined){
            result.setAttribute("class","resultDisplay");
            result.innerHTML = `1 ${currency1} = ${(value2/value1).toFixed(5)} ${currency2} `
        }
    }));
}

