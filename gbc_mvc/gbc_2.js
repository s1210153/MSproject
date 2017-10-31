// JavaScript File



var v = new Point2d();
v.x = 1;
v.y = 1;

var vertices = [];
vertices[0] = new Point2d();
vertices[0].x = 1;
vertices[0].y = 3;
vertices[1] = new Point2d();
vertices[1].x = 0;
vertices[1].y = 1;
vertices[2] = new Point2d();
vertices[2].x = 3;
vertices[2].y = 0;
vertices[3] = new Point2d();
vertices[3].x = 3;
vertices[3].y = 3;




/*
var vertices = [
      'Point2d(1,3)',
      'Point2d(0,1)',
      'Point2d(3,0)',
      'Point2d(3,3)',
];
*/

function main(){
    var canvas = document.getElementById('example');
    if(!canvas){
        console.log('error');
        return;
    }

    var ctx = canvas.getContext('2d');
    var a = [];
    a = mvc(v,vertices);
    console.log(a);
}

function Point2d(x, y) {
    this.x = x;
    this.y = y;
    //console.log(this.x,this.y);
}

//compute v from vertices in one polygon mesh inside.
//input :
//   v is 2d point at coordinate are evaluated
//   vertices is input plygon as a list vertices in ccw order.
//   last edge is from vn-1 to v0.
//
//output :
//   weights is a list of weights.
//
// https://doc.cgal.org/latest/Barycentric_coordinates_2/index.html#gbc_deg_mean_value_coordinates

function mvc(v,vertices){

    var b = [];
    var w = [];
    w = mvc_weights(v,vertices);
    var wsum = 0;
    for(var i=0; i<vertices.length; i++){
        wsum += w[i];
    }

    for(var i=0; i<vertices.length; i++){
      b[i]= w[i] / wsum;
    }

    return b;
}

function mvc_weights(v,vertices){

    var d = [];
    var w = [];

    var pt;///

    for(var i=0; i<vertices.length; i++){

      //d[i] = new Point2d();
      pt = new Point2d(vertices[i].x - v.x, vertices[i].y - v.y);
      d.push(pt);
      console.log(d[i]);

      ///d[i]  = Point2d(vertices[i].x - v.x, vertices[i].y - v.y);

    }

    //console.log(d[0].Point2d.x);
    for(var i=0; i<vertices.length; i++){
        console.log(d[i]);
        var ri = length(d[i].x,d[i].y);///

        ///var ri = length(d[i]);
        var tim1 = compute_t(d, i-1);
        var ti = compute_t(d, i);

        w[i] = (tim1 + ti) / ri;
    }

    return w;
}

//function length(v){ v.x, v.y
function length(x,y){
    return Math.sqrt(x*x + y*y);
}


function compute_t(d, i){
    var n = d.length;
    var di = d[i%n];
    var dip1 = d[(i+1)%n];

    var ri = length(di);
    var rip1 = length(dip1);

    //two vector coordinate
    var dt = dot(di.x,di.y,dip1.x,dip1.y);

    //
    var dt2 = det(di,dip1);

    return dt2/((ri*rip1)+dt);

}


function dot(d1.x, d1.y, d2.x, d2.y){

    return (d1.x*d2.x + d1.y*d2.y);

}

function det(d1, d2){

    return (d1.x*d2.y - d1.y*d2.x);

}
