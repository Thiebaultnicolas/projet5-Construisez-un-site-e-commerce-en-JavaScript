const produit = window.location.search.split("?").join("");
const urlParams = new URLSearchParams(produit);
console.log(produit);
const id = urlParams.get("id")
console.log(id)


fetch(`http://localhost:3000/api/products/${id}`)
.then ((res) => res.json())
.then((products) => displayProducts(products))
.catch((error) => {
    console.error(error);
})

function displayProducts(produits) {

    const sectionItem__img = document.querySelector(".item__img");
    console.log(sectionItem__img);

    const {_id, imageUrl, altTxt, name, description, colors ,price } = produits ;
   
    

    const image = document.createElement("img")
    image.src=`${imageUrl}`
    image.alt=`${altTxt}`
   

    const nom = document.querySelector("#title");
    nom.innerText=`${name}`

    const nodePrice = document.querySelector("#price")
    nodePrice.innerText=`${price}`

    const nodeDescription = document.querySelector("#description");
    nodeDescription.innerText=`${description}`

    colors.forEach(color => {
        const nodeColors = document.createElement("option")
        nodeColors.value=`${color}` 
        nodeColors.innerText=`${color}`
        select.appendChild(nodeColors)
    });

    sectionItem__img.appendChild(image)
      
}


const select = document.querySelector("#colors")
const quantity = document.querySelector("#quantity")


 //////////////////////////////// localStorage////////////////////////////////////////

//Ajout dans le panier

function addproduct () {
    
   
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (basket === null) {
        basket = [];
    } 

    let canapeFound;

    for (let i = 0; i < basket.length; i ++) {
        const element = basket[i];
/*vérification si id du produit en cour  = egal a id de la page et si la couleur du produit en cour est égal a la couleur selectionnée*/
      if (basket[i] .id == id && basket[i] .color == select.value){
       canapeFound=basket[i]
      break;
      }   
    }

    if (canapeFound === undefined) {
        basket.push ( {
            id : id,
            color: select.value,
            quantity: quantity.value
        })
    } else {
        canapeFound.quantity = parseInt (canapeFound.quantity) + parseInt(quantity.value)
    }

  
    localStorage.setItem("basket", JSON.stringify(basket))
    
}


// au click du bouton ajoute addproduct 
addToCart.addEventListener("click", () => {
    const colors = document.getElementById("colors")
    const colorSelected = colors.options[colors.selectedIndex].value
    if (colorSelected === "") return window.alert("veuillez selectionner une couleur")
    const quantity = document.getElementById("quantity").value
    if (quantity > 100 || quantity < 1) return window.alert("quantité entre 1 et 100")
    addproduct();
    window.alert("Votre produit à bien étais ajouté au panier");   
})





