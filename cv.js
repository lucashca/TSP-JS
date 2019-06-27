
var totalNodes = 7;
var nodes = [];
var width = innerWidth;
var height = innerHeight;
var ellipseDiameter = 30;
var possitionOffset = 40;
var totalPermutations;
var count = 0;
var bestWeight = 0;
var bestRoutes = [];
class Node{
    constructor(id,position){
        this.id = id;
        this.position = position;
        this.routes = [];
    }
}
class Position{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
class Rota{
    constructor(noId,weight){
        this.destinoId = noId;
        this.weight = weight;
    }
}


function createPosition(){
    pos = new Position(floor(random(width)),floor(random(height)));

    if(pos.x < possitionOffset)  pos.x = pos.x + possitionOffset;
    if(pos.x > width - possitionOffset)  pos.x = pos.x - possitionOffset;
    if(pos.y < possitionOffset)  pos.y = pos.y + possitionOffset;
    if(pos.y > height - possitionOffset)  pos.y = pos.y - possitionOffset;
   // console.log(pos);
    return pos;
}
function createNodes(){
    for (var i = 0; i<totalNodes;i++){
        pos = createPosition();
        n = new Node(i,pos);
        nodes.push(n);
    }
}
function createRotas(){
    for (var i = 0; i<totalNodes;i++){
        let rotas = [];
        let r = floor(random(totalNodes));
        for(var j = 0; j < totalNodes; j++){
            let id = floor(random(totalNodes));
            let w = floor(random(10))+1;
            
            if(rotas.length > 0){
                let contais = false;
                for(var k = 0; k < rotas.length; k++){
                    if(rotas[k].destinoId == id){
                        contais = true;
                        break;
                    }    
                }
                if(!contais){
                    rotas.push(new Rota(id,w));
                }
            }else{
                rotas.push(new Rota(id,w));
            }
        }
        nodes[i].routes = rotas;
    }
}
function printLabelId(id,pos_x,pos_y){
    fill(255, 20, 20)
    noStroke()
    let txt = str(id);
    let sizeText = ellipseDiameter;
    let offSetTextX = offSetTextY = ellipseDiameter/3;
    if(id>=10){
        sizeText = sizeText - 5;
        offSetTextX = ellipseDiameter*0.5;
        offSetTextY = ellipseDiameter*0.3;
    }
    textSize(sizeText);
    text(txt, pos_x - offSetTextX, pos_y + offSetTextY);

}
function getMaior(a,b){
    if (a>b) 
        return a;
    return b;
}
function getMin(a,b){
    if(a>b)
        return b;
    return a;
}
function getDif(a,b){
    dif = a-b;
    if(dif < 0) 
        return dif*-1
    return dif;
}
function printLabelWeight(txt,pos_x,pos_y,pos_x2,pos_y2){

    x = getMaior(pos_x,pos_x2);    
    d = getDif(pos_x,pos_x2);

    px = x - d/2;

    y = getMaior(pos_y,pos_y2);    
    e = getDif(pos_y,pos_y2);

    py = y - e/2;
    textSize(ellipseDiameter);
    text(str(txt),px,py)
}
function printNodes(){
    for(var i = 0; i<totalNodes; i ++ ){
        fill(255); 
        
        if(i == 0){
            fill(111,255,111);
        }
        node = nodes[i];
        pos_x = node.position.x;
        pos_y = node.position.y;
        ellipse(pos_x,pos_y,ellipseDiameter,ellipseDiameter);     
        printLabelId(node.id,pos_x,pos_y)   
        fill(10,25,250); 
        ellipse(pos_x,pos_y+height,ellipseDiameter,ellipseDiameter);     
        printLabelId(str(node.id),pos_x,pos_y+height)   
     
    }
}
function printArestas(arr,offset){
   
    totalWeight = 0;
    for(var i = 0; i<totalNodes; i ++ ){
        pos_x1 = arr[i].position.x;
        pos_y1 = arr[i].position.y + offset;
        let w = -1;
        if (i+1<totalNodes){
            w  = getWeight(arr,i,i+1);
            if(w == -1){
                return -1;
            }else{
                pos_x2 = arr[i+1].position.x;
                pos_y2 = arr[i+1].position.y + offset;
            }
        }else{
            w = getWeight(arr,i,0); 
            if(w == -1){
                return -1;
            }else{
                pos_x2 = arr[0].position.x;
                pos_y2 = arr[0].position.y + offset;
            }
        }
        stroke(100);
        strokeWeight(2);
        line(pos_x1,pos_y1,pos_x2,pos_y2);
        printLabelWeight(w,pos_x1,pos_y1,pos_x2,pos_y2);
        totalWeight+=w;
    }
    return totalWeight;
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
function setup(){
    width = innerWidth;
    height = innerHeight;
   // console.log(width,height);
    createCanvas(width,height);
    height = innerHeight/2;
    createNodes();
    createRotas();
    console.log(nodes)
    totalPermutations = factorial(totalNodes) -1 ;
    console.log(totalPermutations);
}
function draw(){
    background(0)
    
    beginShape();
    w = printArestas(nodes,0);

    if (w!=-1 && (w < bestWeight || bestWeight == 0)){
        bestRoutes = nodes.slice();
        console.log(bestRoutes);
        bestWeight = w;
        console.log("Best ",bestWeight,"W",w)
    }
    if(bestRoutes.length>0){
        r = printArestas(bestRoutes,height);
    
    }
        
    printNodes();
    endShape();
    textSize(32);
    
    fill(255);
    var percent = 100 * (count / totalPermutations);
    text(nf(percent, 0, 2) + "% completed", 20, height);
    text("Menor distância "+ bestWeight ,400, height);
  
    nextOrder();
  

}


function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  
// This is my lexical nodes algorithm

function nextOrder() {
    count++;
  
    // STEP 1 of the algorithm
    // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-nodesing
    var largestI = -1;
    for (var i = 0; i < nodes.length - 1; i++) {
      
      if (nodes[i].id < nodes[i + 1].id) {
        largestI = i;
      }
    }
    if (largestI == -1) {
      noLoop();
      console.log('finished');
      console.log(bestRoutes)
      console.log(nodes)
    }else{
  
        // STEP 2
        var largestJ = -1;
        for (var j = 0; j < nodes.length; j++) {
        
        if (nodes[largestI].id < nodes[j].id) {
            largestJ = j;
        }
        }
            // STEP 3
        swap(nodes, largestI, largestJ);
    
        // STEP 4: reverse from largestI + 1 to the end
        var endArray = nodes.splice(largestI + 1);
        endArray.reverse();
        nodes = nodes.concat(endArray);
    
    }
  
    }
  
  function factorial(n) {
    if (n == 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }