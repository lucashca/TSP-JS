
var totalNodes = 7;
var width = innerWidth;
var height = innerHeight;
var ellipseDiameter = 30;


var gaNodes = [];
var bestGaNodes = [];
var bestGaDistance = Infinity;

var totalPopulation = 100;
var population = [];
var fitness = [];
var maxRotas = 10;
var mutationRate = 0.01;

function confirmarClick(){
    let val = document.getElementById("qtdNodes").value;
    let popSize = document.getElementById("popSize").value;
    let mutation = document.getElementById("mutation").value;
    var maxRoutes = document.getElementById("maxRotas").value;

    val = parseInt(val);
    popSize = parseInt(popSize); 
    mutation = parseFloat(mutation);
    maxRoutes = parseInt(maxRoutes);

    if(isNaN(val)) val = 7;
    if(isNaN(popSize)) popSize = 100;
    if(isNaN(mutation)) mutation = 0.1
    if(isNaN(maxRoutes)) maxRoutes = int(totalNodes*1.2);
 
    totalNodes = val;
    totalPopulation = popSize;
    mutationRate = mutation;
    maxRotas = maxRoutes;
    count = 0;

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
    createNodes(gaNodes,[width/10,width-20],[20,height/2 -40]);
    createRotas(gaNodes);


   
    cloneArray(gaNodes,bestGaNodes);
   
    setShfitPosition(bestGaNodes,60, height/2 - 20);
    noLoop();
   
    
   
    printNodes(gaNodes,colorBlue);

    printNodes(bestGaNodes,coloerYelow);
    print2Division();

    createPopulation(population,gaNodes);
    calulateFitness();
    loop();
}

function draw(){

    calulateFitness();
    normalizeFitness();
    nextGeneration(mutationRate);
    
    background(0)
    
    beginShape();
    print2Division();
    
    printArestas(gaNodes,0);
    
    if(bestGaDistance != Infinity){
    
        printArestas(bestGaNodes,0)
    }


    printNodes(gaNodes,colorBlue);
    printNodes(bestGaNodes,coloerYelow);
    
    endShape();
   
   
    fill(255);
    text("Menor distância "+ bestGaDistance,20, height/2+10);
    
    textSize(25);
    
    text("Genetic Algorithm", 20, 30);
    textSize(16);
    let space = 25;
    text("Nodes: " + totalNodes, 20, 2*space+5);
    text("Population: " + population.length, 20, 3*space);
    text("Mutation Rate: " + mutationRate, 20, 4*space);
    text("Possible Routes: "+  maxRotas, 20, 5*space);
  
    

}

