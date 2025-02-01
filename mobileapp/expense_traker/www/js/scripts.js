// This file is intentionally left blank.

function createButtons(buttons) {
    const leftContainer = document.getElementById('btn-cont-left');
    const rightContainer = document.getElementById('btn-cont-right');

    buttons.forEach((button, index) => {
        const btn = document.createElement('button');
        btn.setAttribute('expense-name', button.name);
        btn.classList.add('button');
        btn.style.backgroundColor = button.color ? button.color : '';
        btn.textContent = button.name;

        btn.onclick = function(){markAndAdvance(button.name)}; 

        if (index % 2 === 0) {
            leftContainer.appendChild(btn);
        } else {
            rightContainer.appendChild(btn);
        }
    });
}

var finalParsedData;
var finalMarkedData =[];
var currentCursor = 0;
function markAndAdvance(markAs = '') {
    let currentData = finalParsedData[currentCursor]
    currentData.marked = markAs;
    finalMarkedData.push(currentData);
    currentCursor++
    updateDisplay(finalParsedData[currentCursor].Narration,
        finalParsedData[currentCursor]["Deposit Amt."],
        finalParsedData[currentCursor]["Withdrawal Amt."],
        finalParsedData[currentCursor]["Closing Balance"]);
}

function updateDisplay(narration,credit,debit,balance){
    document.getElementById('txrn-progress').textContent = currentCursor + '/' + finalParsedData.length;
    document.getElementById('txrn-credit').textContent = credit;
    document.getElementById('txrn-debit').textContent = debit;
    document.getElementById('txrn-narration').textContent = narration;

}

var oFileIn;
$(function() {
    oFileIn = document.getElementById('file-input');
    if(oFileIn.addEventListener) {
        oFileIn.addEventListener('change', filePicked, false);
    }
});

function filePicked(oEvent) {
    // Get The File From The Input
    var oFile = oEvent.target.files[0];
    var sFilename = oFile.name;
    // Create A File Reader HTML5
    var reader = new FileReader();
    
    // Ready The Event For When A File Gets Selected
    reader.onload = function(e) {
        var data = e.target.result;
        var cfb = XLS.CFB.read(data, {type: 'binary'});
        var wb = XLS.parse_xlscfb(cfb);
        // Loop Over Each Sheet
        wb.SheetNames.forEach(function(sheetName) {
            // Obtain The Current Row As CSV
            // var sCSV = XLS.utils.
            // make_csv(wb.Sheets[sheetName]);   
            var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);   

            // $(".text-window").html(sCSV);
            console.log(oJS)
            finalParsedData = oJS;
            updateDisplay(finalParsedData[0].Narration,
                finalParsedData[0]["Deposit Amt."],
                finalParsedData[0]["Withdrawal Amt."],
                finalParsedData[0]["Closing Balance"]);
        });
    };
    
    // Tell JS To Start Reading The File.. You could delay this if desired
    reader.readAsBinaryString(oFile);
}

// Example usage:
const buttons = [{ name: "invenstment",color:"#5CB85C" }, 
    { name: "daily-expense",color:"#307BBB" }, { name: "unnecessary-expense",color: "#D23F3A" }, { name: "skip",color: "#999999" }];
createButtons(buttons);