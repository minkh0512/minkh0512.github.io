var numberList = Array(45)
    .fill()
    .map(function(e,index){
        return index + 1;
    });

var shuffle = [];
while(numberList.length > 0){
    var shuffleNumber = numberList.splice(Math.floor(Math.random()*numberList.length),1)[0];
    shuffle.push(shuffleNumber);
}

var bonusNumber = shuffle[shuffle.length - 1];
var prizeNumber = shuffle.
    slice(0, 6).
    sort(function(prevNumber, currentNumber){
        return prevNumber-currentNumber
    });

var resultBox = document.querySelector('#result');

for(var i = 0; i < prizeNumber.length; i++){
    var prizeBox = document.createElement('div');
    prizeBox.textContent = prizeNumber[i];
    resultBox.appendChild(prizeBox);
}

var bonusBox = document.querySelector('.bonus');
var prizeBonusBox = document.createElement('div');
prizeBonusBox.textContent = bonusNumber;
bonusBox.appendChild(prizeBonusBox);
