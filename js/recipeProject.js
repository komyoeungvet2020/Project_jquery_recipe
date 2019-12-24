// function of get Url and return Url
function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
// function used for change data from recipes
$(document).ready(function(){
    requestApi();
    $('#recipe').on('change',function(){
        var chooseRecipe = $('#recipe').val();
        getRecipe(chooseRecipe);
// function add number 
 $('#add').on('click', function(){
     var addNumber = $('#members').val();
     var increaseNum = parseInt(addNumber) + 1;
     if(increaseNum <= 15 ){
     $('#members').val(increaseNum);
     executeNumber(increaseNum);
   }
});
// function minus number
$('#minus').on('click', function(){
      var minusNumber = $('#members').val();
      var decreaseNum = parseInt(minusNumber) - 1;
      if(decreaseNum >= 1){
      $('#members').val(decreaseNum); 
      executeNumber(decreaseNum);
      }
     });
  });
});
// gat recipes by ajax
var AllData = [];
function requestApi(){
    $.ajax({
        dataType: 'json',
        url:getUrl(),
        success: (data) =>chooseRecipe(data.recipes),
        error  : () => console.log("Error")  
    });
}
// choose data from recipes
var allData = [];
function chooseRecipe(recipe){
    allData = recipe;
    var option = "";
    recipe.forEach(element => {
    option +=`<option value= "${element.id}">${element.name}</option>`;
    });
    $('#recipe').append(option);
}
// function of get recipes
var numberQuantity;
var oldGuest;
function getRecipe(id){
    allData.forEach(item =>{
        if(item.id == id){
            eachRecipe(item.name,item.iconUrl);
            eachIngredients(item.ingredients);
            eachInstructions(item.instructions);
            getNumber(item.nbGuests);
            oldGuest= item.nbGuests;      
            numberQuantity = item;  
        }
    });
}
// Display each of recipes
function eachRecipe(name,img){
    var data = "";
    data +=`
      <tr class="bg-dark">
     <th><h3 class="text-light" >${name}</h3></th>
     <th><img src="${img}" width="210"></th>
     </tr>
    `;
    $('#result').html(data);
}
// get numbers from recipes
var getNumber = (numbers) =>{
     result = "";
     result +=`
     <input  class="form-control text-center" value="${numbers}" disabled id="members" max="15"min="0">
        `;
     $('#calculate').html(result);
}
$('#jum').hide();
$('#minus').hide();// Hide minus button 
$('#add').hide();  // Hide add button
$('#person').hide();
$('#ingredients').hide();
// function each of the ingredient
function eachIngredients(ingredients){
    var datas = "";
     ingredients.forEach(element => {
        datas +=`
          <tr class=" text-center">
          <td><img src="${element.iconUrl}" width="100" class="img-fluid"></td>
          <td>${element.quantity}</td>
          <td>${element.unit[0].toLowerCase()}</td>
          <td>${element.name}</td>
          </tr>
          <div class="border-left d-sm-none d-md-block" style="width: 1px;"></div>
        `;
        $('#datas').html(datas);
        $('#ingredients').show();
        $('#person').show();
        $('#add').show();// show add button
        $('#minus').show();// show minus button
        $('#jum').show();
    });
}
$('#instruction').hide();
// function of instruction 
function eachInstructions(instructions){
     var split = instructions.split('<step>');
     var result = "";
     for(let i = 1; i < split.length; i++){
        result  +=`
        <div class="alert alert-success bg-dark">
        <h6 class="text text-primary">Step:${i}</h6>
        <p class="text-light">${split[i]}</p>
        </div>
       `;
$('#structor').html(result);
$('#instruction').show();
    }
}
// function of calculate data
var executeNumber = (newGuest) =>{
    var getQuantity= "";
    numberQuantity.ingredients.forEach(quant => {
        getQuantity +=`
        <tr class ="text-center bg-dark ">
        <td><img src ="${quant.iconUrl}" width="100" class="img-fluid"></td>
        <td>${quant.quantity * newGuest/oldGuest}</td>
        <td>${quant.unit[0].toLowerCase()}</td>
        <td>${quant.name}</td>
        </tr>
        `;
        $('#datas').html(getQuantity);
    });
    return parseInt(newGuest);
};