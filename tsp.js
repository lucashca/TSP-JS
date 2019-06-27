

var totalNodes = 10;
var nodes = [];
var ellipseDiameter = 30;
var menorDistancia = 0;
var inicio = 0;
var menorRota = []

var positions = new Map();

class Node{
    constructor(id,position){
        this.id = id;
        this.position = position;
        this.routes = new Map();
    }
}
class Position{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
class Rota{
    constructor(no,weight){
        this.destino = no;
        this.weight = weight;
    }
}


function setup(){
    width = innerWidth;
    height = innerHeight;

    createCanvas(width,height);
   
   
    for(var i = 0; i<totalNodes; i ++ ){
        
        offset = 50
        pos = new Position(floor(random(width)),floor(random(height)));
        
        repetido = true;
        while(repetido){
            keys = positions.keys();
            repetido = false;
            for(var j = 0; j < keys.size;j++){
                v = keys.next().value;
                vy = positions.get(v);
                if(v > pos.x + offset || v < pos.x - offset){
                    if(vy > pos.y + offset || vy < pos.y - offset){
                        repetido = true;
                    }
                }
            }
            pos = new Position(floor(random(width)),floor(random(height/2)));
        }
        positions.set(pos.x,pos.y);
        node = new Node(i,pos);
        nodes[i] = node;

    }
    setWeight();

}

function setWeight(){
    
    for(var i = 0; i < totalNodes; i ++ ){
        for(var j = 0; j < totalNodes ; j++){
            weight = floor(random(totalNodes)) + 1 ;
            //rota = floor(random(totalNodes));
            nodes[i].routes.set(j,weight);
        }        
    }

}

function printLabelId(txt,pos_x,pos_y){
    fill(255, 20, 20)
    noStroke()
    txt = str(node.id)
    sizeText = ellipseDiameter
    offSetTextX = offSetTextY = ellipseDiameter/3
    if(node.id>=10){
        sizeText = sizeText - 5;
        offSetTextX = ellipseDiameter*0.5
        offSetTextY = ellipseDiameter*0.3   
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

function draw(){
    background(0)
    
    translate(0,height/2);
   
    lines = []
    beginShape()
    totalDistance = 0;
    for(var i = 0; i<totalNodes; i ++ ){
        
        node = nodes[i];
        pos_x1 = node.position.x;
        pos_y1 = node.position.y;
        w = -1;
        node2 = 0
        if(i+1 < totalNodes){
            node2 = nodes[i+1];
            pos_x2 = node2.position.x;
            pos_y2 = node2.position.y;
        }else{
            node2 = nodes[0];
            pos_x2 = node2.position.x;
            pos_y2 = node2.position.y;
        }
        if(node.routes.get(node2.id)){ 
            w = node.routes.get(node2.id);    
        }    

        totalDistance = totalDistance + w;
        
        stroke(100);
        strokeWeight(2);
        line(pos_x1,pos_y1,pos_x2,pos_y2);
        printLabelWeight(w,pos_x1,pos_y1,pos_x2,pos_y2);
        
        l = {
            w:w,
            px1:pos_x1,
            px2:pos_x2,
            py1:pos_y1 -height/2 +10,
            py2:pos_y2 -height/2 +10
        }
        lines.push(l)
    }

    
    if(menorDistancia == 0){
        
        menorDistancia = totalDistance;
        menorRota = lines.slice() 
        
    }else{
        old =menorDistancia;
        menorDistancia = getMin(totalDistance,menorDistancia);
        if(old > menorDistancia)
            menorRota = lines.slice() 
    }

    for(var i = 0; i<menorRota.length;i++){
        
        l = menorRota[i]
        stroke(100);
        strokeWeight(2);
        line(l.px1,l.py1,l.px2,l.py2);
        printLabelWeight(l.w,l.px1,l.py1,l.px2,l.py2);
        
    }
    

    
    for(var i = 0; i<totalNodes; i ++ ){
        fill(255); 
        node = nodes[i];
        pos_x = node.position.x;
        pos_y = node.position.y;
        ellipse(pos_x,pos_y,ellipseDiameter,ellipseDiameter);     
        printLabelId(str(node.id),pos_x,pos_y)   
        fill(10,25,250); 
        
        ellipse(pos_x,pos_y-height/2 + 10,ellipseDiameter,ellipseDiameter);     
        printLabelId(str(node.id),pos_x,pos_y-height/2 + 10)   
     
    }
    endShape()

   
    i = floor(random(totalNodes));
    j = floor(random(totalNodes));
    
    console.log("Menor distância respondida", menorDistancia)
  
    //swap(nodes,i,j);
    if(inicio < totalNodes -1)
        perm(nodes,inicio,totalNodes-1);
    else{
        inicio = 0
        perm(nodes,inicio,totalNodes-1);
    }
    inicio ++;
    ids = [];
    for(var i = 0; i< totalNodes;i++){
        ids[i] = nodes[i].id;
    }


    width = innerWidth;
    height = innerHeight;
   
   
    
}

function perm(vetor,inf, sup){
    swap(vetor, inf, sup);
}


function permutation(vetor,inf, sup){
    
	if(inf == sup)
	{
		for(var i = 0; i <= sup; i++)
			console.log(vetor[i]);
	
	}
	else
	{
		for(var i = inf; i <= sup; i++)
		{
			swap(vetor, inf, i);
			permutation(vetor, inf + 1, sup);
			swap(vetor, inf, i); // backtracking
		}
	}
}

function swap(a,i,j){
    aux = a[i];
    a[i] = a[j];
    a[j] = aux;
}