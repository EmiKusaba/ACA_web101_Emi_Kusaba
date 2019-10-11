var grid = [[0,0,0],[0,0,0],[0,0,0]];
var moveCount=0;
var resetting=false;

var human="X";
var AI="O";

var single = true;

var lastgame=[];
var thisgame=[];

$(document).ready(function(){
	
	$(document).on("click",".square",function(e){
		 if(resetting||!e.target.id||tryMove(e.target.id,human))return;
		 if(single){
			 resetting=true;
		   setTimeout(aiTurn,150)
		 }
		 else AI = [human, human = AI][0];
	});
	$(document).on("click",".player button",function(e){
		if(resetting)return;
		AI = [human, human = AI][0];
		winSequence("");
		$(".player button").attr("disabled",false);
		$(e.target).attr("disabled",true);
	});
	$(document).on("click",".mode button",function(e){
		if(resetting)return;
		$(".mode button").attr("disabled",false);
		$(e.target).attr("disabled",true);
		single=!single;
		if(!$("#X").is(":disabled"))$("#X").trigger("click");
		else winSequence("");
		if(e.target.id=="single"){
			setTimeout(()=>$("#O").attr("disabled",false),2050)
			AI = "O";
			human = "X";
			$(".player").fadeTo(1000,1);
		}
		else{ 
			$("#O").attr("disabled",true);
			$(".player").fadeTo(1000,0);
		}
	});
	$(document).on("click","#repeat",repeatLastGame);
});

function aiTurn(){
	
	resetting=false;
	let corners=["00","02","22","20"];
	let sides=["01","10","12","21"];
	let moves=[]
	for(let i=0;i<grid.length;i++){
		for(let j=0;j<grid[i].length;j++){
			if(grid[i][j]==0)moves.push(""+i+j);
		}
	}
	if(moves.length==0)return;

	for(let i=0;i<moves.length;i++){
		var gridCopy = grid.map(arr=>arr.slice());
		let x=Number(moves[i][0]);
		let y=Number(moves[i][1]);
		gridCopy[x][y]=AI;
		if(checkWin(x,y,AI,gridCopy)){
			return tryMove(moves[i],AI);
		}
	}
	for(let i=0;i<moves.length;i++){
		var gridCopy = grid.map(arr=>arr.slice());
		let x=Number(moves[i][0]);
		let y=Number(moves[i][1]);
		gridCopy[x][y]=human;
		if(checkWin(x,y,human,gridCopy)){
			return tryMove(moves[i],AI);
		}
	}
	if(moveCount==0)return tryMove(corners[Math.floor(Math.random()*corners.length)],AI);
	if(moveCount==3){
		if((grid[0][0]==human&&grid[2][2]==human)||(grid[0][2]==human&&grid[2][0]==human)){
			let id = sides[Math.floor(Math.random() * sides.length)];
			return tryMove(id,AI);
		}
	}
	if(moves.includes("11"))return tryMove("11",AI);
	if(corners.some((c,ind)=>{
		if(grid[c[0]][c[1]]=="X" && moves.includes(corners[(ind+2)%4])){
			tryMove(corners[(ind+2)%4],AI);
			return true;
		}
		return false;
	}))return;
	let freeCorners = corners.filter(c=>moves.includes(c));
	if(freeCorners.length>0){
		let id = freeCorners[Math.floor(Math.random() * freeCorners.length)];
		tryMove(id,AI);
		return;
	}

	let id = moves[Math.floor(Math.random() * moves.length)];
	tryMove(id,AI);
}

function tryMove(id,item){
	let row=Number(id[0]);
	let col=Number(id[1]);
	if(grid[row][col]!==0)return true;
	grid[row][col]=item;
	var target = $("#"+id);
	moveCount++;
	thisgame.push({id,item});
	$(target).html(`<div class="sign">${item}</div>`);
	let win=checkWin(row,col,item,grid);
	if(win){
		winSequence(win);
		lastgame=thisgame;
	  thisgame=[];
		return true;
		}
	return false;
	}

function checkWin(x,y,player,grid){
	let toCheck = [["00","01","02"],
								["10","11","12"],
								["20","21","22"],
								["00","10","20"],
								["01","11","21"],
								["02","12","22"],
								["00","11","22"],
								["02","11","20"]];
	
	for(let item of toCheck){
		//for(let id of item){
			
		if(item.some(id=>grid[id[0]][id[1]] != player))continue;		
		return [player+" wins!",item];
	}
	if(moveCount>=9)return ["Draw!"];
	return false;
}



function showWinner(win){
	let color=`hsl(${Math.random()*360}, 100%, 50%)`;
	win[1].forEach(item=>{
		$(`#${item}`).css({
			transition: "background-color 1s ease-in-out",
			"background-color": color
		});
	});
}
function resetBoard(win,reset){
	$(".results").css("background-color",`hsl(${Math.random()*360}, 50%, 15%)`);
	$(".results").html(win?win[0]:"");
	$(".results").show();
	$(".game").fadeOut(1000,"swing",()=>{
		$(".results").fadeOut(1000);
		$(".square").css("background-color",`hsl(${Math.random()*360}, 50%, 20%)`);
		$(".square").html("");
		$(".square").css("width","");
		$(".game").fadeIn(1000,"swing",()=>{
			resetting=false;
			if(lastgame.length!=0)$("#repeat").prop("disabled",false);
			if(AI=="X"&&!reset)single?aiTurn():AI = [human, human = AI][0];
		});
	});
	grid = [[0,0,0],[0,0,0],[0,0,0]];
	moveCount=0;
}


function winSequence(win){
	resetting=true;
	let timeout = 0;
	if(win&&win[0]!="Draw!"){
			showWinner(win);
			timeout+=2000;
	}
	setTimeout(resetBoard,timeout,win);
}

function repeatLastGame(){
	if(resetting)return;
	thisgame=[];
	resetBoard(null,true);
	$("#repeat").prop("disabled",true);
	let sleep=1000;
	setTimeout(()=>resetting=true,2050);
	for(let move of lastgame){
		sleep+=1000;
		setTimeout(tryMove,sleep,move.id,move.item);
	}
	setTimeout(()=>$("#repeat").prop("disabled",false),sleep+2000)
}


// let previousGamePiece = null
// function addGamePiece(selectedElement) {
//   //create new element
//   let newElement = document.createElement('h1')
//   if (previousGamePiece === 'x') {
//     // add text to element
//     newElement.innerHTML = 'o'
//     // set previousGamePiece
//     previousGamePiece = 'o'
//   } else {
//     // add text to element
//     newElement.innerHTML = 'x'
//     // set previousGamePiece
//     previousGamePiece = 'x'
//   }
  // add element with text to selectedElement on page
//   selectedElement.appendChild(newElement)
//   console.log('show clicked div', selectedElement)
// }