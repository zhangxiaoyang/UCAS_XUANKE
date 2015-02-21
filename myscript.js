/*
 * author	zhangxiaoyang.hit[at]gmail.com
 * version 	0.2
 * Fix setTimeout bugs
 *
 */
//////////////////////////////////////////
// Global vars
//////////////////////////////////////////
var TIMER_YYY;
var IS_RUNNING = false;
var FILTER_STRING;

//////////////////////////////////////////
// Functions
//////////////////////////////////////////
function addControls(){
	//create input
	var iptFilter = document.createElement("div");
	iptFilter.className = "menuRow";
	iptFilter.innerHTML = '<a href="#" style="color:red;"><img src="../CSS/Images/cd3.gif" border="0"><input id="filterString" type="text" style="width:130px" placeholder="输入课程编号"/></a>';
	
	//create button
	var left = window.frames["LeftFrame"].document;
	var menu = left.getElementById("menuTop");
	var btnRefresh = document.createElement("div");
	btnRefresh.className = "menuRow";
	btnRefresh.innerHTML = '<a href="#" id="btnRefresh" style="color:red;"><img src="../CSS/Images/cd3.gif" border="0">[点我刷课]</a>';
	btnRefresh.onclick = function() {
		var left = window.frames["LeftFrame"].document;
		var btnRefresh = left.getElementById("btnRefresh");
		if(IS_RUNNING){
			btnRefresh.innerHTML = '<img src="../CSS/Images/cd3.gif" border="0">[点我刷课]';
			IS_RUNNING = false;
			window.clearTimeout(TIMER_YYY);
		} else {
			btnRefresh.innerHTML = '<img src="../CSS/Images/cd3.gif" border="0">[停止刷课]';
			IS_RUNNING = true;
			FILTER_STRING = window.frames["LeftFrame"].document.getElementById("filterString").value;
			runRobot();
		}
	}
	
	//add them
	menu.appendChild(iptFilter);
	menu.appendChild(btnRefresh);
}

function filterContent(){
	var courseHtml = window.frames["MainFrame"].document;
	var courseTable = courseHtml.getElementById("CourseList");
	var keywords = FILTER_STRING.replace(/\s+/g, '').toUpperCase();
	for(var i=1; i<courseTable.rows.length; i++)
	{
		var currentRow = courseTable.rows[i];
		var cellID = currentRow.cells[2].children[0].text;
		var cellCheck = currentRow.cells[0].children[0].children[0];
		if(cellID.indexOf(keywords) > -1){
			if(!cellCheck.disabled){
				console.log(FILTER_STRING+"--"+cellID);
				currentRow.cells[0].children[0].children[0].checked = true;
				return true;
			} 
		}
	}
	return false;
}

function runRobot(){
	//window.frames["MainFrame"].location.reload();
	TIMER_YYY = window.setTimeout(function(){
		document.getElementsByTagName("frame")[2].onload = function() {
			if(filterContent()){
				window.clearTimeout(TIMER_YYY);
				//console.log(TIMER_YYY+" is cleaned");
				window.frames["MainFrame"].document.getElementById("SureBtn").click();
				alert("已经选课并提交至服务器，不保证一定能选上，请手动核对:)");
				window.location.reload();
				document.getElementsByTagName("frame")[2].onload = null;
			} else {
				if(IS_RUNNING) {
					runRobot();
				}
			}
		}
		window.frames["MainFrame"].location.reload();
	}, 1000);
	//console.log(TIMER_YYY+" is running");
}

//////////////////////////////////////////
// Main Entrance
//////////////////////////////////////////
window.onload = function(){
	addControls();
}
