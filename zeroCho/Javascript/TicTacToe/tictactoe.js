var body = document.body;
var table = document.createElement('table');
var rowArray = [];
var colArray = [];
var turn = 'X';

var callBack = function(e){
    var currentRow = rowArray.indexOf(e.target.parentNode);
    var currentCol = colArray[currentRow].indexOf(e.target);

    // Trun Change
    if(colArray[currentRow][currentCol].textContent === ''){
        console.log('빈칸입니다');
        colArray[currentRow][currentCol].textContent = turn;

        // Line Check
        var complete = false;
        // Horizon Check
        if(
            colArray[currentRow][0].textContent === turn &&
            colArray[currentRow][1].textContent === turn &&
            colArray[currentRow][2].textContent === turn
        ){
            complete = true;
            console.log('h')
        }
        // Vertical Check
        if(
            colArray[0][currentCol].textContent === turn &&
            colArray[1][currentCol].textContent === turn &&
            colArray[2][currentCol].textContent === turn
        ){
            complete = true;
            console.log('v')
        }
        // Diagonal Check
        console.log(currentRow,currentCol)
        if(currentRow - currentCol === 0){
            if(
                colArray[0][0].textContent === turn &&
                colArray[1][1].textContent === turn &&
                colArray[2][2].textContent === turn
            ){
                complete = true;
                console.log('d');
            }
        }
        if(Math.abs(currentRow - currentCol) === 2){
            if(
                colArray[0][2].textContent === turn &&
                colArray[1][1].textContent === turn &&
                colArray[2][0].textContent === turn
            ){
                complete = true;
                console.log('d');
            }
        }

        if(complete){
            console.log(turn + '님 승리!');
        }else{
            if(turn === 'X'){
                turn = 'O'
            }else{
                turn = 'X'
            }
        }
    }else{
        console.log('빈칸이 아닙니다');
        
    }

    

};
for(i = 1; i <= 3; i++){
    var tr = document.createElement('tr');
    rowArray.push(tr);
    colArray.push([]);
    for(j = 1; j <= 3; j++){
        var td = document.createElement('td');
        colArray[i-1].push(td);
        td.addEventListener('click', callBack);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
body.append(table);