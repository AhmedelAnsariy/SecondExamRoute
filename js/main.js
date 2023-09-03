////// global attributes 

let demo = document.getElementById("demo");
let seracDemo = document.getElementById("seracDemo");


//// for regular expression 
let nameT = false ;
let emailT = false ;
let phoneT = false;
let ageT = false ;
let PassT = false ;
let repassT = false;

//////////////////////////////////////////////////////////////////////








/////////////////////// start global function for website 
$(document).ready(function(){
    searchByName("").then(function(){
        $('#spinner').fadeOut(3500,function(){
                    $('body,html').css('overflow','auto');
                })
    })
})

// searchByName("");


function openLeftNavbar(){
    $(".leftNavbar").animate({
        left:0
}, 500)

$("#openIcon").addClass("d-none");
$("#closeIcon").removeClass("d-none");

for (let i = 0; i < 5; i++) {
  $(".navsLinks h5").eq(i).animate({
      top: 0
  }, 850)
}

}


let widthNav = $(".firstLefttNavber").outerWidth();

function closeLeftNavbar(){
    $(".leftNavbar").animate({
        left: -widthNav
}, 500)
$("#openIcon").removeClass("d-none");
$("#closeIcon").addClass("d-none");

$(".navsLinks h5").animate({
  top: 150
}, 500)


}


$('#openIcon').click(function(){
    openLeftNavbar();
})

$("#closeIcon").click(function(){
    closeLeftNavbar();
});



closeLeftNavbar();



/////////////////////// end  global function for website 










////////////////////////////// Start categories Function //////////////////////


async function getCategories(){
    demo.innerHTML = '';
    seracDemo.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayCateegoriese(response.categories);
}

function displayCateegoriese (arr){
    seracDemo.innerHTML = ""
    let cartona = "";
    for (let i=0 ; i<arr.length;i++){
        cartona += `
               <div class="col-md-3">
                       <div onclick="getCategoryMeals('${arr[i].strCategory}')  "class="meal">
                            <img class="w-100" src="${arr[i].strCategoryThumb}">
                            <div class="mealLayer">
                                <h3>${arr[i].strCategory}</h3>
                             <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                            </div>
                        </div>
               </div>
        `
    }
    demo.innerHTML = cartona ;
}


async function getCategoryMeals(category){
    seracDemo.innerHTML = ""
    demo.innerHTML = "";
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
     response = await response.json()
     displayMeals(response.meals.slice(0, 20))
}


////////////////////////////// end categories Function //////////////////////






////////////////////////////// Start Area Function //////////////////////


async function getAreaa(){
    seracDemo.innerHTML = ""
    demo.innerHTML = '';
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json();
    displayArea(respone.meals);
}


function displayArea(arr) {
    seracDemo.innerHTML = ""
    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center">

                         <i class="fa-solid fa-earth-americas text-black fs-2"></i>
                        <h3 class="text-black">${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }
    demo.innerHTML = cartona;
}



async function getAreaMeals(area) {
    seracDemo.innerHTML = ""
    demo.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
}

////////////////////////////// end Area Function //////////////////////








/////////////////////// start  ingredients Function  ////////////////////////////////////////


async function getIngredients(){
    seracDemo.innerHTML = ""
    demo.innerHTML = '';
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json();
    displayIngredients(respone.meals.slice(0,20));
}


function displayIngredients(arr){
    seracDemo.innerHTML = ""
    let cartona = "";
    for (let i=0 ; i<arr.length ; i++){
        cartona +=
        `
        <div class="col-md-3 text-white">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center">
                <i class="fa-solid fa-bone fs-1"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }
    demo.innerHTML = cartona ;
}

async function getIngredientsMeals(ingredients){
    seracDemo.innerHTML = ""
    demo.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json();
    displayMeals(response.meals.slice(0,20));
}


////////////////////////// end   ingredients Function//////////////////////////////////////



////////////////////// Start Search section and Function ////////////////////


function displaySearchInputsForm(){
    demo.innerHTML = "";
    seracDemo.innerHTML = ` 
    <div class="col-md-6 mt-5  seinp ">
    <input onkeyup="searchByName(this.value)"     class="form-control bg-black text-white"  type="text" placeholder="search by name">
    </div>

<div class="col-md-6 mt-5    seinp">
    <input onkeyup="searchByFirstLetter(this.value)" class="form-control bg-black text-white " type="text" placeholder="search by first letter"  maxlength="1">
</div>
    `
}

async function  searchByName (food){
    closeLeftNavbar();
    demo.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
    response = await response.json();
    if (response.meals) {
        displayMeals(response.meals);
      } else {
        displayMeals([]);
      }
}

async function searchByFirstLetter(food){
    closeLeftNavbar();
    demo.innerHTML = "";
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${food}`)
    response = await response.json()
    if (response.meals) {
        displayMeals(response.meals);
      } else {
        displayMeals([]);
      }
}


////////////////////// End  Search section and Function ////////////////////




/////////////////////////// start  shared Function  for three parts  //////////////////////////////// 

function displayMeals(arr){
  let cartona = "";
   for (let i = 0; i < arr.length; i++) {
     cartona += `
     <div class="col-md-3">
                     <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal">
                         <img class="w-100" src="${arr[i].strMealThumb}" >
                         <div class="mealLayer">
                             <h3>${arr[i].strMeal}</h3>
                         </div>
                    </div>
           </div>
     `
   }
   demo.innerHTML = cartona ;
}


async function  getMealDetails (mealID){
  closeLeftNavbar();
  demo.innerHTML ="";
  // demoSerach.innerHTML=""
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  respone = await respone.json();
    displayMealDetails(respone.meals[0]);
}



function displayMealDetails (meal){
  // demoSerach.innerHTML = "";
 
  let detailsFood = '';
  for (let i = 1; i < 20; i++) {
      if (meal[`strIngredient${i}`]) {
          detailsFood += `<li class="m-2 p-2 fs-5">${meal[`strMeasure${i}`]}  ${meal[`strIngredient${i}`]} </li>`
      }
}


let cartona = ` <div class="col-md-4 text-white">
<img class="w-100" src="${meal.strMealThumb}">
  <h4 class="text-center">${meal.strMeal}</h4>
</div>
<div class="col-md-8 text-white">
<h2>Instructions</h2>
<p>${meal.strInstructions}</p>
<h3><sapan>Area = </sapan>${meal.strArea}</h3>
<h3><sapan>Category = </sapan>${meal.strCategory}</h3>
<h3>recipes are </h3>

  ${detailsFood}



<a  href="${meal.strSource}" class="btn btn-success" target="_blank">source</a>
<a  href="${meal.strYoutube}" class="btn btn-danger" target="_blank" >youtube</a>
</div>
`

demo.innerHTML = cartona ;
}


/////////////////////////// end  shared  Function  for three parts  //////////////////////////////// 





////////////////////// Start    contact Section ///////////////


// show inputs 

function ShowContactsMneu(){
    seracDemo.innerHTML = "";
    demo.innerHTML = `
    
    <div class="col-md-6">
    <input type="text" id="NameInpu" class="form-control m-4" placeholder="enter Name" onkeyup="IsInputVali()">
    <div id="nameError" class="alert alert-danger w-75 my-3 ms-4 d-none">
        enter valid name
    </div>
  </div>


  <div class="col-md-6">
    <input type="email" id="EmailInpu" class="form-control m-4" placeholder="enter email" onkeyup="IsInputVali()">
    <div id="emailError" class="alert alert-danger w-75 my-3 ms-4 d-none">
        enter valid email @ahmed@abc.com
    </div>
  </div>


  <div class="col-md-6">
    <input type="text" id="phoneInpu" class="form-control m-4" placeholder="enter phone" onkeyup="IsInputVali()">
    <div id="phoneError" class="alert alert-danger w-75 my-3 ms-4 d-none">
        enter valid phone
    </div>
  </div>


  <div class="col-md-6">
    <input type="number" id="ageInpu" class="form-control m-4" placeholder="enter age" onkeyup="IsInputVali()">
    <div id="AgeError" class="alert alert-danger w-75 my-3 ms-4 d-none">
        enter valid age
    </div>
  </div>




  <div class="col-md-6">
    <input type="password" id="passInpu" class="form-control m-4" placeholder="enter pass" onkeyup="IsInputVali()">
    <div id="passError" class="alert alert-danger w-75 my-3 ms-4 d-none">
        enter valid password
    </div>
  </div>




  <div class="col-md-6">
    <input type="password" id="repassInpu" class="form-control m-4" placeholder="Re write  pass" onkeyup="IsInputVali()">
    <div id="repassError" class="alert alert-danger w-75 my-3 ms-4 d-none">
        enter password again
    </div>
  </div>

  <div class="d-flex justify-content-center">
  <button id="submitContact" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
</div>

    `
    let   submitContact = document.getElementById("submitContact");

    document.getElementById("NameInpu").addEventListener("focus",()=>{
       nameT = true;
    })

    document.getElementById("EmailInpu").addEventListener("focus",()=>{
       emailT = true;
    })

    document.getElementById("phoneInpu").addEventListener("focus",()=>{
      emailT  = true;
    })


    document.getElementById("phoneInpu").addEventListener("focus",()=>{
       phoneT = true;
    })

    document.getElementById("ageInpu").addEventListener("focus",()=>{
     ageT   = true;
    })

    document.getElementById("passInpu").addEventListener("focus",()=>{
      PassT  = true;
    })

    document.getElementById("repassInpu").addEventListener("focus",()=>{
        repassT  = true;
      })


}



//// check for regular expresseion  and display error massage and check button  disable on enable 

function IsInputVali(){
    if (nameT) {
      if (nameRex()) {
        document.getElementById("nameError").classList.replace("d-block", "d-none");
      } else {
        document.getElementById("nameError").classList.replace("d-none", "d-block");
      }
    }

    if (emailT) {
      if (emailRex()) {
        document.getElementById("emailError").classList.replace("d-block", "d-none");
      } else {
        document.getElementById("emailError").classList.replace("d-none", "d-block");
      }
    }

    if (phoneT) {
      if (phoneRex()) {
        document.getElementById("phoneError").classList.replace("d-block", "d-none");
      } else {
        document.getElementById("phoneError").classList.replace("d-none", "d-block");
      }
    }

    if (ageT) {
      if (ageRex()) {
        document.getElementById("AgeError").classList.replace("d-block", "d-none");
      } else {
        document.getElementById("AgeError").classList.replace("d-none", "d-block");
      }
    }

    if (PassT) {
      if (passRex()) {
        document.getElementById("passError").classList.replace("d-block", "d-none");
      } else {
        document.getElementById("passError").classList.replace("d-none", "d-block");
      }
    }

    if (repassT) {
      if (repassRex()) {
        document.getElementById("repassError").classList.replace("d-block", "d-none");
      } else {
        document.getElementById("repassError").classList.replace("d-none", "d-block");
      }
    }

    if (
      nameRex() &&   emailRex() &&  phoneRex() &&  ageRex() &&   passRex() &&  repassRex()
    ) {
      submitContact.removeAttribute("disabled");
    } else {
      submitContact.setAttribute("disabled");
    }


}





//// every input with it's rgular expression function 

function nameRex (){
    return  (/^[a-zA-Z\s']+$/.test(document.getElementById("NameInpu").value))
}


function emailRex(){
    return (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(document.getElementById("EmailInpu").value))
}


function phoneRex(){
        return(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInpu").value))
}


 function ageRex(){
  return (/^(0?[1-9]|[1-9][0-9]+)$/.test(document.getElementById("ageInpu").value));

 }

function passRex(){
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("passInpu").value))

}

function repassRex(){
    return document.getElementById("repassInpu").value == document.getElementById("passInpu").value

}

////////////////////// End   contact Section ///////////////


















