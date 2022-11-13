let DivLoja = document.getElementById("loja");

let DivCarrinho = document.getElementById("div-carrinho");

let ListaItensAbaCarrinho = document.getElementById("lista-itens-adicionados")

let NumberCartIcon = document.getElementById("quantidade-itens-carrinho")





//create an array wich will represents the user basket, with the prodcuts chosen within;

let carrinho = []


//create a function to generates an organized html text based on the shop data(variable ShopData);

let gerarLoja = () => {


    //map all the elements(x), wich are arrays, of ShopData (the data store). Put it in a variable called 'shop';

    let shop = ShopData.map((x) => {

        //take the name of the section(x[0]- the first element of x, wich is an array containing the name of a section(x[0]) and the products list(x[1])), and put in a variable called 'idSessao', removing the spaces with the replace() function, to aplly after in the id of the div wich will represent the whole section;

        let idSessao = (x[0]).replace(" ", "");

        //take only the first element of x(each element of the ShopData), wich is the name of the section, and put it in a variable called 'sessao';

        let sessao = `<h1 class='titulo-sessao'>${x[0]}</h1>`

        // take only the second element of x(each element of the ShopData), wich is an array containing all the products of a section, and maps it to return a <li> (with the id, name, desc and price of the product) for each product. And put it in a variable called 'itens'. If there are 10 products in the section, the variable value will be 10 <li>. Don't forget of the .join("") function to remove the commas, between each <li>;

        let itens = (x[1]).map((y) => {
            let {id, nome, price, desc} = y;
            return `
            <li id='${id}' class='item'><h2>${nome}</h2><span>${desc}</span>
            <p class='price'>R$ ${price}<span id='addbutton' class='pricebutton' onclick='increment("${id}")'>+</span></p>
            </li>
            `
        }).join("");

        // Return a div with the name of the section(variable 'sessao') and a <ul> containinig the products(variable 'itens')

        return `<div id='${idSessao}' class='div-sessao'>${sessao}<ul class='itens-list'>${itens}</ul></div>`


    }).join("");


    //Now the variable 'shop' has a semantic HTML with all the sections and their products organized in tittles and lists, and will automatically change every time i remove or add a new section or product.

    //Return the 'shop' inside the DivLoja(variable of the html element chosen to contain the Shop info)

    return DivLoja.innerHTML = shop;

};

gerarLoja();


//create a function that increments a especific product(the argument 'id') to the client basket

let increment = (id) => {

    let searchBask = carrinho.find((x)=> x.id === id);

    if (searchBask === undefined) {

        carrinho.push({
            id: id,
            quant: 1
        });

    } else {
        searchBask.quant += 1;
    };

    console.log(carrinho);

    AtualizarAbaCarrinho();
    CalcularQuantidadeItens();
}


//create another function, but that now decrements a product('id' argument) of the client basket

let decrement = (id) => {

    let searchBask = carrinho.find((x)=> x.id === id);
    let searchIndex = carrinho.findIndex((x) => x.id === id);

    if (searchBask === undefined){
        console.log("voce ainda nao adicionou este produto para remove-lo");
    } else {
        if (searchBask.quant === 1) {
            carrinho.splice(searchIndex, 1);
        } else {
            searchBask.quant -= 1;
        }
        console.log(carrinho)
    }

    AtualizarAbaCarrinho();
    CalcularQuantidadeItens();

};


//create a function to update the cart site with the client basket;
let AtualizarAbaCarrinho = () => {


    //map the client basket and return it on the cart site
    let search = carrinho.map((x) => {

        let {id, quant} = x;
        
        //find the array where the itens is, by searching all the arrays within the ShopData;
        let findItemSection = ShopData.find((y) => {
            //specify that the item is in the second index of this array;
            let findSection = (y[1]).find((z) => z.id === id)
            //return that array;
            return findSection;
        })

        //with the array(section) found, find the item(object) wich is in the second index;
        let findItem = (findItemSection[1]).find((v) => v.id === id)
        //put the price property of the item in a variable, to a better mainpulation; 
        let priceFound = findItem.price
        let nameFound = findItem.nome
        
        //calculate the price multiplies by de item quantidy , and put in a variable to a better manipulation;
        let calculation = priceFound*quant

        //return your HTML with all the informations that you colect;
        return `
        <li class='item-card-cartsite'>
        <h1>${nameFound}</h1>
        <p class='price'><span id='removebutton' class='pricebutton' onclick='decrement("${id}")'>-</span>${quant}<span id='addbutton' class='pricebutton' onclick='increment("${id}")'>+</span><span class='price-item-cartSite'>R$ ${calculation}</span></p></li>
        <span id='total-bill'>0</span>`
    }).join("");

    ListaItensAbaCarrinho.innerHTML = search;
}


//Create a function to calculate the total amount of itens within the client basket, and put this in the cart icon;
let CalcularQuantidadeItens = () => {

    if (carrinho.length === 0) {
        NumberCartIcon.innerHTML = "0";
        console.log("seu carrinho está vazio")
        ListaItensAbaCarrinho.innerHTML = "<div class='div-carrinho-vazio'><p class='carrinho-vazio'>Seu carrinho está vazio</p><button class='button-voltar' onclick='FecharCarrinho()'>Voltar para loja</button></div>"
    } else {
        let quantidade = carrinho.map((x) => x.quant).reduce((x, y) => x + y)
        NumberCartIcon.innerHTML = `${quantidade}`;

    }

}

//Create functions that open and close the basket site;
let MostrarCarrinho = () => {
    DivCarrinho.style.display = 'block';
};

let FecharCarrinho = () => {
    DivCarrinho.style.display = 'none';
};


CalcularQuantidadeItens();