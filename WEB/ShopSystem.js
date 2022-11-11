let DivLoja = document.getElementById("loja");



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
            <p class='price'><span id='removebutton' class='pricebutton' onclick='decrement("${id}")'>-</span>R$ ${price}<span id='addbutton' class='pricebutton' onclick='increment("${id}")'>+</span></p>
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

};
