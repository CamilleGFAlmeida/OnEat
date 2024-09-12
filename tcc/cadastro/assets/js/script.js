const submitBtn = document.querySelector('.submit-btn'),
      phone = document.querySelector('#phone'),
      password = document.querySelector('#user-password'),
      passwordConfirm = document.querySelector('#user-password-confirm'),
      email = document.querySelector('#mail'),
      errorDisplayers = document.getElementsByClassName('error'),
      inputFields = document.querySelectorAll('input'),
      cardContainer = document.querySelector('.card-container'),
      outroOverlay = document.querySelector('.outro-overlay');

let count = 2;

function onValidation(current ,messageString, booleanTest){
    let message = current;
    message.textContent = messageString;
    booleanTest != 0 ? ++count : count;
}

for(let i=0; i<inputFields.length; i++){
    let currentInputField = inputFields[i];
    let currentErrorDisplayer = errorDisplayers[i];

    currentInputField.addEventListener('keyup', (e)=>{
        let message = currentErrorDisplayer;
        e.target.value != "" ? onValidation(currentErrorDisplayer, '', 0) : onValidation(currentErrorDisplayer, '*Preencha este campo', 0);
    })
}

phone.addEventListener('keyup', (e)=>{
    let message = errorDisplayers[3];
    e.target.value == e.target.value.replace(/\D/g,'') ? onValidation(message, '', 1) : onValidation(message, '*Preencha este campo', 0);
})

email.addEventListener('keyup', (e)=>{
    let message = errorDisplayers[2];
    mail.value.includes('@') & mail.value.includes('.com') ? onValidation(message, '', 1) : onValidation(message, '*Preencha este campo', 0);
})

password.addEventListener('keyup', (e)=>{
    let message = errorDisplayers[4];
    password.value.length >= 8 ? onValidation(message, '', 1) :  onValidation(message, 'Senha de no minimo 8 digitos', 0);
})

passwordConfirm.addEventListener('keyup', (e)=>{
    let message = errorDisplayers[5];
    password.value === e.target.value ? onValidation(message, '', 1) : onValidation(message, '*Senhas Inválidas', 0);
})

submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(count > 5){
        cardContainer.style.display = 'none';
        outroOverlay.classList.remove('disabled');
    }
    else{
        for(let i=0; i<errorDisplayers.length; i++){
            errorDisplayers[i].textContent = '*Preencha este campo';
        }
    }
})

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('address').value=("");
    document.getElementById('neighborhood').value=("");
    document.getElementById('city').value=("");
    document.getElementById('state').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('address').value=(conteudo.logradouro);
    document.getElementById('neighborhood').value=(conteudo.bairro);
    document.getElementById('city').value=(conteudo.localidade);
    document.getElementById('state').value=(conteudo.uf);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('address').value="...";
        document.getElementById('neighborhood').value="...";
        document.getElementById('city').value="...";
        document.getElementById('state').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};

function validaCPF(cpf) {
    var Soma = 0;
    var Resto;
  
    var strCPF = String(cpf).replace(/[^\d]/g, '');
    
    if (strCPF.length !== 11)
       return "CPF Inválido";
    
    if ([
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
      ].indexOf(strCPF) !== -1)
      return "CPF Inválido";
  
    for (i=1; i<=9; i++)
      Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  
    Resto = (Soma * 10) % 11;
  
    if ((Resto == 10) || (Resto == 11)) 
      Resto = 0;
  
    if (Resto != parseInt(strCPF.substring(9, 10)) )
      return "CPF Inválido";
  
    Soma = 0;
  
    for (i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  
    Resto = (Soma * 10) % 11;
  
    if ((Resto == 10) || (Resto == 11)) 
      Resto = 0;
  
    if (Resto != parseInt(strCPF.substring(10, 11) ) )
      return "CPF Inválido";
  
    return "";
  }
