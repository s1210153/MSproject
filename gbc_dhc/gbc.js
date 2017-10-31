// JavaScript File

var count=0;
var num=0;

var v = new Point2d();
v.x = 3;
v.y = 2;

var vertices = [];
vertices[0] = new Point2d();
vertices[0].x = 0;
vertices[0].y = 0;
vertices[1] = new Point2d();
vertices[1].x = 6;
vertices[1].y = 0;
vertices[2] = new Point2d();
vertices[2].x = 3;
vertices[2].y = 6;

function main(){
    var canvas = document.getElementById('example');
    if(!canvas){
        console.log('error');
        return;
    }

    var ctx = canvas.getContext('2d');
    var a = dhc(v,vertices);

    ctx.beginPath();
    ctx.moveTo(vertices[0].x*100,vertices[0].y*100);
    ctx.lineTo(vertices[1].x*100,vertices[1].y*100);
    ctx.lineTo(vertices[2].x*100,vertices[2].y*100);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';
    ctx.fill();
    console.log(a);
}

function Point2d(x, y) {
    this.x = x;
    this.y = y;
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
// https://doc.cgal.org/latest/Barycentric_coordinates_2/index.html#gbc_discrete_harmonic_coordinates

function dhc(v,vertices){

    var b = [];
    var w = [];
    w = dhc_weights(v,vertices);
    console.log(w);
    var wsum = 0;
    for(var i=0; i<vertices.length; i++){
        wsum += w[i];
    }

    for(var i=0; i<vertices.length; i++){
      b[i]= w[i] / wsum;
    }

    return b;
}

function dhc_weights(v,vertices){

    var w = [];
    var n = vertices.length;

    for(var i=0; i<vertices.length; i++){

      //if(a+b < Math.PI){

        var rim1 = length(vertices[(i+n-1)%n].x,vertices[(i+n-1)%n].y);
        var ri = length(vertices[(i+n)%n].x,vertices[(i+n)%n].y);
        var rip1 = length(vertices[(i+n+1)%n].x,vertices[(i+n+1)%n].y);

        var bi = compute_s(vertices[(i+n-1)%n],v,vertices[(i+n+1)%n]);
        var aim1 = compute_s(v,vertices[(i+n)%n],vertices[(i+n-1)%n]);
        var ai = compute_s(v,vertices[(i+n)%n],vertices[(i+n+1)%n]);

        w[i] = ((Math.pow(rip1,2)*aim1)-(Math.pow(ri,2)*bi)+(Math.pow(rim1,2)*ai))/(aim1*ai);
    }
    return w;
}

//function length(v){ v.x, v.y
function length(x,y){
    return Math.sqrt(x*x + y*y);
}


function compute_s(v1,v2,v3){

  return Math.abs((v1.x-v3.x)*(v2.y-v3.y)-(v2.x-v3.x)*(v1.y-v3.y))/2;

}
