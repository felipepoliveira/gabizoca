var $inputDia;
var $inputMes;
var $inputAno;
var $main;
var $anniversaryBox;
var $commitmentAlliance;
var $greenDayBox;
var $ibira2017Box;
var $loginBox;
var $cheatBox;

//Audios
var audioIbira2017;

var dates = [
    {
        date : "03/11/2017",
        description : "Show do Green Day"
    },
    {
        date : "12/11/2017",
        description : "Aniversário de namoro"
    },
    {
        date : "25/11/2017",
        description : "Inauguração da Árvore de Natal no Ibirapueta 2017"
    }
];

//Cheat area
let clickCountBtnHeart = 0;
var cheats = [
    "mostraasdatasai"
]

var openDateCallbacks = [
    () => {
        if(inputsWithDateEqualsTo("12/11/2017")){
                document.body.classList.toggle("black");
                toggleView($anniversaryBox);

                return true;
        }else{
            return false;
        }
    },

    () => {
        if(inputsWithDateEqualsTo("03/11/2017")){
            toggleView($greenDayBox);
            applyPhotos(document.querySelector("#greenDayImages"), "gd", "jpg", 9);
            return true;
        }else{
            return false;
        }
    },

    () => {
        if(inputsWithDateEqualsTo("25/11/2017")){
            toggleView($ibira2017Box);
            audioIbira2017.play();
            toggleOverlay({
                "background-image" : "url('images/snow.gif')",
                "opacity" : "0.5"
            });
            return true;
        }else{
            return false;
        }
    },

    () => {
        if(inputsWithDateEqualsTo("17/12/2017")){
            toggleView($commitmentAlliance);
            document.body.classList.toggle("black");
        }
    }
];

function applyPhotos(where, prefix, ext, howMutch){
    //Remove each child
    Array(where.querySelectorAll("img")).forEach((c) => {
        console.log(c);
    });

    //Apply all images
    for(let i = 1; i <= howMutch; i++){
        let image = new Image();
        image.onload = () => {
            setTimeout(() => {
                where.appendChild(image);
            }, 500);
        }
        image.src = "images/" + prefix + "-" + i + "." + ext;
    }
}

function submitCheat(cheat){
    switch(cheat){
        case "mostrardatas":
        document.querySelector("#dates").classList.add("show");
        break;
    }
}

function inputsWithDateEqualsTo(date){
    if(/\d{1,2}\/\d{1,2}\/\d{4}/.test(date) === false) throw "Invalid date inputed";
    let splitDate = date.split("/");
    let day = parseInt(splitDate[0]);
    let month = parseInt(splitDate[1]);
    let year = parseInt(splitDate[2]);

    console.log(splitDate);

    return (parseInt($inputDia.value) === day &&
            parseInt($inputMes.value) === month &&
            parseInt($inputAno.value) === year);
}

function toggleOverlay(obj){
    
    let o = document.querySelector("#overlay")
    o.classList.toggle("show");

    console.log(Object.keys(obj));
    Object.keys(obj).forEach(prop => {
        o.style[prop] = obj[prop];
    });
}

function toggleView(box){
    $main.classList.toggle("view-show");
    box.classList.toggle("view-show");
}

window.addEventListener('load', function(){
    $inputDia = document.querySelector("#inputDia");
    $inputMes = document.querySelector("#inputMes");
    $inputAno = document.querySelector("#inputAno");
    $cheatBox = document.querySelector("#cheatBox");
    $inputCheatBox = document.querySelector("#inputCheat");
    $main = document.querySelector("#main");
    $anniversaryBox = document.querySelector("#anniversary-box");
    $greenDayBox = document.querySelector("#greenday-box");
    $ibira2017Box = document.querySelector("#ibirapuera-2017-box");
    $loginBox = document.querySelector("#login-box");
    $commitmentAlliance = document.querySelector("#commitmentAlliance-box");

    //Audios
    audioIbira2017 = document.querySelector("#audioIbira2017");

    let btnHeart = document.querySelector("#btnheart");
    btnHeart.addEventListener('click', () => {
        clickCountBtnHeart++;
        openDateCallbacks.forEach(cb => {
            if(cb()){
                return;
            }
        });

        //Open cheat box
        if(clickCountBtnHeart % 10 === 0){
            $cheatBox.classList.add("show");
            $cheatBox.querySelector("input").focus();
        }else if($cheatBox.classList.contains("show")){
            $cheatBox.classList.remove("show");
            $inputDia.focus();
        }
    });

    //Reset click count on blur
    btnHeart.addEventListener('blur', () => {clickCountBtnHeart = 0;});

    $inputCheatBox.addEventListener('keydown', (e) => {
        if(e.key === "Enter"){
            submitCheat($inputCheatBox.value.toLowerCase());
        }
    });

    //Apply dates
    let $dates = document.querySelector("#dates");
    let html = "";
    dates.forEach((date) => {
        html += "<section><h2>"+date.date+"</h2><p>"+date.description+"</p></section>";
    });

    $dates.innerHTML += html;
});

window.addEventListener('keydown', (e) => {
    if(e.key === "\"" && e.shiftKey){
        if($cheatBox.classList.contains("show")){
            $cheatBox.classList.remove("show");
            $inputDia.focus();
        }else{
            $cheatBox.classList.add("show");
            $cheatBox.querySelector("input").focus();
        }
        
        e.preventDefault();
    }
});