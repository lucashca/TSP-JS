

var nodes = [];

var mapOfNode = new Map()
var totalNodes = 0;
var sizeNodeEllipse = 30

var fileInput = document.getElementById('fileInput');
var fileDisplayArea = document.getElementById('fileDisplayArea');

var content = null


var globalIndex = 2

var routeSD = []


fileInput.addEventListener('change', function(e) {
    var file = fileInput.files[0];
    var textType = /text.*/;
    
    if (file.type.match(textType)) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            content = reader.result;
            //Here the content has been read successfuly
            
            setup()
        }
        
        reader.readAsText(file);	
    } else {
        fileDisplayArea.innerText = "File not supported!"
    }
});


class Node{

    constructor(id,position){
        this.id = id
        this.position = position
        this.routes = []
        this.activeRoute = null
    }

   
    setRoute(route){
        this.routes.push(route);
    }
    getRoute(){
        return this.routes;
    }
    deactivateRoutes(){
        this.activeRoute = null
    }
    activateRoute(i){
       
        this.deactivateRoutes()
        this.activeRoute = this.routes[i]
        
    }


}

class Routes{
    constructor(id,weight){
        this.id = id;
        this.enable = false
        this.weight = weight;
    }


}
    
class Position{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class RoutesSD{
    constructor(s,d,w){
        this.source = s
        this.destination = d
        this.weight = w
    }
}




function setup() {
    clear();
    nodes = []
    width = innerWidth*0.8
    height = innerHeight*0.8
    createCanvas(width,height);
    if(content){
        content = content.split('\n');
        totalNodes = content[0]
        for(var i = 1; i < content.length - 1 ; i++){
             lineContent = content[i].split(' ')
            
            nodeId = lineContent[0]
            
            routeId = lineContent[1]
            
            weight = lineContent[2]
            route = new Routes(routeId,weight);
            
            if(nodes[nodeId]){
                nodes[nodeId].setRoute(route)
                
            }else{
                var position = new  Position(random(width),random(height));
                node = new Node(nodeId,position)
                node.setRoute(route)
                nodes[nodeId] = node
            }

        }
        
        arr = []
        for(var i = 0; i < nodes.length;i++){
            no = nodes[i]
            if(no){
                arr.push(no)
            }
        }
        nodes = arr
    

    }
}

function draw(){
    if(content){
       
        background(0);
        fill(255)
        ellipse(mouseX, mouseY, 15, 15);
        beginShape();
        stroke(255);
        noFill()
        strokeWeight(2);
       
        for( var i = 0; i < totalNodes; i++){
            route = this.nodes[i].activeRoute
            
            if(route){
         
                id = route.id -1
                line(nodes[i].position.x,nodes[i].position.y,nodes[id].position.x,nodes[id].position.y)
            }
        }

        endShape();
    
        
        for( var i = 0; i < totalNodes; i++){
            fill(255);
            pos_x = nodes[i].position.x
            pos_y = nodes[i].position.y
           
            ellipse(pos_x,pos_y,sizeNodeEllipse,sizeNodeEllipse);
            fill(255, 20, 20)
            noStroke()
            id = nodes[i].id
            txt = str(id)
            sizeText = sizeNodeEllipse
            offSetTextX = offSetTextY = sizeNodeEllipse/3
            if(id>=10){
                sizeText = sizeText - 5;
                offSetTextX = sizeNodeEllipse*0.5
                offSetTextY = sizeNodeEllipse*0.3
                
            }
            textSize(sizeText);
            
            text(txt, pos_x - offSetTextX, pos_y + offSetTextY);
           
        }
        i = floor(random(totalNodes))
        j = floor(random(totalNodes))
        
    
        getArray()
       
     
       
        enablePath(this.nodes,this.routeSD)
    }

   
}


function renewMap(){
    

    


    
    

}


function getArray(){
    
    source = 0
    destination = 0
    first == true    
    console.log("Source",source+1,"Destination",destination)
    hasNextRoute = true
    cont = 0
    while (hasNextRoute){
        cont++;
        r = this.nodes[source].routes
        this.mapOfNode.set(source,true)
        for(var i = 0; i < r.length; i++){
            
            idDestination = this.r[i].id - 1
            
           
            
            if(!this.mapOfNode.get(idDestination)){
                this.mapOfNode.set(idDestination,true)
          
            //    this.nodes[source].activateRoute(i)
                rsd = new RoutesSD(source,i);
                this.routeSD.push(rsd)
                source = idDestination
                hasNextRoute = true
                
                break
            }else{
                hasNextRoute = false
                
            }
        }
                    
    }

    if(cmp === this.routeSD){
        globalIndex++;
        console.log("Sim")
    }

    console.log(cmp)
    console.log(this.routeSD)


}

function enablePath(nodes,rota){

    
     
    
    
    for( var i = 0 ; i< rota.length; i ++){
       
        source = rota[i].source;
        
        destination = rota[i].destination;
        
        nodes[source].activateRoute(destination);
    }

   

    noLoop()

}

