

function calulateFitness(){

    for(var i = 0;i < totalPopulation;i++){
        var currentRecord = Infinity;

        var arr = getFitness(population[i]);
        var f = arr[0];
        var w = arr[1];
       
        if(w < bestGaDistance && w != -1){
            bestGaDistance = w;
            bestGaNodes = [];
            cloneArray(population[i],bestGaNodes);
            setShfitPosition(bestGaNodes,0, height/2); 
        }
        if(f < currentRecord){
            currentRecord = f;
            gaNodes = population[i];
        }

        fitness[i] = 1/(pow(f, 8) + 1);
    }
    
}

function calulateFitnessIgnoreRoutes(){

    for(var i = 0;i < totalPopulation;i++){
        var currentRecord = Infinity;

        var w = getFitnessIgnoreArestas(population[i]);
        
        if(w < bestGaDistance && w != -1){
            bestGaDistance = w;
            bestGaNodes = [];
            cloneArray(population[i],bestGaNodes);
            setShfitPosition(bestGaNodes,0, height/2); 
        }
        if(w < currentRecord){
            currentRecord = w;
            gaNodes = population[i];
        }

        fitness[i] = 1/(pow(w, 8) + 1);
    }
    
}



function getFitnessIgnoreArestas(arr){

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
        totalWeight+=w;
    }
    return totalWeight;
}


function  createPopulation(){

    for(var i = 0;i < totalPopulation;i++){
       
        population[i] = gaNodes.slice();
        shurffle(population[i],10);
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

function nextGenerationOld(mutation){
    var newPopulation = [];
      getPopulationRanked(population,fitness);
  
    for(var i = 0; i < totalPopulation; i ++){
        var orderA = pickOne(population, fitness);
        var orderB = pickOne(population, fitness);
        var order = crossOver(orderA,orderB);
        mutate(order,mutation);
         newPopulation[i] = order;
    }
    population = newPopulation;
}

function nextGeneration(mutation){
    var newPopulation = [];
    var popRanked = getBestPopulation(population,fitness);
    var orderA = popRanked[0];
    var orderB = popRanked[1];

    for(var i = 0; i < totalPopulation; i ++){
        var order = crossOver(orderA,orderB);
        if(mutation>0){
            mutate(order,mutation);
        }   
        newPopulation[i] = order;
    
    }
    population = newPopulation;
}

function getBestPopulation(population,fitness){
    pop = population.slice();
    fit = fitness.slice();
    
    var res = [];

    for(var l = 0; l< 2 ; l++){
        let maior = 0;
        let indexToRemove = -1;
        for (var i = 0; i < pop.length; i++){
            if(fit[i] > maior){
                maior = fit[i];
                indexToRemove = i;
            }
        }
        
        if(indexToRemove != -1){
            res.push(pop[indexToRemove]);
            pop.pop(indexToRemove);
            fit.pop(indexToRemove);
        }

    }

    return res;
}

function getPopulationRanked(population,fitness){
    pop = population.slice();
    fit = fitness.slice();
    for (var i = 0; i < pop.length; i++){

        for (var j = 0; j < pop.length; j++){

            if(i!=j){
                if(fit[i] > fit[j]){
                
                
                    swap(fit,i,j)
                    swap(pop,i,j)
                             
                }
            }
        }         
    }

    return pop;
    

}
   
function mutate(order,rate){

    for ( var i = 0; i < totalNodes; i++){
        if(random(1)<rate){
            var indexA = floor(random(order.length));
            var indexB = (indexA + 1) % totalNodes;
            swap(order, indexA, indexB);
        }
    }
}



  function crossOver(orderA, orderB) {
    var start = floor(random(orderA.length));
    var end = floor(random(start + 1, orderA.length));
    var neworder = orderA.slice(start, end);
    for (var i = 0; i < orderB.length; i++) {
      var city = orderB[i];
      if (!neworder.includes(city)) {
        neworder.push(city);
      }
    }
    return neworder;
  }
  

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
 
  