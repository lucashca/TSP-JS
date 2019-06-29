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