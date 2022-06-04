const listPrice = {
    "Expreso": 70,
    "Capuccino": 80,
    "Capuccino Vainilla": 80,
    "Mocha": 75,
    "Cortado": 60
};

const listCoffee = [
    "Expreso",
    "Capuccino",
    "Capuccino Vainilla",
    "Mocha",
    "Cortado"
];

const listItemCart = document.querySelector("tbody").childNodes;

isExitsInCart = element => {
    if (listItemCart.length > 0) {
        let isExists = true;
        listItemCart.forEach((child) => {
            if (child.id === "tr-" + element.target.name) {
                isExists = false;
            }
        });

        if (isExists) addItemCart(element);
    } else {
        addItemCart(element);
    }

};

addItemCart = element => {
    const tableBody = document.getElementById("table-body");

    const tableRow = document.createElement("tr");
    tableRow.id = "tr-" + element.target.name;

    const td_product = document.createElement("td");
    td_product.textContent = element.target.name;

    const td_quantity = document.createElement("td");
    let btnLess = document.createElement("button");
    btnLess.id = element.target.name;
    btnLess.className += " btn btn-success ";
    btnLess.textContent = "-";
    btnLess.addEventListener("click", btnActionless);

    let quantity = document.createElement("input");
    quantity.id = element.target.name;
    quantity.value = 1;

    let btnPlus = document.createElement("button");
    btnPlus.id = element.target.name;
    btnPlus.className += " btn btn-success ";
    btnPlus.textContent = "+";
    btnPlus.addEventListener("click", btnActionPlus);

    td_quantity.appendChild(btnLess);
    td_quantity.appendChild(quantity);
    td_quantity.appendChild(btnPlus);

    const td_price = document.createElement("td");
    td_price.innerHTML = `$${listPrice[element.target.name]}.00`;

    const td_button = document.createElement("td");
    let btnDelete = document.createElement("a");
    btnDelete.id = element.target.name;
    btnDelete.className += " btn btn-danger";
    btnDelete.textContent = "Eliminar";
    btnDelete.addEventListener("click", element => {
        document.getElementById("tr-" + element.target.id).remove();
        changeTotales();
    });

    td_button.appendChild(btnDelete);


    tableRow.appendChild(td_product);
    tableRow.appendChild(td_quantity);
    tableRow.appendChild(td_price);
    tableRow.appendChild(td_button);

    tableBody.appendChild(tableRow);
    changeTotales();
};

generateMenu = () => {
    const listViews = document.getElementById("list");

    const nodeListUnorder = document.createElement("ul");
    nodeListUnorder.className += " list-group"

    listCoffee.forEach((element) => {
        let nodeButton = document.createElement("button");
        nodeButton.innerHTML = "Agregar";
        nodeButton.name = element;
        nodeButton.className += " btn btn-success"
        nodeButton.addEventListener("click", isExitsInCart);

        let listItem = document.createElement("li");
        listItem.className += "list-group-item d-flex justify-content-between align-items-start";
        listItem.innerHTML = `${element} $${listPrice[element]}.00 `;
        listItem.appendChild(nodeButton);

        nodeListUnorder.appendChild(listItem);
    });

    listViews.appendChild(nodeListUnorder);
};

btnActionless = element => {
    listItemCart.forEach((child) => {
        if (child.id === "tr-" + element.target.id) {
            let inputquantity = child.childNodes[1].childNodes[1];
            if (inputquantity.value > 1) {
                inputquantity.value--;
                changePrice(
                    child.childNodes[2].childNodes[0],
                    listPrice[element.target.id],
                    inputquantity.value
                );
            }
        }
    });
    changeTotales();
};

btnActionPlus = element => {
    listItemCart.forEach((child) => {
        if (child.id === "tr-" + element.target.id) {
            let inputquantity = child.childNodes[1].childNodes[1];
            if (inputquantity.value < 15) {
                inputquantity.value++;
                changePrice(
                    child.childNodes[2].childNodes[0],
                    listPrice[element.target.id],
                    inputquantity.value
                );
            }

        }
    });
    changeTotales();
};

changePrice = (element, price, quantity) => {
    element.textContent = "$" + (quantity * price) + ".00";
};

changeTotales = () => {
    let sumItems = 0;
    let sumPrice = 0;
    listItemCart.forEach((child) => {
        let inputquantity = child.childNodes[1].childNodes[1];
        sumItems += Number.parseInt(inputquantity.value);
        sumPrice += Number.parseInt(inputquantity.value) * listPrice[inputquantity.id];
        console.log(sumItems + "." + sumPrice);
    });

    document.getElementById("countItems").textContent = sumItems;
    document.getElementById("sumPrice").innerHTML = `$${sumPrice}.00`;
}

window.addEventListener("load", () => {
    generateMenu();
});