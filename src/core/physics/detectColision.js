/*
*
* @param {Object} object1 - a canvas element
* @param {Object} object2 - a canvas element
*
*/

function detectColision(object1, object2, type = "simple") {
  if (type == "simple") {
    return simpleColision(object1, object2);
  } else if (type == "complex") {
    return complexColision(object1, object2);
  }
}

function simpleColision(object1, object2) {
  if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
		object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
      return true;
  } else {
    return false;
  }
}

function complexColision(object1, object2) {
  return detectRectangleCollision(object1, object2)
}

function workOutNewPoints(cx, cy, vx, vy, rotatedAngle){ //From a rotated object
    //cx,cy are the centre coordinates, vx,vy is the point to be measured against the center point
        rotatedAngle = rotatedAngle;
        let dx = vx - cx;
        let dy = vy - cy;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let originalAngle = Math.atan2(dy,dx);
        let rotatedX = cx + distance * Math.cos(originalAngle + rotatedAngle);
        let rotatedY = cy + distance * Math.sin(originalAngle + rotatedAngle);
    
        return {
            x: rotatedX,
            y: rotatedY
        }
}

//Get the rotated coordinates for the square
function getRotatedSquareCoordinates(square){
    if (square.angle === undefined)
      square.angle = 0;

    let centerX = square.x + (square.width / 2);
    let centerY = square.y + (square.height / 2);
    square.centerX = centerX;
    square.centerY = centerY;
    //Work out the new locations
    let topLeft = workOutNewPoints(centerX, centerY, square.x, square.y, square.angle);
    let topRight = workOutNewPoints(centerX, centerY, square.x + square.width, square.y, square.angle);
    let bottomLeft = workOutNewPoints(centerX, centerY, square.x, square.y + square.height, square.angle);
    let bottomRight = workOutNewPoints(centerX, centerY, square.x + square.width, square.y + square.height, square.angle);
    return{
        tl: topLeft,
        tr: topRight,
        bl: bottomLeft,
        br: bottomRight
    }
}

//Functional objects for the Seperate Axis Theorum (SAT)
//Single vertex
function xy(x,y){
    this.x = x;
    this.y = y;
};
//The polygon that is formed from vertices and edges.
function polygon(vertices, edges){
    this.vertex = vertices;
    this.edge = edges;
};

//The actual Seperate Axis Theorum function
function sat(polygonA, polygonB){
    var perpendicularLine = null;
    var dot = 0;
    var perpendicularStack = [];
    var amin = null;
    var amax = null;
    var bmin = null;
    var bmax = null;
    //Work out all perpendicular vectors on each edge for polygonA
    for(var i = 0; i < polygonA.edge.length; i++){
         perpendicularLine = new xy(-polygonA.edge[i].y,
                                     polygonA.edge[i].x);
         perpendicularStack.push(perpendicularLine);
    }
    //Work out all perpendicular vectors on each edge for polygonB
    for(var i = 0; i < polygonB.edge.length; i++){
         perpendicularLine = new xy(-polygonB.edge[i].y,
                                     polygonB.edge[i].x);
         perpendicularStack.push(perpendicularLine);
    }
    //Loop through each perpendicular vector for both polygons
    for(var i = 0; i < perpendicularStack.length; i++){
        //These dot products will return different values each time
         amin = null;
         amax = null;
         bmin = null;
         bmax = null;
         /*Work out all of the dot products for all of the vertices in PolygonA against the perpendicular vector
         that is currently being looped through*/
         for(var j = 0; j < polygonA.vertex.length; j++){
              dot = polygonA.vertex[j].x *
                    perpendicularStack[i].x +
                    polygonA.vertex[j].y *
                    perpendicularStack[i].y;
            //Then find the dot products with the highest and lowest values from polygonA.
              if(amax === null || dot > amax){
                   amax = dot;
              }
              if(amin === null || dot < amin){
                   amin = dot;
              }
         }
         /*Work out all of the dot products for all of the vertices in PolygonB against the perpendicular vector
         that is currently being looped through*/
         for(var j = 0; j < polygonB.vertex.length; j++){
              dot = polygonB.vertex[j].x *
                    perpendicularStack[i].x +
                    polygonB.vertex[j].y *
                    perpendicularStack[i].y;
            //Then find the dot products with the highest and lowest values from polygonB.
              if(bmax === null || dot > bmax){
                   bmax = dot;
              }
              if(bmin === null || dot < bmin){
                   bmin = dot;
              }
         }
         //If there is no gap between the dot products projection then we will continue onto evaluating the next perpendicular edge.
         if((amin < bmax && amin > bmin) ||
            (bmin < amax && bmin > amin)){
              continue;
         }
         //Otherwise, we know that there is no collision for definite.
         else {
              return false;
         }
    }
    /*If we have gotten this far. Where we have looped through all of the perpendicular edges and not a single one of there projections had
    a gap in them. Then we know that the 2 polygons are colliding for definite then.*/
    return true;
}

//Detect for a collision between the 2 rectangles
function detectRectangleCollision(object1, object2){
    let thisRect = object1;
    let otherRect = object2;
    //Get rotated coordinates for both rectangles
    let tRR = getRotatedSquareCoordinates(thisRect);
    let oRR = getRotatedSquareCoordinates(otherRect);
    //Vertices & Edges are listed in clockwise order. Starting from the top right
    let thisTankVertices = [
        new xy(tRR.tr.x, tRR.tr.y),
        new xy(tRR.br.x, tRR.br.y),
        new xy(tRR.bl.x, tRR.bl.y),
        new xy(tRR.tl.x, tRR.tl.y),
    ];
    let thisTankEdges = [
        new xy(tRR.br.x - tRR.tr.x, tRR.br.y - tRR.tr.y),
        new xy(tRR.bl.x - tRR.br.x, tRR.bl.y - tRR.br.y),
        new xy(tRR.tl.x - tRR.bl.x, tRR.tl.y - tRR.bl.y),
        new xy(tRR.tr.x - tRR.tl.x, tRR.tr.y - tRR.tl.y)
    ];
    let otherTankVertices = [
        new xy(oRR.tr.x, oRR.tr.y),
        new xy(oRR.br.x, oRR.br.y),
        new xy(oRR.bl.x, oRR.bl.y),
        new xy(oRR.tl.x, oRR.tl.y),
    ];
    let otherTankEdges = [
        new xy(oRR.br.x - oRR.tr.x, oRR.br.y - oRR.tr.y),
        new xy(oRR.bl.x - oRR.br.x, oRR.bl.y - oRR.br.y),
        new xy(oRR.tl.x - oRR.bl.x, oRR.tl.y - oRR.bl.y),
        new xy(oRR.tr.x - oRR.tl.x, oRR.tr.y - oRR.tl.y)
    ];

    let thisRectPolygon = new polygon(thisTankVertices, thisTankEdges);
    let otherRectPolygon = new polygon(otherTankVertices, otherTankEdges);

    if (sat(thisRectPolygon, otherRectPolygon)) {
      return true;
    } else {
      if(thisRect.angle === 0 && otherRect.angle === 0){
        if(!(
            thisRect.x>otherRect.x+otherRect.width || 
            thisRect.x+thisRect.width<otherRect.x || 
            thisRect.y>otherRect.y+otherRect.height || 
            thisRect.y+thisRect.height<otherRect.y
        )){
          return true;
        } else {
          return false;
        }
      } 
    }
}

export default detectColision;