const resultEl=document.getElementById('result');
const lengthEl=document.getElementById('length');
const uppercaseEl=document.getElementById('uppercase');
const lowercaseEl=document.getElementById('lowercase');
const numberEl=document.getElementById('numbers');
const symbolEl=document.getElementById('symbols');
const generateEl=document.getElementById('generate');
const clipboardEl=document.getElementById('clipboard');

const randomFunc={
    lower:getLowerCase,
    upper:getUpperCase,
    number:getNumber,
    symbol:getSymbol
};

   generateEl.addEventListener('click',() =>{
    //    console.log("i have been clicked");
       const length= +lengthEl.value;
       const hasLower=lowercaseEl.checked;
       const hasUpper= uppercaseEl.checked;
       const hasNumber=numberEl.checked;
       const hasSymbol=symbolEl.checked;
       
      resultEl.innerText= generatePassword(
          hasLower,
          hasUpper,
          hasNumber,
          hasSymbol,
          length
      );
   });
        clipboardEl.addEventListener('click', () =>{
            const textarea=document.createElement('textarea');
            const password=resultEl.innerText;
              //abcd
            if(!password){
                return;
            }
            textarea.value=password;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            alert('Password copied to clipboard');

        });


   function generatePassword(lower,upper,number,symbol,length){
      let generatedPassword= "";
      const typesCount=lower+upper+number+symbol;
      //console.log(typesCount); 
      
      const typesArr= [{lower}, {upper} ,{number}, {symbol}].filter(item =>Object.values(item)[0]);
     //aA1@ //lower //upper //number //symbol
        //lower
      if(typesCount===0){
          return 'Select atleast one option';
      }
      for(let i=0;i<length;i+=typesCount){
          typesArr.forEach(type=>{    
         const funcName=Object.keys(type)[0];   //lower    /
         generatedPassword +=randomFunc[funcName](); //a
          });
      }
      const finalPassword= generatedPassword.slice(0, length);
      return finalPassword;
    }
      


function getLowerCase(){
    return String.fromCharCode(Math.floor(Math.random()*26)+97);
}
function getUpperCase(){
    return String.fromCharCode(Math.floor(Math.random()*26)+65);
}
function getNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}
function getSymbol(){
    const symbols='@#$%^&*/;""';
    return symbols[Math.floor(Math.random()*symbols.length)];

}
