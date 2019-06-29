
var width = innerWidth;
var height = innerHeight;
var ellipseDiameter = 30;
var possitionOffset = 40;


var totalNodes = 7;
var lexicoNodes = [];
var maxRotas = 10;
var totalPermutations;
var count = 0;
var bestLexicoDistance = Infinity;
var bestRoutes = [];
var bestLexicoNodes = [];
var fullRutes = false;

var startTime = 0;
var bestTime = "";
var oldBestDistance = Infinity;


function confirmarClick(){
    let val = document.getElementById("qtdNodes").value;
    var maxRoutes = document.getElementById("maxRotas").value;
    fullRutes = document.getElementById("chkFullRoutes").checked;

    val = parseInt(val);
    maxRoutes = parseInt(maxRoutes);

    if(isNaN(val)) val = 7;
    if(isNaN(maxRoutes)) maxRoutes = int(totalNodes*1.2);
 
    totalNodes = val;
    maxRotas = maxRoutes;
    count = 0;

    

    lexicoNodes = []; 
    bestLexicoNodes = [];
    bestLexicoDistance = Infinity;

    setup();

}



function setup(){

    background(0)
    
    width = innerWidth - 20;
    height = innerHeight - 100;
    createCanvas(width ,height);
    createNodes(lexicoNodes,[width/10,width - 25],[40,height/2 - 40]);
    
    if(fullRutes){
        createfullRoutes(lexicoNodes)
    }else{
        createRotas(lexicoNodes);
    }

    

    cloneArray(lexicoNodes,bestLexicoNodes);
    setShfitPosition(bestLexicoNodes,0,height/2);
    
    
   
    
    printNodes(lexicoNodes,colorWhite);
    
    printNodes(bestLexicoNodes,colorGreen);
    print2Division();


    totalPermutations = factorial(totalNodes);

    startTime = Date.now();

    loop();

}
function draw(){
  
    background(0)
    
    beginShape();
    print2Division();
    
    
    let lexicoDist = printArestas(lexicoNodes,0)
    
    if(lexicoDist < bestLexicoDistance && lexicoDist!=-1){
        bestLexicoDistance = lexicoDist;
        bestLexicoNodes = [];
        cloneArray(lexicoNodes,bestLexicoNodes);
        setShfitPosition(bestLexicoNodes,0,height/2);  
    }

    if(bestLexicoDistance != Infinity){
        if(oldBestDistance != bestLexicoDistance){
            oldBestDistance = bestLexicoDistance;
            let tn = Date.now() - startTime;
            bestTime = getTimeString(tn);
            console.log(bestTime);
        }
        printArestas(bestLexicoNodes,0)
    }
    
    
    

    printNodes(lexicoNodes,colorWhite);
    printNodes(bestLexicoNodes,colorGreen);
    
    endShape();
   
    lexicoNodes =  nextOrder(lexicoNodes);
    
    fill(255);
    var percent = 100 * (count / totalPermutations);
    text(nf(percent, 0, 2) + "% completed Menor distância "+ bestLexicoDistance, 20, height/2);
    
    textSize(25);
    text("Lexicografo Order", 20, 30);
    textSize(16);
    let space = 25;
    text("Nodes: " + totalNodes, 20, 2*space+5);
    text("Possible Routes: "+  maxRotas, 20, 3*space);

    timeNow = Date.now() - startTime;
    time = getTimeString(timeNow);

    text("Best Time: "+bestTime, 20, 15*space);
    text("Time: "+time, 20, 16*space);
    
   

}