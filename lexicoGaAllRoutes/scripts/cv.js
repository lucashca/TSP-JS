
var totalNodes = 7;
var nodes = [];
var width = innerWidth;
var height = innerHeight;
var ellipseDiameter = 30;
var possitionOffset = 40;


var count = 0;

var totalPermutations;

var lexicoNodes = []; 
var bestLexicoNodes = [];
var bestLexicoDistance = Infinity;

var gaNodes = [];
var bestGaNodes = [];
var bestGaDistance = Infinity;

var totalPopulation = 500;
var population = [];
var fitness = [];
var maxRotas = 0;
var mutationRate = 0.1;



function confirmarClick(){
    let val = document.getElementById("qtdNodes").value;
    let popSize = document.getElementById("popSize").value;
    let mutation = document.getElementById("mutation").value;
    
    val = parseInt(val);
    popSize = parseInt(popSize); 
    mutation = parseFloat(mutation);
    
    if(isNaN(val)) val = 7;
    if(isNaN(popSize)) popSize = 100;
    if(isNaN(mutation)) mutation = 0.1
    totalNodes = val;
    totalPopulation = popSize;
    mutationRate = mutation;
    count = 0;

    totalPermutations;


    lexicoNodes = []; 
    bestLexicoNodes = [];
    bestLexicoDistance = Infinity;

    gaNodes = [];
    bestGaNodes = [];
    bestGaDistance = Infinity;

    population = [];
    fitness = [];
    setup();
}


function setup(){

    background(0)
    
    width = innerWidth - 20;
    height = innerHeight - 100;
    createCanvas(width ,height);
    createNodes(lexicoNodes,[width/10,width/2 - 25],[40,height/2 - 40]);
    createRotas(lexicoNodes);

    cloneArray(lexicoNodes,gaNodes);
    cloneArray(lexicoNodes,bestLexicoNodes);
    cloneArray(lexicoNodes,bestGaNodes);
   
    setShfitPosition(gaNodes,width/2, 0);
    setShfitPosition(bestLexicoNodes,0,height/2);
    setShfitPosition(bestGaNodes,width/2, height/2);
    
    
   
    
    printNodes(lexicoNodes,colorWhite);
    printNodes(gaNodes,colorBlue);

    printNodes(bestLexicoNodes,colorGreen);
    printNodes(bestGaNodes,coloerYelow);
    printDivision();


    totalPermutations = factorial(totalNodes);

    

    createPopulation(population,gaNodes);
    calulateFitnessIgnoreRoutes();
    loop();

}
function draw(){

    calulateFitnessIgnoreRoutes();
    normalizeFitness();
    nextGeneration(mutationRate);
    
    background(0)
    
    beginShape();
    printDivision();
    
    
    let lexicoDist = printArestasIgnoreRoutes(lexicoNodes)
    
    //let lexicoDist = printArestas(lexicoNodes,0)
    let gaDist = printArestasIgnoreRoutes(gaNodes)
    
    //let gaDist = printArestas(gaNodes,0)
    
    if(lexicoDist < bestLexicoDistance && lexicoDist!=-1){
        bestLexicoDistance = lexicoDist;
        bestLexicoNodes = [];
        cloneArray(lexicoNodes,bestLexicoNodes);
        setShfitPosition(bestLexicoNodes,0,height/2);    
    }

    if(gaDist < bestGaDistance && gaDist!=-1){
        bestGaDistance = gaDist;
        bestGaNodes = [];
        cloneArray(gaNodes,bestGaNodes);
        setShfitPosition(bestGaNodes,0,height/2);    
    }

    if(bestLexicoDistance != Infinity){
        printArestasIgnoreRoutes(bestLexicoNodes)
    }
    
    
    if(bestGaDistance != Infinity){
    
        printArestasIgnoreRoutes(bestGaNodes)
    }


    printNodes(lexicoNodes,colorWhite);
    printNodes(gaNodes,colorBlue);
    printNodes(bestLexicoNodes,colorGreen);
    printNodes(bestGaNodes,coloerYelow);
    
    endShape();
   
    lexicoNodes =  nextOrder(lexicoNodes);
    

    fill(255);
    var percent = 100 * (count / totalPermutations);
    text(nf(percent, 0, 2) + "% completed Menor distância "+ bestLexicoDistance, 20, height/2);
    text("Menor distância "+ bestGaDistance,width/2+ 20, height/2);
    
    textSize(25);
    text("Lexicografo Order", 20, 30);
    text("Algoritimo Genetico", width/2 + 20, 30);
    textSize(16);
    let space = 25;
    text("Nodes: " + totalNodes, 20, 2*space+5);
    text("Population: " + population.length, 20, 3*space);
    text("Mutation Rate: " + mutationRate, 20, 4*space);
    text("Possible Routes: "+  maxRotas, 20, 5*space); textSize(16);
   
   

}


