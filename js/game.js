//--------Game Load--------

if (localStorage.length == 0) {                   //if New Game
    localStorage.setItem("Build1_num_mem", 0);
    localStorage.setItem("Build2_num_mem", 0);
    localStorage.setItem("Build3_num_mem", 0);
    localStorage.setItem("Build4_num_mem", 0);
    localStorage.setItem("Currency1_mem", 10);    //_mem - field from memory

}

//--------Variables Initialization--------


    //Currencies
    let Currency1 = localStorage.getItem("Currency1_mem");       //total amount of Coins

    //Initial Building1 stats.
    let Build1_num = localStorage.getItem("Build1_num_mem");     //total amount of building 1
    let Build1_prod_base = 1;                                    //Base production of building 1 - 1
    let Build1_cost_base = 10;                                   //Base cost of building 1       - 10

    //Calculated Building1 stats.
    let Build1_prod_total = Build1_prod_base * Build1_num;                                              //total production of building 1
    let Build1_cost_next = Build1_cost_base * Math.pow(1.1, Build1_num);    //Cost for next Building 1 purchase

    //Initial Building2 stats.
    let Build2_num = localStorage.getItem("Build2_num_mem");                //total amount of building 2
    let Build2_prod_base = 10;                                             //Base production of building 2 - 10
    let Build2_cost_base = 200;                                            //Base cost of building 2       - 200

    //Calculated Building2 stats.
    let Build2_prod_total = Build2_prod_base * Build2_num;                                              //total production of building 2
    let Build2_cost_next = Build2_cost_base * Math.pow(1.1, Build2_num);    //Cost for next Building 2 purchase

    //Initial Building3 stats.
    let Build3_num = localStorage.getItem("Build3_num_mem");                //total amount of building 3
    let Build3_prod_base = 100;                                             //Base production of building 3 - 100
    let Build3_cost_base = 4000;                                            //Base cost of building 3       - 4 000

    //Calculated Building3 stats.
    let Build3_prod_total = Build3_prod_base * Build3_num;                                              //total production of building 3
    let Build3_cost_next = Build3_cost_base * Math.pow(1.1, Build3_num);    //Cost for next Building 3 purchase

    //Initial Building4 stats.
    let Build4_num = localStorage.getItem("Build4_num_mem");                //total amount of building 4
    let Build4_prod_base = 1000;                                            //Base production of building 4 - 1 000
    let Build4_cost_base = 80000;                                           //Base cost of building 4       - 80 000

    //Calculated Building4 stats.
    let Build4_prod_total = Build4_prod_base * Build4_num;                                              //total production of building 4
    let Build4_cost_next = Build4_cost_base * Math.pow(1.1, Build4_num);    //Cost for next Building 4 purchase


//--------Production--------

function BuildingProdUpdate() {
    if(Build1_num > 0) Build1_prod_total = Build1_prod_base * Build1_num;
    if(Build2_num > 0) Build2_prod_total = Build2_prod_base * Build2_num;
    if(Build3_num > 0) Build3_prod_total = Build3_prod_base * Build3_num;
    if(Build4_num > 0) Build4_prod_total = Build4_prod_base * Build4_num;
}

function Currency1Update() {
    if(Build1_prod_total > 0) Currency1 += (Build1_prod_total / 20); // production happens 20 times per second
    if(Build2_prod_total > 0) Currency1 += (Build2_prod_total / 20);
    if(Build3_prod_total > 0) Currency1 += (Build3_prod_total / 20);
    if(Build4_prod_total > 0) Currency1 += (Build4_prod_total / 20);
}

function UpdatePerTick() {
    BuildingProdUpdate();
    Currency1Update();

    document.getElementById('produce1').innerHTML = Math.floor(Build1_prod_total) + "/s";
    document.getElementById('cost1').innerHTML = Math.floor(Build1_cost_next);
    document.getElementById('name1').innerHTML = "Farmer " + Build1_num;

    document.getElementById('produce2').innerHTML = Math.floor(Build2_prod_total) + "/s";
    document.getElementById('cost2').innerHTML = Math.floor(Build2_cost_next);
    document.getElementById('name2').innerHTML = "Field " + Build2_num;

    document.getElementById('produce3').innerHTML = Math.floor(Build3_prod_total) + "/s";
    document.getElementById('cost3').innerHTML = Math.floor(Build3_cost_next);
    document.getElementById('name3').innerHTML = "Mill " + Build3_num;

    document.getElementById('produce4').innerHTML = Math.floor(Build4_prod_total) + "/s";
    document.getElementById('cost4').innerHTML = Math.floor(Build4_cost_next);
    document.getElementById('name4').innerHTML = "Factory " + Build4_num;

    document.getElementById('Coins').innerHTML = "Coins " + Math.floor(Currency1);
}
setInterval(UpdatePerTick, 50);     // 1 second - 20 ticks


//--------Buy Button Functions--------
function PurchaseBuilding1() {
    if (Currency1 >= Build1_cost_next) {
        Currency1 -= Build1_cost_next;
        Build1_num++;
        Build1_cost_next = Build1_cost_base * Math.pow(1.1, Build1_num);
        if(Build1_num >= 10) {  //After 10 Build1 buildings new row is revealed
            ShowRow2();
        }
    }
}

function PurchaseBuilding2() {
    if (Currency1 >= Build2_cost_next) {
        Currency1 -= Build2_cost_next;
        Build2_num++;
        Build2_cost_next = Build2_cost_base * Math.pow(1.1, Build2_num);
        if(Build2_num >= 10) {  //After 10 Build2 buildings new row is revealed
            ShowRow3();
        }
    }
}

function PurchaseBuilding3() {
    if (Currency1 >= Build3_cost_next) {
        Currency1 -= Build3_cost_next;
        Build3_num++;
        Build3_cost_next = Build3_cost_base * Math.pow(1.1, Build3_num);
        if(Build3_num >= 10) {  //After 10 Build3 buildings new row is revealed
            ShowRow4();
        }
    }
}

function PurchaseBuilding4() {
    if (Currency1 >= Build4_cost_next) {
        Currency1 -= Build4_cost_next;
        Build4_num++;
        Build4_cost_next = Build4_cost_base * Math.pow(1.1, Build4_num);
    }
}

//--------Auto Saving--------

function GameSave() {
    localStorage.setItem("Build1_num_mem", Build1_num);
    localStorage.setItem("Build2_num_mem", Build2_num);
    localStorage.setItem("Build3_num_mem", Build3_num);
    localStorage.setItem("Build4_num_mem", Build4_num);
    localStorage.setItem("Currency1_mem", Math.floor(Currency1));
}
setInterval(GameSave, 1000);        // game is saved every 1 seconds

//--------Hiding Unnecessary Features--------

function ShowRow2() {
    document.querySelector("#name2").style.display = "block";
    document.querySelector("#produce2").style.display = "block";
    document.querySelector("#cost2").style.display = "block";
    document.querySelector("#buybutton2").style.display = "block";
}
function ShowRow3() {
    document.querySelector("#name3").style.display = "block";
    document.querySelector("#produce3").style.display = "block";
    document.querySelector("#cost3").style.display = "block";
    document.querySelector("#buybutton3").style.display = "block";
}
function ShowRow4() {
    document.querySelector("#name4").style.display = "block";
    document.querySelector("#produce4").style.display = "block";
    document.querySelector("#cost4").style.display = "block";
    document.querySelector("#buybutton4").style.display = "block";
}