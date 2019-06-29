
function print4Division(){
    stroke(150);
    strokeWeight(15);
    
    line(0,0,0,height);
    line(width,0,width,height);
    line(0,0,width,0);
    line(0,height,width,height);
    
    strokeWeight(5);
    
    
    line(0,height/2 - 30,width,height/2 - 30);
    line(0,height/2 + 30,width,height/2 + 30);
    
    line(width/2,0,width/2,height);
    
    strokeWeight(0)
}


function print2Division(){
    stroke(150);
    strokeWeight(15);
    
    line(0,0,0,height);
    line(width,0,width,height);
    line(0,0,width,0);
    line(0,height,width,height);
    
    strokeWeight(5);
    
    
    line(0,height/2 - 30,width,height/2 - 30);
    line(0,height/2 + 30,width,height/2 + 30);
    
    
    strokeWeight(0)
}
function printDivision(){
    stroke(150);
    strokeWeight(15);
    
    line(0,0,0,height);
    line(width,0,width,height);
    line(0,0,width,0);
    line(0,height,width,height);
    
    strokeWeight(5);
    
    
    line(0,height/2 - 30,width,height/2 - 30);
    line(0,height/2 + 30,width,height/2 + 30);
    
    line(width/2,0,width/2,height);
    
    strokeWeight(0)
}

function calcDistance(nodeA, nodeB){

    return dist(nodeA.position.x,nodeA.position.y,nodeB.position.x,nodeB.position.y)
    
}
  

function printArestasIgnoreRoutes(arr,){

    totalWeight = 0;
    for(var i = 0; i<totalNodes; i ++ ){
        pos_x1 = arr[i].position.x;
        pos_y1 = arr[i].position.y;
        let w = 0;
        if (i+1<totalNodes){
            pos_x2 = arr[i+1].position.x;
            pos_y2 = arr[i+1].position.y;
        }else{
            pos_x2 = arr[0].position.x;
            pos_y2 = arr[0].position.y;
        }
        w = dist(pos_x1,pos_y1,pos_x2,pos_y2);
        w = int(w);
        stroke(100);
        strokeWeight(2);
        line(pos_x1,pos_y1,pos_x2,pos_y2);
        printLabelWeight(w,pos_x1,pos_y1,pos_x2,pos_y2);
        totalWeight+=w;
    }
    return totalWeight;

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

function printNodes(arr,rgb){
    
    for(var i = 0; i < totalNodes; i++){
       
        fill(rgb[0],rgb[1],rgb[2]); 
        if(i == 0){
            fill(111,255,111);
        }
        node = arr[i];
        pos_x = node.position.x;
        pos_y = node.position.y;
        ellipse(pos_x,pos_y,ellipseDiameter,ellipseDiameter);     
        printLabelId(node.id,pos_x,pos_y)   
        
    }
   
    
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