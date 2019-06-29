

function createPosition(limitX,limitY){

    limitInferiorX = limitX[0];
    limitSuperiorX = limitX[1];
    
    limitInferiorY = limitY[0];
    limitSuperiorY = limitY[1];
    
    x = floor(random() * (limitSuperiorX - limitInferiorX)) + +limitInferiorX; 
    y = floor(random() * (limitSuperiorY - limitInferiorY)) + +limitInferiorY; 

    pos = new Position(x,y);

    return pos;
}

function createNodes(arr,limitX,limitY){
    for (var i = 0; i<totalNodes;i++){
        pos = createPosition(limitX,limitY);
        n = new Node(i,pos);
        arr.push(n);
    }
}
function createRotas(arr){
    console.log(maxRotas);
    for (var i = 0; i<totalNodes;i++){
        let rotas = [];
        let r = floor(random(totalNodes));
        for(var j = 0; j < maxRotas; j++){
            let id = floor(random(totalNodes));

            if(rotas.length == totalNodes - 1) break;
            
            if(rotas.length > 0){
                let contais = false;
                for(var k = 0; k < rotas.length; k++){
                    if(rotas[k].destinoId == id){
                        contais = true;
                        break;
                    }    
                }
                if(!contais){
                    nodeB = arr[id];
                    nodeA = arr[i];

                    w = dist(nodeA.position.x,nodeA.position.y,nodeB.position.x,nodeB.position.y);
                    w = int(w);
                    rotas.push(new Rota(id,w));
                }
            }else{
                nodeB = arr[id];
                nodeA = arr[i];

                w = dist(nodeA.position.x,nodeA.position.y,nodeB.position.x,nodeB.position.y);
                w = int(w);
                rotas.push(new Rota(id,w));
                rotas.push(new Rota(id,w));
            }
        }
        arr[i].routes = rotas;
    }
}

function createfullRoutes(arr){
   
    for (var i = 0; i<totalNodes;i++){
        let rotas = [];
        nodeA = arr[i];
        for(var j = 0; j< totalNodes; j++){
            if(i!=j){
                nodeB = arr[j];
                w = calculateDistance(nodeA,nodeB);
                w = int(w);
                rotas.push(new Rota(j,w));
            }

        }
        arr[i].routes = rotas;
    }
}

function calculateDistance(nodeA,nodeB){

    return dist(nodeA.position.x,nodeA.position.y,nodeB.position.x,nodeB.position.y);

}