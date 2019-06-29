

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
    for (var i = 0; i<totalNodes;i++){
        let rotas = [];
        let r = floor(random(totalNodes));
        for(var j = 0; j < maxRotas; j++){
            let id = floor(random(totalNodes));
            let w = floor(random(10))+1;
            
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
                    rotas.push(new Rota(id,w));
                }
            }else{
                rotas.push(new Rota(id,w));
            }
        }
        arr[i].routes = rotas;
    }
}