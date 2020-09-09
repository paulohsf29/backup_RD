var pagamentos = document.getElementById("pagamento");
var proxima = document.getElementById("confirmaCompra");



proxima.onclick = function () {
    var pagtoSelec;
    pagtoSelec = pagamentos.options[pagamentos.selectedIndex].value;
    
    if(pagtoSelec == "deb"){
        $('#modalDebito').modal('show');
    }
    if(pagtoSelec == "cred"){
        $('#modalCredito').modal('show');
    }
    if(pagtoSelec == "din"){
        $('#modalDinheiro').modal('show');
    }
    if(pagtoSelec == "mesc"){
        $('#modalDuasFormas').modal('show');
    }
};
 