// JavaScript File

var count=0;
var num=0;

var v = new Point2d();
v.x = 3;
v.y = 3;

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
    var a = mvc(v,vertices);

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
// https://doc.cgal.org/latest/Barycentric_coordinates_2/index.html#gbc_deg_mean_value_coordinates

function mvc(v,vertices){

    var b = [];
    var w = [];
    w = mvc_weights(v,vertices);
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

function mvc_weights(v,vertices){

    var d = [];
    var w = [];

    var pt;

    for(var i=0; i<vertices.length; i++){

      pt = new Point2d(vertices[i].x - v.x, vertices[i].y - v.y);
      d.push(pt);

    }

    for(var i=0; i<vertices.length; i++){
        //console.log(d[i]);
        var ri = length(d[i].x,d[i].y);

        //var ri = length(d[i]);

        var tim1 = compute_t(d, i-1);
        var ti = compute_t(d, i);
        //console.log(tim1,ti);
        w[i] = (tim1 + ti) / ri;
    }
    return w;
}

//function length(v){ v.x, v.y
function length(x,y){
    return Math.sqrt(x*x + y*y);
}

function compute_t(d, i){
    //console.log(d,i);

    var n = d.length-1;
    var di = d[i%n+1];
    var dip1 = d[(i+1)%n+1];

    if((i%n+1)==0){
       num++;
     }
    if((i%n+1)==2){
      dip1 = d[0];
    }
    if((i%n+1)==1 && num==1){
      di = d[0];
      dip1 = d[1];
    }

    /*
    var n = d.length-1;
    var di = d[i%n+1];
    var dip1 = d[(i+1)%n+1];
    */
    //console.log(i%n+1, (i+1)%n+1);

    var ri = length(di.x,di.y);
    var rip1 = length(dip1.x,dip1.y);

    //console.log(di.x, di.y, dip1.x, dip1.y);

    //two vector coordinate
    var dt = dot(di,dip1);

    //
    var dt2 = det(di,dip1);

    //console.log(ri, rip1, dt, dt2);

    return dt2/((ri*rip1)+dt);
}

function dot(d1, d2){
    return (d1.x*d2.x + d1.y*d2.y);
}

function det(d1, d2){
    return (d1.x*d2.y - d1.y*d2.x);
}
