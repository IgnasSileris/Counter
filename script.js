var Count = [];
    var currentSort = 4;
    function addCounter() {
        let container = document.getElementById("container");
        let CountBox = document.createElement("div");
        let num = 1;

        let Box = {
                id: "",
                score: 0
        }
        if (Count.length == 0) {
            Box.id = "CounterBox1"
        }
        else {
            for (let i = 0; i < Count.length; i++) {
                let thisId = Count[i].id;
                let currNum = parseInt(thisId.slice(-1));
                if (currNum >= num) {
                    num = currNum + 1;
                }
            }
            Box.id = "CounterBox" + num.toString();
        }
        
        Count.push(Box);
        localStorage.setItem('Boxes', JSON.stringify(Count)); //Local storage
        CountBox.className = "FirstCounter";
        CountBox.id = "CounterBox" + num.toString();
        container.appendChild(CountBox);
        createElements(num, CountBox);
        let ix = Count.findIndex(e => e.id === "CounterBox" + num.toString());
        updateDisplay("Score" + num.toString(), ix);
        toggleRemButton(Count.length);
    }
    function createElements(num, obj) {
        let thisForm = document.createElement("form");
        thisForm.addEventListener("keydown", function(event){
            if (event.keyCode == 13) {
                event.preventDefault();
                return false
            }
        } )
        obj.appendChild(thisForm);
        let textInput = document.createElement("input");
        textInput.type = "text";
        textInput.placeholder = "Display Name";
        textInput.name = "Form1"
        textInput.id = "Form" + num.toString();
        textInput.autocomplete = "off";
        textInput.maxLength = 15;
        textInput.addEventListener("keydown", function(event){
            if (event.keyCode == 13) {
                displayNameInput(num)
            }
            else {
                return
            }
        } )
        thisForm.appendChild(textInput);

        let thisPar = document.createElement("p");
        obj.appendChild(thisPar);
        thisPar.className = "DisplayName1";
        thisPar.id = "DisplayName" + num.toString();

        let EnterButton = document.createElement("button");
        obj.appendChild(EnterButton);
        EnterButton.type = "button";
        EnterButton.name = "EnterButton1";
        EnterButton.id = "EnterButton" + num.toString();
        EnterButton.innerHTML = "Enter";
        EnterButton.onclick = function () {displayNameInput(num)};

        let IncButton = document.createElement("button");
        obj.appendChild(IncButton);
        IncButton.type = "button";
        IncButton.name = "Increment1";
        IncButton.id = "Increment" + num.toString();
        IncButton.title = "Increment counter";
        IncButton.innerHTML = "+";
        IncButton.onclick = function () {incrementCounter(num)};

        let DecButton = document.createElement("button");
        obj.appendChild(DecButton);
        DecButton.type = "button";
        DecButton.name = "Decrement1";
        DecButton.id = "Decrement" + num.toString();
        DecButton.title = "Decrement counter";
        DecButton.innerHTML = "-";
        DecButton.onclick = function () {decrementCounter(num)};

        let ResButton = document.createElement("button");
        obj.appendChild(ResButton);
        ResButton.type = "button";
        ResButton.name = "Reset1";
        ResButton.id = "Reset" + num.toString();
        ResButton.title = "Reset counter";
        ResButton.innerHTML = "Reset";
        ResButton.onclick = function () {resetCounter(num)};

        let RemButton = document.createElement("input");
        obj.appendChild(RemButton);
        RemButton.type = "image";
        RemButton.src = "closebutton.png";
        RemButton.name = "Remove1";
        RemButton.id = "Remove" + num.toString();
        RemButton.title = "Remove counter";
        RemButton.onclick = function () {removeCounter(num)};

        let thisPar2 = document.createElement("p");
        obj.appendChild(thisPar2);
        thisPar2.className = "Score1";
        thisPar2.id = "Score" + num.toString();

        let AddBox = document.createElement("div");
        AddBox.className = "AddCounterBox";
        AddBox.id = "AddCounterBox";
        obj.appendChild(AddBox);

        let AddButton = document.createElement("input");
        AddBox.appendChild(AddButton);
        AddButton.type = "image";
        AddButton.src = "addbutton.png";
        AddButton.name = "Add";
        AddButton.id = "Add" + num.toString();
        AddButton.title = "Add counter";
        AddButton.onclick = function () {addCounter()};

        let thisPar3 = document.createElement("p");
        AddBox.appendChild(thisPar3);
        thisPar3.className = "AddCounterText";
        thisPar3.id = "AddCounterText";
        thisPar3.innerHTML = "Add counter";

        if (Count.length == 1) {
            let SortBox = document.createElement("div");
            SortBox.className = "sortBox";
            SortBox.id = "SortBox"

            let select = document.createElement("select");
            select.name = "sorts";
            select.id = "sorts";
            SortBox.appendChild(select);

            let option0 = document.createElement("option");
            option0.innerHTML = "Sort By:"
            select.appendChild(option0);
            let option1 = document.createElement("option");
            option1.id = "op1";
            option1.value = "1";
            option1.innerHTML = "Score: High-to-Low";
            select.appendChild(option1);
            let option2 = document.createElement("option");
            option2.innerHTML = "Score: Low-to-High";
            option2.id = "op2";
            option2.value = "2";
            select.appendChild(option2);
            let option3 = document.createElement("option");
            option3.innerHTML = "Date: New-to-Old";
            option3.id = "op3";
            option3.value = "3";
            select.appendChild(option3);
            let option4 = document.createElement("option");
            option4.innerHTML = "Date: Old-to-New&#10004";
            option4.id = "op4";
            option4.value = "4";
            select.appendChild(option4);

            select.onchange = () => {
                let par = select.options[select.selectedIndex].value;
                sortElements(parseInt(par));
            }

            let thisId = "CounterBox" + (Count[0].id).slice(-1);  
            let parObj = document.getElementById(thisId);
            parObj.appendChild(SortBox);
        }
        
    }
    function updateDisplay(myId, ix){
        document.getElementById(myId).innerHTML = Count[ix].score;
    }
    function incrementCounter(num) {
        let ix = Count.findIndex(e => e.id === "CounterBox" + num.toString());
        Count[ix].score++;
        localStorage.setItem('Boxes', JSON.stringify(Count)); //Local storage
        let par = document.getElementById("Score" + num.toString());
        updateDisplay(par.id, ix);
    }
    function decrementCounter(num) {
        let ix = Count.findIndex(e => e.id === "CounterBox" + num.toString());
        Count[ix].score--;
        localStorage.setItem('Boxes', JSON.stringify(Count)); //Local storage
        let par = document.getElementById("Score" + num.toString());
        updateDisplay(par.id, ix);
    }
    function resetCounter(num) {
        let ix = Count.findIndex(e => e.id === "CounterBox" + num.toString());
        Count[ix].score = 0;
        localStorage.setItem('Boxes', JSON.stringify(Count)); //Local storage
        let par = document.getElementById("Score" + num.toString());
        updateDisplay(par.id, ix);
    }
    function displayNameInput(num) {
        let inputName = document.getElementById("Form" + num.toString()).value;
        document.getElementById("DisplayName" + num.toString()).innerHTML = inputName;
        document.getElementById("Form" + num.toString()).value = ""
}
    function removeCounter(num) {
        let ix = Count.findIndex(e => e.id === "CounterBox" + num.toString());
        Count.splice(ix,1);
        localStorage.setItem('Boxes', JSON.stringify(Count)); //Local storage
        if (ix == 0){
            reassignSort();
        }
        document.getElementById("CounterBox" + num.toString()).remove();
        toggleRemButton(Count.length);
        
    }
    function toggleRemButton(len) {
        const myVar = Count[0].id;
        const myNum = myVar.slice(-1);
        let myEle = document.getElementById("Remove" + myNum);
        if (len == 1){
            myEle.style.display = "none";
        }
        else {
            myEle.style.display = "block";
        }
        
    }
    function reassignSort() {
        let thisId = "CounterBox" + (Count[0].id).slice(-1);  
        let parObj = document.getElementById(thisId);
        let SortBox = document.getElementById("SortBox");
        parObj.appendChild(SortBox);
    }
    function sortElements(sType) {
        currentSort = sType;
        switch(sType) {
            case 1:
                document.getElementById("op1").innerHTML = "Score: High-to-Low&#10004";
                document.getElementById("op2").innerHTML = "Score: Low-to-High"
                document.getElementById("op3").innerHTML = "Date: New-to-Old";
                document.getElementById("op4").innerHTML = "Date: Old-to-New";
                Count.sort((a,b) => {
                    return b.score - a.score;
                });
                break;
            case 2:
                document.getElementById("op1").innerHTML = "Score: High-to-Low";
                document.getElementById("op2").innerHTML = "Score: Low-to-High&#10004"
                document.getElementById("op3").innerHTML = "Date: New-to-Old";
                document.getElementById("op4").innerHTML = "Date: Old-to-New";
                Count.sort((a,b) => {
                    return a.score - b.score;
                });
                break;
            case 3:
                document.getElementById("op1").innerHTML = "Score: High-to-Low";
                document.getElementById("op2").innerHTML = "Score: Low-to-High"
                document.getElementById("op3").innerHTML = "Date: New-to-Old&#10004";
                document.getElementById("op4").innerHTML = "Date: Old-to-New";
                Count.sort((a,b) => {
                if (a.id > b.id){
                    return -1;
                }
                if (a.id < b.id) {
                    return 1;
                }
                });
                break;
            case 4:
                document.getElementById("op1").innerHTML = "Score: High-to-Low";
                document.getElementById("op2").innerHTML = "Score: Low-to-High"
                document.getElementById("op3").innerHTML = "Date: New-to-Old";
                document.getElementById("op4").innerHTML = "Date: Old-to-New&#10004";
                Count.sort((a,b) => {
                if (a.id < b.id){
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                });
        }
        localStorage.setItem('Boxes', JSON.stringify(Count)); //Local storage
        reassignSort();
        reorderDivs();
    }
    function reorderDivs() {
        var sortArr = [];
        for (var i=0; i < Count.length; i++){
            var thisId = Count[i].id;
            var thisNum = parseInt(thisId.slice(-1));
            sortArr.push(thisNum);
        }
        var container = document.getElementById("container");
        sortArr.forEach((n,ix) => {
            sortArr.slice(ix+1,).forEach((m,jx) => {
                var name1 = "CounterBox" + n.toString();
                var index1 = Count.findIndex(e => e.id === name1);
                var elem1 = document.getElementById(name1);

                var name2 = "CounterBox" + m.toString();
                var index2 = Count.findIndex(e => e.id === name2);
                var elem2 = document.getElementById(name2);

                if (index1 < index2) {
                    container.insertBefore(elem1, elem2);
                    }
                else {
                    container.insertBefore(elem2, elem1);
                    }   
            });
        });

            
    }
    function loadProgram() {
        if (localStorage.getItem('Boxes') === null){
            addCounter();
        }
        else{
            Count = JSON.parse(localStorage.getItem('Boxes'));
        
        }
    }