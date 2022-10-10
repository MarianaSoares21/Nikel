const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

//verifica se tem alguem logado
checkLogged();


//LOGAR NOS SISTEMA
document.getElementById("login-form").addEventListener("submit", function (e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    //segurança do email
    if(!account){
        alert("Verifique o usuário ou a senha.");
        return;
    }

    //segurança da senha
    if(account){
        if(account.password !== password){
            alert("Verifique o usuário ou a senha.");
            return;
        }

    saveSession (email, checkSession);

    // manda pro home
        window.location.href = "home.html";
    }

})



// CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();
    
    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5){
        alert("Preencha o campo com email valido");
        return;
    }

    if(password.length < 4){
        alert("Preencha a senha de no minimo 4 digitos")
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions:[]
    });

    //quando termina de cirar oculta
    myModal.hide();



    alert("Conta Criada com sucesso!");
});

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

//salvando a sessão
function saveSession(data, saveSession){
    //não perde apos finalizar a sessão
    if(saveSession){
        localStorage.setItem("session", data);
    }
    //fica salvo somente na sessão
    sessionStorage.setItem("logged", data);
}

function getAccount(key){
    
    const account = localStorage.getItem(key);

    if (account){
        return JSON.parse(account);
    }

    return "";
}
