


function nextOrder(arr) {
  count++; 
  var largestI = -1;
  for (var i = 0; i < arr.length - 1; i++) {
    
    if (arr[i].id < arr[i + 1].id) {
      largestI = i;
    }
  }
 
     
  if (largestI == -1) {
    noLoop();
    console.log('finished');
  }else{

      // STEP 2
      var largestJ = -1;
      for (var j = 0; j < arr.length; j++) {
      
      if (arr[largestI].id < arr[j].id) {
          largestJ = j;
      }
      }

     
          // STEP 3
      swap(arr, largestI, largestJ);
       
      // STEP 4: reverse from largestI + 1 to the end
      var endArray = arr.splice(largestI + 1);

      endArray.reverse();
      arr = arr.concat(endArray);
      
  }
  console.log(largestI,largestJ)
  printComb(arr);
  return arr;

  }

  function printComb(arr){
    s= " ";
    for(var i = 0; i< arr.length; i++){
      s = s + arr[i].id
    }
    console.log(s)
  }