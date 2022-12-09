const NumeroPoke = document.querySelector('.numeroDex');
const NomePoke = document.querySelector('.nomeDex');
const PokeNormal = document.querySelector('.pokeimgF');
const PokeShiny = document.querySelector('.pokeshiny');
const formulario = document.querySelector('.form');
const input_de_procura = document.querySelector('.procura');
const proximo = document.querySelector('.prox');
const anterior = document.querySelector('.ante');
const tipagem01 = document.getElementById('ty1');
const tipagem02 = document.getElementById('ty2');

var contagemPoke = 1;

const BuscaPoke = async (pokemon) => {
    const Resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   
    if (Resposta.status === 200)
    {
        const dados = await Resposta.json();
        return dados;   
    }
}
 
const LocalePoke = async (pokemon) => {
    const dados = await BuscaPoke(pokemon);

    if(dados)
    {
        NomePoke.innerHTML = dados.name;
        NumeroPoke.innerHTML = dados.id;
        PokeNormal.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        PokeShiny.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']; 
        contagemPoke = dados.id;
        tipagem01.innerHTML = dados.types[0].type.name;
        tipagem02.innerHTML = "---------";
        tipagem02.innerHTML = dados.types[1].type.name;
    }

    else
    {
        NomePoke.innerHTML = '??????';
        NumeroPoke.innerHTML = '???';
        PokeNormal.src = ''; 
        PokeShiny.src = '';
        tipagem01.innerHTML = "";
        tipagem02.innerHTML = "";
    }
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    LocalePoke(input_de_procura.value.toLowerCase());
    input_de_procura.value = '';
})

proximo.addEventListener('click', () => {
    contagemPoke += 1;
    LocalePoke(contagemPoke);
})

anterior.addEventListener('click', () => {
    if(contagemPoke > 1)
    {
        contagemPoke -= 1;
        LocalePoke(contagemPoke);
    }
    
})

LocalePoke(contagemPoke);
