
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

var totalPopulation = 10;
var population = [];
var fitness = [];
var maxRotas = 10;
var mutationRate = 0.1;
var fullRutes = false;

var startTime = 0;
var bestTimeGa = "";
var bestTimeLexico = "";
var oldBestDistanceLex = Infinity;
var oldBestDistanceGA = Infinity;



function confirmarClick(){
    let val = document.getElementById("qtdNodes").value;
    let popSize = document.getElementById("popSize").value;
    let mutation = document.getElementById("mutation").value;
    var maxRoutes = document.getElementById("maxRotas").value;
    fullRutes = document.getElementById("chkFullRoutes").checked;
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
  
    totalPermutations;


    lexicoNodes = []; 
    bestLexicoNodes = [];
    bestLexicoDistance = Infinity;

    gaNodes = [];
    bestGaNodes = [];
    bestGaDistance = Infinity;

    population = [];
    fitness = [];

    startTime = Date.now();

    setup();

}

function setup(){

    background(0)
    
    width = innerWidth - 20;
    height = innerHeight - 100;
    createCanvas(width ,height);
    createNodes(lexicoNodes,[width/10,width/2 - 25],[40,height/2 - 40]);
   
    if(fullRutes){
        createfullRoutes(lexicoNodes)
    }else{
        createRotas(lexicoNodes);
    }

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
    calulateFitness();
    startTime = Date.now();

    loop();

}

function draw(){

    calulateFitness();
    normalizeFitness();
    nextGeneration(mutationRate);
    
    background(0)
    
    beginShape();
    printDivision();
    
    
    let lexicoDist = printArestas(lexicoNodes,0)
    let gaDist = printArestas(gaNodes,0)
    
    if(lexicoDist < bestLexicoDistance && lexicoDist!=-1){
        bestLexicoDistance = lexicoDist;
        bestLexicoNodes = [];
        cloneArray(lexicoNodes,bestLexicoNodes);
        setShfitPosition(bestLexicoNodes,0,height/2);    
    }

    if(bestLexicoDistance != Infinity){
        if(oldBestDistanceLex != bestLexicoDistance){
            oldBestDistanceLex = bestLexicoDistance;
            let tn = Date.now() - startTime;
            bestTimeLexico = getTimeString(tn);
            
        }
        printArestas(bestLexicoNodes,0)
    }
    
    
    if(bestGaDistance != Infinity){
        if(oldBestDistanceGA != bestGaDistance){
            oldBestDistanceGA = bestGaDistance;
            let tn = Date.now() - startTime;
            bestTimeGa = getTimeString(tn);
            
        }
        printArestas(bestGaNodes,0)
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
    text("Possible Routes: "+  maxRotas, 20, 5*space);
    timeNow = Date.now() - startTime;
    time = getTimeString(timeNow);
   
    text("Best Time: "+bestTimeLexico, 20, height/2-3*space);
    text("Time: "+time, 20, height/2-2*space);
    
    text("Best Time: "+bestTimeGa, width/2+ 20, height/2-3*space);
    text("Time: "+time, width/2+ 20, height/2-2*space);
    

}


  




