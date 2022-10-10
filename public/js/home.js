const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};


document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function(){
    window.location.href = "transactions.html"
})

// add lançamento

document.getElementById("transaction-form").addEventListener("submit", function(e){
   e.preventDefault();

   const value = parseFloat(document.getElementById("value-input").value);
   const description = document.getElementById("description-input").value;
   const date = document.getElementById("date-input").value;
   const type = document.querySelector('input[name="type-input"]:checked').value;

   data.transactions.unshift({
        value: value, type: type, description: description, date: date
   });

   saveData(data);
   e.target.reset();
   myModal.hide();

   getCashIn();

   getCashOut();

   getTotal();
   

   alert("Lançamento efetuado com sucesso!");

});

checkLogged();


function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged){
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);

    if(dataUser){
        data = JSON.parse(dataUser);
    }

    getCashIn();

    getCashOut();

    getTotal();

}

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

//calculadora

function getCashIn (){
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type == "1");
    let cashInHtml = ``;

    if(cashIn.length){
        let limit = 0;
    }

    if(cashIn.length > 5){
        limit = 5;
    } else{
        limit = cashIn.length;
    }
//" data-bs-toggle="modal" data-bs-target="#confirm-delete"
    for (let index = 0; index < limit; index++) {
        cashInHtml += `
        <tr>
        <div class="row mb-4">
            <td>
                <div class="col-6 p-2">    
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                </div>
                <div class="col-6 d-flex justify-content-end">
                        <button type="button" class="btn fs-4 col-md-3" id="delete-button">
                        <i class="bi bi-trash-fill color-danger"></i>
                        </button>
                </div>
            </td>
            <td>
                <div class="col-12 col-md-8">
                <p> ${cashIn[index].description}</p>
                </div>
            </td>
            <td>
                <div class="col-12 col-md-3 d-flex justify-content-end">
                ${cashIn[index].date}
                </div>
            </td>
            
        </div>
        </tr>`;
        
    }

    document.getElementById("cash-in-list").innerHTML = cashInHtml;

}

function getCashOut (){
    const transactions = data.transactions;

    const cashOut = transactions.filter((item) => item.type == "2");
    let cashOutHtml = ``;

    if(cashOut.length){
        let limit = 0;
    }

    if(cashOut.length > 5){
        limit = 5;
    } else{
        limit = cashOut.length;
    }

    for (let index = 0; index < limit; index++) {
        cashOutHtml += `
        <tr>
        <div class="row mb-4">
            <td>
                <div class="col-6 p-2">    
                    <h3 class="fs-2">R$ ${cashOut[index].value.toFixed(2)}</h3>
                </div>
                <div class="col-6 d-flex justify-content-end">
                        <button class="btn fs-4 col-md-3 ">
                        <i class="bi bi-trash-fill color-danger"></i>
                    </button>
                </div>
            </td>
            <td>
                <div class="col-12 col-md-8">
                <p> ${cashOut[index].description}</p>
                </div>
            </td>
            <td>
                <div class="col-12 col-md-3 d-flex justify-content-end">
                ${cashOut[index].date}
                </div>
            </td>
            
        </div>
        </tr>`;
        
    }

    document.getElementById("cash-out-list").innerHTML = cashOutHtml;
  

}

function getTotal(){
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if(item.type === "1"){
            total += item.value;
        }else{
            total -= item.value;
        }

    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
    console.log(total);
}
