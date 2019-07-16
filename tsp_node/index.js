class Node{
    constructor(id){
        this.id = id;
        this.routes = [];
    }
}

class Rota{
    constructor(noId,weight){
        this.destinoId = noId;
        this.weight = weight;
    }
}


const fs = require('fs');

var totalPopulation = 1000000;
var gaNodes = [];
var population = [];
var bestGaDistance = Infinity;
var oldbestGaDistance = Infinity;
var bestGaNodes = [];
var fitness = [];
var mutation = 0.1;
var generation = 0;

var file = fs.readFileSync("grafo.txt","utf-8");
file = file.split("\n");

const totalNodes = parseInt(file[0]);

console.log("Corrigindo arquivo.")
cleanFile();
createNodes();
console.log(gaNodes)
createRotas();


function cleanFile(){
    ultimoId = parseInt(file[file.length - 1]);
    if( isNaN(ultimoId)){
        file.pop(file.length - 1);
        cleanFile();
    }
       
}


function createNodes(){ 
    for(var i = 0; i< totalNodes; i++){
        var node = new Node(i+1);
        gaNodes.push(node);
    }
}

function createRotas(){
    for(var i = 1; i < file.length; i++){
        line = file[i].split(" ");        
        idOrigem = parseInt(line[0]);
        idDestino = parseInt(line[1]);
        custo = parseInt(line[2]);
        rota = new Rota(idDestino,custo);
        gaNodes[idOrigem - 1].routes.push(rota);
        
    }
}
//console.log(JSON.stringify(gaNodes,null,2));

createPopulation();
calulateFitness();
console.log("Iniciando "+getTimeNow())
   
runGeneticAlgoritimo()

function runGeneticAlgoritimo(){

    while(true){
        generation ++ ;
        calulateFitness();
        normalizeFitness();
        nextGeneration(mutation);
       // console.log("Menor Distância ", bestGaDistance);
        process.stdout.write("Menor Distância "+ bestGaDistance + " "+generation+"ª Geração");
        process.stdout.cursorTo(0);


        if(oldbestGaDistance != bestGaDistance){
            let rota = getRota(bestGaNodes);
            console.log(generation +"ªGeração encontrou uma rota ")
            console.log("Rota: "+rota+" Dustância: " +bestGaDistance+" "+getTimeNow());
            oldbestGaDistance = bestGaDistance;
        }
        
    }

}

function getTimeNow(){
    // Guarda cada pedaço em uma variável
        let data = new Date();
        let dia     = data.getDate();           // 1-31
        let mes     = data.getMonth();          // 0-11 (zero=janeiro)
        let ano4    = data.getFullYear();       // 4 dígitos
        let hora    = data.getHours();          // 0-23
        let min     = data.getMinutes();        // 0-59
        let seg     = data.getSeconds();        // 0-59

        // Formata a data e a hora (note o mês + 1)
        let str_data = dia + '/' + (mes+1) + '/' + ano4;
        let str_hora = hora + ':' + min + ':' + seg;

        // Mostra o resultado
        return 'Hoje é ' + str_data + ' às ' + str_hora;
}
function calulateFitness(){

    for(var i = 0;i < totalPopulation;i++){
        var currentRecord = Infinity;

        var arr = getFitness(population[i]);
        var f = arr[0];
        var w = arr[1];
       
        if(w < bestGaDistance && w != -1){
            bestGaDistance = w;
            bestGaNodes = population[i].slice();
           
        }
        if(f < currentRecord){
            currentRecord = f;
            gaNodes = population[i];
        }

        fitness[i] = 1/(Math.pow(f, 8) + 1);
    }
    
}

function getRota(arr){
    if(arr.length>0){
        let str = "";
        for(var i = 0; i < totalNodes; i++){
            str += arr[i].id + " "
        }
        return str;
    }
    return "";
}
function getFitness(arr){
    totalFitness = 0;
    totalWeight = 0;
    let hasPath = true;
    for(var i = 0; i<totalNodes; i ++ ){
        let w = 0;
        if (i+1<totalNodes){
            w  = getWeight(arr,i,i+1);
            if(w == -1){
                w = 0;
                hasPath = false;
            }
        }else{
            w = getWeight(arr,i,0); 
            if(w == -1){
                w = 0;
                hasPath = false;
            }
        }
        totalFitness += w;
       
    }
    totalWeight = totalFitness;
    if(!hasPath) totalWeight = -1;
    res = [ totalFitness,totalWeight]
    return res; 
}

function getWeight(arr,origenIndex,destinyIndex){
    rotas = arr[origenIndex].routes;
    w = -1;
    for(var j = 0; j<rotas.length;j++){
        if(arr[destinyIndex].id == rotas[j].destinoId){
            w = rotas[j].weight;
            break;
        }
    }
    return w;
}


function  createPopulation(){

    for(var i = 0;i < totalPopulation;i++){
        population[i] = gaNodes.slice();
        shurffle(population[i],10);
    }

}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
function shurffle(arr,num){
  
    for( var i = 0; i < num; i++){
        
        var j = getRandomIntInclusive(0,totalNodes-1);
        var k = getRandomIntInclusive(0,totalNodes-1);
        swap(arr,j,k);
    }

}

function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}



function normalizeFitness() {
    var sum = 0;
    for (var i = 0; i < fitness.length; i++) {
      sum += fitness[i];
    }
    for (var i = 0; i < fitness.length; i++) {
      fitness[i] = fitness[i] / sum;
    }
  }



function nextGeneration(mutation){
    var newPopulation = [];
    var popRanked = getBestPopulation(population,fitness);
    var orderA = popRanked[0];
    var orderB = popRanked[1];

    for(var i = 0; i < totalPopulation; i ++){
        var order = crossOver(orderA,orderB);
        if(mutation>0){
            mutate(order,mutation);
        }   
        newPopulation[i] = order;
    
    }
    population = newPopulation;
}

function getBestPopulation(population,fitness){
    pop = population.slice();
    fit = fitness.slice();
    var res = [];
    for(var l = 0; l< 2 ; l++){
        let maior = 0;
        let indexToRemove = -1;
        for (var i = 0; i < pop.length; i++){
            if(fit[i] > maior){
                maior = fit[i];
                indexToRemove = i;
            }
        }
        if(indexToRemove != -1){
            res.push(pop[indexToRemove]);
            pop.pop(indexToRemove);
            fit.pop(indexToRemove);
        }
    }
    return res;
}
 
function mutate(order,rate){

    for ( var i = 0; i < totalNodes; i++){
        t = Math.random(1);
        if(t<rate){
           
            var indexA = getRandomIntInclusive(0,order.length - 1 );
            var indexB = (indexA + 1) % totalNodes;
            swap(order, indexA, indexB);
        }
    }
}



  function crossOver(orderA, orderB) {
    var start = getRandomIntInclusive(0,orderA.length -1);
    var end = getRandomIntInclusive(start + 1, orderA.length-1);
    var neworder = orderA.slice(start, end);
    for (var i = 0; i < orderB.length; i++) {
      var city = orderB[i];
      if (!neworder.includes(city)) {
        neworder.push(city);
      }
    }
    return neworder;
  }
  