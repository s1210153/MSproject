// JavaScript File

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
    for(var i=0; i<vertices.length; i++){
        d[i]  = Point2d(vertices[i].x - v.x, vertices[i].y - v.y);

    }

    for(var i=0; i<vertices.length; i++){
        var ri = length(d[i]);
        var tim1 = compute_t(d, i-1);
        var ti = compute_t(d, i);

        w[i] = (tim1 + ti) / ri;
    }

    return w;
}

function length(v){

    return Math.sqrt(v.x*v.x + v.y*v.y);

}


function compute_t(d, i){
    var n = d.length;
    var di = d[i%n];
    var dip1 = d[(i+1)%n];

    var ri = length(di);
    var rip1 = length(dip1);

    //two vector coordinate
    var dt = dot(di,dip1);

    //
    var dt2 = det(di,dip1);

    return dt2/((ri*rip1)+dt);

}


function dot(d1, d2){

    return (d1.x*d2.x + d1.y*d2.y);

}

function det(d1, d2){

    return (d1.x*d2.y - d1.y*d2.x);

}
