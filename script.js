function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  // Add ingredients to form
  function addIngredient() {
    var newIngredient = createElement("input");
    newIngredient.setAttribute('type', 'text');
    newIngredient.setClass("form-control");

    var parent = document.getElementById("ingredientgroup");
    parent.appendChild(newIngredient);
  }

  
  //Sort alphabetically
  function sortList() {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("id01");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("DIV");
      // Loop through all list items:
      for (i = 0; i < (b.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Check if the next item should
        switch place with the current item: */
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          /* If next item is alphabetically lower than current item,
          mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }

  function desortList() {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("id01");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("DIV");
      // Loop through all list items:
      for (i = 0; i < (b.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Check if the next item should
        switch place with the current item: */
        if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
          /* If next item is alphabetically lower than current item,
          mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }

  // Second method of creating the filter (First had retrieved elements by ID, but caused issues when there were more than one ID)
   function filter() {
    var category = document.getElementById("category");
    var cat1 = category.options[category.selectedIndex].value;
  
    if (cat1 =="Breakfast") {
      document.getElementsByClassName("Breakfast")[0].style.display = "block";
      document.getElementsByClassName("Lunch")[0].style.display = "none";
      document.getElementsByClassName("Dinner")[0].style.display = "none";
      document.getElementsByClassName("Dessert")[0].style.display = "none";
      document.getElementsByClassName("Beverage")[0].style.display = "none";
      document.getElementsByClassName("Snack")[0].style.display = "none";

    } 
    else if (cat1 == "Lunch") {
      document.getElementsByClassName("Breakfast")[0].style.display = "none";
      document.getElementsByClassName("Lunch")[0].style.display = "block";
      document.getElementsByClassName("Dinner")[0].style.display = "none";
      document.getElementsByClassName("Dessert")[0].style.display = "none";
      document.getElementsByClassName("Beverage")[0].style.display = "none";
      document.getElementsByClassName("Snack")[0].style.display = "none";
    } 
    else if (cat1 == 'Dinner') {
      document.getElementsByClassName("Breakfast")[0].style.display = "none";
      document.getElementsByClassName("Lunch")[0].style.display = "none";
      document.getElementsByClassName("Dinner")[0].style.display = "block";
      document.getElementsByClassName("Dessert")[0].style.display = "none";
      document.getElementsByClassName("Beverage")[0].style.display = "none";
      document.getElementsByClassName("Snack")[0].style.display = "none";
    } 
    else if (cat1 == "Dessert") {
      document.getElementsByClassName("Breakfast")[0].style.display = "none";
      document.getElementsByClassName("Lunch")[0].style.display = "none";
      document.getElementsByClassName("Dinner")[0].style.display = "none";
      document.getElementsByClassName("Dessert")[0].style.display = "block";
      document.getElementsByClassName("Beverage")[0].style.display = "none";
      document.getElementsByClassName("Snack")[0].style.display = "none";
    } 
    else if (cat1 == "Beverage") {
      document.getElementsByClassName("Breakfast")[0].style.display = "none";
      document.getElementsByClassName("Lunch")[0].style.display = "none";
      document.getElementsByClassName("Dinner")[0].style.display = "none";
      document.getElementsByClassName("Dessert")[0].style.display = "none";
      document.getElementsByClassName("Beverage")[0].style.display = "block";
      document.getElementsByClassName("Snack")[0].style.display = "none";
    } 
    else if (cat1 == "Snack") {
      document.getElementsByClassName("Breakfast")[0].style.display = "none";
      document.getElementsByClassName("Lunch")[0].style.display = "none";
      document.getElementsByClassName("Dinner")[0].style.display = "none";
      document.getElementsByClassName("Dessert")[0].style.display = "none";
      document.getElementsByClassName("Beverage")[0].style.display = "none";
      document.getElementsByClassName("Snack")[0].style.display = "block";
    } 
    else {
     console.log("Did not work");
    }
  }
  
  /*
  //Category filter (Third method) trying to use pass the elemenets by classname through for loops
  function filter() {
    var category = document.getElementById("category");
    var cat1 = category.options[category.selectedIndex].value;
    
    let breakfast = document.getElementsByClassName("Breakfast");
    let lunch = document.getElementsByClassName("Lunch");
    let dinner = document.getElementsByClassName("Dinner");
    let dessert = document.getElementsByClassName("Dessert");
    let beverage = document.getElementsByClassName("Beverage");
    let snack = document.getElementsByClassName("Snack");
    console.log(dessert.length);

    for (let i = 0; i < breakfast.length; i++){
      if (cat1 =="Breakfast"){
        breakfast[i].style.display = "block";
        lunch[0].style.display = "none";
        dinner[0].style.display = "none";
        dessert[0].style.display = "none";
        beverage[0].style.display = "none";
        snack[0].style.display = "none";
      } else {
        
      }
    }
    for (let i = 0; i < lunch.length; i++){
      if (cat1 =="Lunch"){
        breakfast[0].style.display = "none";
        lunch[i].style.display = "block";
        dinner[0].style.display = "none";
        dessert[0].style.display = "none";
        beverage[0].style.display = "none";
        snack[0].style.display = "none";
      } else {
      }
    }
    for (let i = 0; i < dinner.length; i++){
      if (cat1 =="Dinner"){
        breakfast[0].style.display = "none";
        lunch[0].style.display = "none";
        dinner[i].style.display = "block";
        dessert[0].style.display = "none";
        beverage[0].style.display = "none";
        snack[0].style.display = "none";
        
      } else {
      }
    }
    for (let i = 0; i < dessert.length; i++){
      if (cat1 =="Dessert"){
        breakfast[0].style.display = "none";
        lunch[0].style.display = "none";
        dinner[0].style.display = "none";
        dessert[i].style.display = "block";
        beverage[0].style.display = "none";
        snack[0].style.display = "none";
    
      } else {
      }
      
    }
    for (let i = 0; i < beverage.length; i++){
      if (cat1 =="Beverage"){
        breakfast[0].style.display = "none";
        lunch[0].style.display = "none";
        dinner[0].style.display = "none";
        dessert[0].style.display = "none";
        beverage[i].style.display = "block";
        snack[0].style.display = "none";
      }
      else {
      }
    }
    for (let i = 0; i < snack.length; i++){
      if (cat1 =="Snack"){
        breakfast[0].style.display = "none";
        lunch[0].style.display = "none";
        dinner[0].style.display = "none";
        dessert[0].style.display = "none";
        beverage[0].style.display = "none";
        snack[i].style.display = "block";
      } else {
      }
    }
      }*/