window.addEventListener("DOMContentLoaded", () => {
  var ListeRecette = document.getElementById("ListeRecette");
  ajout = document.getElementsByClassName("submit");
  verif = document.getElementsByClassName("verif");
  ResultatFinal = document.getElementById("result");
  platArray = [];
  countFood = [0, 0, 0];
  food = [];
  ajout[0].addEventListener("click", function () {
    formule = document.getElementById("ingredient").value;
    image = document.getElementById("UrlImage").value;
    if (formule && image) {
      count = 0;
      NomRecette = "";
      ingredient = "";
      for (let index = 0; index < formule.length; index++) {
        if (formule[index] == "=") {
          index++;
          count++;
        }
        if (count != 1) {
          ingredient += formule[index];
        } else {
          NomRecette = NomRecette + formule[index];
        }
      }
      platArray.push([NomRecette, ingredient, image]);
      var newDiv = document.createElement("div");
      var newDiv2 = document.createElement("div");
      var newNom = document.createElement("p");
      var newRecette = document.createElement("p");
      var newImg = document.createElement("img");
      newImg.src = image;
      var newContentN = document.createTextNode(NomRecette);
      var newContentI = document.createTextNode(ingredient);
      newNom.appendChild(newContentN);
      newRecette.appendChild(newContentI);
      newDiv2.appendChild(newNom);
      newDiv2.appendChild(newRecette);
      newDiv2.classList.add("BoxInRecette");
      newDiv.appendChild(newDiv2);
      newDiv.appendChild(newImg);
      newDiv.classList.add("BoxRecette");
      ListeRecette.appendChild(newDiv);
    }
  });
  for (let i = 0; i < document.getElementsByTagName("span").length; i++) {
    document.getElementsByTagName("span")[i].addEventListener("click", function (e) {
      for (let y = 0;y < document.getElementsByClassName("choix").length;y++) {
        var element = document.getElementsByClassName("choix")[y];
        if (element.textContent == e.target.textContent) {
          countFood[y]++;
          document.getElementsByClassName("count")[y].style.backgroundColor =
            "lightgreen";
          document.getElementsByClassName("count")[y].textContent =
            countFood[y];

          break;
        }
        if (!element.textContent) {
          element.textContent = e.target.textContent;
          food.push(e.target.textContent);
          countFood[y]++;
          break;
        }
      }
    });
  }
  verif[0].addEventListener("click", function () {
    search = [];
    for (let i = 0; i < food.length; i++) {
      element = food[i] + "*" + countFood[i];
      search.push(element);
    }
    searchString = search.join("+");
    if (!platArray[0]) {
      alert("aucun recette");
    } else {
      for (let index = 0; index < platArray.length; index++) {
        while (ResultatFinal.firstChild) {
          ResultatFinal?.removeChild(ResultatFinal.lastChild);
        }
        if (platArray[index][1].replace(/ /g, "") == searchString) {
          var bravo = document.createElement("h2");
          var ResultName = document.createElement("p");
          var ResultImg = document.createElement("img");
          var resultcontentName = document.createTextNode(platArray[index][0]);
          var resultcontentbravo = document.createTextNode("Bravo Vous venez de préparer");
          ResultImg.src = platArray[index][2];
          bravo.appendChild(resultcontentbravo);
          ResultName.appendChild(resultcontentName);
          ResultatFinal.appendChild(bravo);
          ResultatFinal.appendChild(ResultName);
          ResultatFinal.appendChild(ResultImg);
        } else {
          if (index == platArray.length-1) {
            alert("cette recette n'existe pas ou ce n ai pas le bonne ordre");
          }
        }
      }
      food = [];
      countFood = [0, 0, 0];
      for (let index = 0;index < document.getElementsByClassName("count").length;index++){
        
        if (document.getElementsByClassName("count")[index].lastChild) {
          document.getElementsByClassName("count")[index].removeChild(document.getElementsByClassName("count")[index].lastChild);
          document.getElementsByClassName("count")[
            index
          ].style.backgroundColor = "white";
        }
      }
      for (let index = 0;index < document.getElementsByClassName("choix").length;index++) {
        document.getElementsByClassName("choix")[index].removeChild(document.getElementsByClassName("choix")[index].lastChild);
      }
    }
  });
});
