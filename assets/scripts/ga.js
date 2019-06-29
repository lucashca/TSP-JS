
function  createPopulation(){

    for(var i = 0;i < totalPopulation;i++){
       
        population[i] = gaNodes.slice();
        shurffle(population[i],10);
    }

}
function calulateFitness(){

    for(var i = 0;i < totalPopulation;i++){
  
        var arr = getFitness(population[i]);
        var f = arr[0];
        var w = arr[1];
        gaNodes = population[i];
        if(w < bestGaDistance && w != -1){
            bestGaDistance = w;
            bestGaNodes = [];
            cloneArray(population[i],bestGaNodes);
            setShfitPosition(bestGaNodes,0, height/2); 
        
        }

        fitness[i] = 1/(f+1);
    }
    
}


function normalizeFitness() {
    var sum = 0;
    for (var i = 0; i < fitness.length; i++) {
      sum += fitness[i];
    }
    for (var i = 0; i < fitness.length; i++) {
      fitness[i] = fitness[i] / sum;
    }
  }

function nextGeneration(mutation){
    var newPopulation = [];
    for(var i = 0; i < totalPopulation; i ++){
        var orderA = pickOne(population, fitness);
        var orderB = pickOne(population, fitness);
        var order = crossOver(orderA,orderB);
        mutate(order,mutation);
         newPopulation[i] = order;
    }
    population = newPopulation;
}
   
function mutate(order,rate){

    for ( var i = 0; i < totalNodes; i++){
        if(random(1)<rate){
            var indexA = floor(random(order.length));
            var indexB = floor(random(order.length));
            swap(order,indexA,indexB);
        }
    }
}

function crossOver(orderA, orderB) {
    var start = floor(random(orderA.length));
    var end = floor(random(start + 1, orderA.length));
    var neworder = orderA.slice(start, end);
    // var left = totalCities - neworder.length;
    for (var i = 0; i < orderB.length; i++) {
      var city = orderB[i];
      if (!neworder.includes(city)) {
        neworder.push(city);
      }
    }
    return neworder;
  }

  /*
function crossOver(arrA,arrB){

    let halfPart = 0;
    if(totalNodes%2 == 0){
        halfPart = totalNodes/2;
    }else halfPart = int(totalNodes/2) + 1 

    order = arrA.splice(0,halfPart);

    for(var i = 0; i < totalNodes; i++ ){
        contais = false;
        for(var j = 0; j< order.length; j++){
            if(order[j].id == arrB[i].id){
                contais = true;
                break;
            }
        }
        if(!contais){
            order.push(arrB[i]);
        }
    }

    return order;


}

*/
function getFitness(arr){
    totalFitness = 0;
    totalWeight = 0;
    let hasPath = true;
    for(var i = 0; i<totalNodes; i ++ ){
        let w = 0;
        if (i+1<totalNodes){
            w  = getWeight(arr,i,i+1);
            if(w == -1){
                w = 0;
                hasPath = false;
            }
        }else{
            w = getWeight(arr,i,0); 
            if(w == -1){
                w = 0;
                hasPath = false;
            }
        }
        totalFitness += w;
       
    }
    totalWeight = totalFitness;
    if(!hasPath) totalWeight = -1;
    res = [ totalFitness,totalWeight]
    return res; 
}

function pickOne(list, prob) {
    var index = 0;
    var r = random(1);
  
    while (r > 0) {
      r = r - prob[index];
      index++;
    }
    index--;
    return list[index].slice();
  }
  