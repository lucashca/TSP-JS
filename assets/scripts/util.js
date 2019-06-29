

const colorWhite = [255,255,255];
const colorBlack = [0,0,0];
const colorGreen = [0,255,0];
const colorBlue =  [0,0,255];
const colorRed =   [255,0,0];
const coloerYelow =[255,255,0];


function setShfitPosition(arr,offsetX,offsetY){
    for(var i = 0; i < arr.length;i++){
        arr[i].position.x = arr[i].position.x + offsetX; 
        arr[i].position.y = arr[i].position.y + offsetY;
    }
}

function getTimeString(time){
    var s = int(time/1000);
    var ms = time%1000;
    var str = s+","+ms+"s";
    return str;
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




function getCombination(arr){
    let txt = ""
    for (var i = 0; i < arr.length; i++){
        txt += arr[i].id;
    }
    return txt;
  }
  
  function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
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


function factorial(n) {
    if (n == 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }

  function getRandonRGB(){
    rgb = [];
    rgb[0] = floor(random(255));    
    rgb[1] = floor(random(255));    
    rgb[2] = floor(random(255));    

    return rgb;
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


function getCombination(arr){
    let txt = ""
    for (var i = 0; i < arr.length; i++){
        txt += arr[i].id;
    }
    return txt;
}

function shurffle(arr,num){
    for( var i = 0; i < num; i++){
        var j = floor(random(arr.length));
        var k = floor(random(arr.length));
        swap(arr,j,k);
    }

}

function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

function cloneArray(a,b){
    for(var i = 0; i < a.length ; i ++){
        pos = new Position(a[i].position.x,a[i].position.y);
        node = new Node(a[i].id,pos)
        node.routes = a[i].routes;
        b.push(node);
    }
}