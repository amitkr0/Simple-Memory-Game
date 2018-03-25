var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var len = prompt("enter grids size which should be even number");
if(len==="" || len % 2){
	alert("grid size should be even");
	window.location.reload();
}

var gridSize = 100;

canvas.height = gridSize*len;
canvas.width = gridSize*len;

var stepCount = 0;
var clickCount = 0;
var outputDisplayed = 0;
var grids = [];
var gridAtFirstClick = null;

canvas.addEventListener("click",function(e){
	var x = e.clientX - canvas.offsetLeft;
	var y = e.clientY - canvas.offsetTop;
	checkValues(x,y);
},false);



function initialiseGrid(){
	var array = [];
	var arraySize = len*len;
	var temp = [];
	for(var i=0;i<arraySize;++i){
		temp.push(i);
	}
	console.log(temp);
	for(var i=0;i<arraySize;++i){
		var val = temp[Math.floor(Math.random()*temp.length)];
		temp.splice(temp.indexOf(val),1);
		array.push((val%(len*2))+1);
	}
	console.log(array);

	for(c=0; c<len; c++) {
	    grids[c] = [];
	    for(r=0; r<len; r++) {
	        grids[c][r] = { x: 0, y: 0, status:0, val:array[c*len+r] };
	    }
	}
}



function drawgrids() {
    for(c=0; c<len; c++) {
        for(r=0; r<len; r++) {
    		var gridX = c*gridSize;
            var gridY = r*gridSize;
            grids[c][r].x = gridX;
            grids[c][r].y = gridY;
            context.beginPath();
            context.rect(gridX, gridY, gridSize, gridSize);
            context.fillStyle = "#93ACE7";
            context.fill();
            context.linewidth = '10';
           	context.strokeStyle = 'black';
            context.font = 'italic 30px Calibri';
            if(grids[c][r].status===1){
            	context.strokeText(grids[c][r].val,gridX+(gridSize/2),gridY+(gridSize/2));	
            }
            context.stroke();
            context.closePath();     
        }
    }
}


function checkValues(x,y){
	for(c=0; c<len; c++) {
	    for(r=0; r<len; r++) {
	        var g = grids[c][r];
            if(x > g.x && x < g.x+gridSize && y > g.y && y < g.y+gridSize && g.status===0){
            	clickCount++;
            	if(clickCount%2==0){
            		stepCount+=1;
            		if(g.val===gridAtFirstClick.val){
            			outputDisplayed+=2;
            			g.status=1;
            			gridAtFirstClick.status=1;
            			if(outputDisplayed===(len*len)){
            				alert("You Win\nSteps Required = "+stepCount);
            				window.location.reload();
            			}
            		}
            		else{
            			g.status=1;
            			drawgrids();
            			setTimeout(function() {					 
							g.status=0;
    	        			gridAtFirstClick.status=0;
    	        			drawgrids();
						}, 500);
            		}
            		clickCount=0;
            		document.getElementById("displayMessage").innerHTML="Steps : "+stepCount;
            	}
            	else{
            		gridAtFirstClick = g;
            		g.status=1;
            	}
            	drawgrids();
            }
	    }
	}
}

initialiseGrid();
drawgrids();