/* classes */

// Vector class
class Vector {
    constructor(x,y,z) {
        this.set(x,y,z);
    } // end constructor

    // sets the components of a vector
    set(x,y,z) {
        try {
            if ((typeof(x) !== "number") || (typeof(y) !== "number") || (typeof(z) !== "number"))
                throw "vector component not a number";
            else
                this.x = x; this.y = y; this.z = z;
        } // end try

        catch(e) {
            console.log(e);
        }
    } // end vector set

    // copy the passed vector into this one
    copy(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.copy: non-vector parameter";
            else
                this.x = v.x; this.y = v.y; this.z = v.z;
        } // end try

        catch(e) {
            console.log(e);
        }
    }

    toConsole(prefix="") {
        console.log(prefix+"["+this.x+","+this.y+","+this.z+"]");
    } // end to console

    // static dot method
    static dot(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.dot: non-vector parameter";
            else
                return(v1.x*v2.x + v1.y*v2.y + v1.z*v2.z);
        } // end try

        catch(e) {
            console.log(e);
            return(NaN);
        }
    } // end dot static method

    // static cross method
    static cross(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.cross: non-vector parameter";
            else {
                var crossX = v1.y*v2.z - v1.z*v2.y;
                var crossY = v1.z*v2.x - v1.x*v2.z;
                var crossZ = v1.x*v2.y - v1.y*v2.x;
                return(new Vector(crossX,crossY,crossZ));
            } // endif vector params
        } // end try

        catch(e) {
            console.log(e);
            return(NaN);
        }
    } // end dot static method

    // static add method
    static add(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.add: non-vector parameter";
            else
                return(new Vector(v1.x+v2.x,v1.y+v2.y,v1.z+v2.z));
        } // end try

        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end add static method

    // static subtract method, v1-v2
    static subtract(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.subtract: non-vector parameter";
            else {
                var v = new Vector(v1.x-v2.x,v1.y-v2.y,v1.z-v2.z);
                return(v);
            }
        } // end try

        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end subtract static method

    // static scale method
    static scale(c,v) {
        try {
            if (!(typeof(c) === "number") || !(v instanceof Vector))
                throw "Vector.scale: malformed parameter";
            else
                return(new Vector(c*v.x,c*v.y,c*v.z));
        } // end try

        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end scale static method

    // static normalize method
    static normalize(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.normalize: parameter not a vector";
            else {
                var lenDenom = 1/Math.sqrt(Vector.dot(v,v));
                return(Vector.scale(lenDenom,v));
            }
        } // end try

        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end scale static method

} // end Vector class


// Color constructor
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0))
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255))
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a;
            }
        } // end try

        catch (e) {
            console.log(e);
        }
    } // end Color constructor

        // Color change method
    change(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0))
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255))
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a;
            }
        } // end throw

        catch (e) {
            console.log(e);
        }
    } // end Color change method
} // end color class


/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height))
            throw "drawpixel location outside of image";
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else
            throw "drawpixel color is not a Color";
    } // end try

    catch(e) {
        console.log(e);
    }
} // end drawPixel

//get the input triangles from the standard class URL
function getInputTriangles() {
    const INPUT_TRIANGLES_URL =
        "https://ncsucgclass.github.io/prog1/triangles.json";

    // load the triangles file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_TRIANGLES_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input triangles file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response);
} // end get input triangles


//put random points in the triangles from the class github
function drawRandPixelsInInputTriangles(context) {
    var inputTriangles = getInputTriangles();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.1;
    var numCanvasPixels = (w*h)*PIXEL_DENSITY;

    var ulx = 0, uly = 0; // upper left corner position
    var urx = context.canvas.width, ury = 0; // upper right corner position
    var llx = 0, lly = context.canvas.height; // lower left corner position
    var lrx = context.canvas.width, lry = context.canvas.height; // lower right corner position

    var vDelta = 1 / (lly-uly);
    var hDelta = 1 / (urx-ulx);

    var eye = new Vector(0.5, 0.5, -0.5)

    //interpolation
    for (var y = uly; y < lly; y++) {
        for (var x = ulx; x < urx; x++) {
            var pixelWorld = new Vector(x*(1/context.canvas.width), 1-y*(1/context.canvas.height), 0);

            // figure out line from eye into space
            var lineSlope = Vector.subtract(pixelWorld, eye);

            // find each triangle and see if it intersects with the line
            if (inputTriangles != String.null) {

                for (var nTri = 0; nTri < inputTriangles.length; nTri++) {
                    for (var t = 0; t < inputTriangles[nTri].triangles.length; t++) {

                        // find the vertices that make up the triangle
                        var v1 = inputTriangles[nTri].triangles[t][0]
                        var v2 = inputTriangles[nTri].triangles[t][1]
                        var v3 = inputTriangles[nTri].triangles[t][2]

                        // get the world coordinates of those vertices
                        var a = new Vector(inputTriangles[nTri].vertices[v1][0],
                                           inputTriangles[nTri].vertices[v1][1],
                                           inputTriangles[nTri].vertices[v1][2]);

                        var b = new Vector(inputTriangles[nTri].vertices[v2][0],
                                           inputTriangles[nTri].vertices[v2][1],
                                           inputTriangles[nTri].vertices[v2][2]);

                        var c = new Vector(inputTriangles[nTri].vertices[v3][0],
                                           inputTriangles[nTri].vertices[v3][1],
                                           inputTriangles[nTri].vertices[v3][2]);


                        // find the normal of the triangle
                        var ab = Vector.subtract(a, b);
                        var cb = Vector.subtract(c, b);
                        var normal = Vector.cross(ab, cb);

                        var planeConstant = Vector.dot(normal, a);
                        if ( Math.abs(planeConstant) < .0000000001 ) {
                            // no intersection
                            continue;
                        }

                        // determine if it intersects the triangle
                        var distanceEyeToTriangle = (((planeConstant -
                                                     Vector.dot(normal, eye))) /
                                                     (Vector.dot(normal, lineSlope)));

                        var iPoint = Vector.add(
                                        Vector.scale(distanceEyeToTriangle, lineSlope),
                                        eye);

                        var iVector = [NaN, NaN, NaN];

                        var vertVector = [a, b, c];
                        for (var edge = 0; edge < 3; edge++) {
                            var iMinusVertVector = Vector.subtract(iPoint, vertVector[edge]);
                            var v0MinusV1 = Vector.subtract(vertVector[(edge + 1) % 3], vertVector[edge]);
                            var crossSub = Vector.cross(iMinusVertVector, v0MinusV1);

                            var dotNorm = Vector.dot(normal, crossSub);
                            if (dotNorm != 0) {
                                iVector[edge] = (dotNorm) / (Math.abs(dotNorm));
                            } else {
                                iVector[edge] = 0;
                            }
                        }

                        // if they all have the same sign, then we color the pixel

                        if (iVector[0] == iVector[1] && iVector[1] == iVector[2]) {
                            var pixelColor = new Color(0,0,0,255);
                            pixelColor.r = inputTriangles[nTri].material.diffuse[0] * 255
                            pixelColor.g = inputTriangles[nTri].material.diffuse[1] * 255
                            pixelColor.b = inputTriangles[nTri].material.diffuse[2] * 255
                            drawPixel(imagedata,x, y, pixelColor)
                        }
                    }
                }
            }
        }
    }
    context.putImageData(imagedata, 0, 0); // end if triangle file found
} // end draw rand pixels in input triangles


/* main -- here is where execution begins after window load */

function main() {

    // Get the canvas and context
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");


    drawRandPixelsInInputTriangles(context);

}
