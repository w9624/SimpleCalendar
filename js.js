var year, currentYear;
var month, currentMonth;
var day, currentDay;
var week, currentWeek;
var date;

//获取当前时间，并进行设置
function currentTime(){
	// 获取年月面板
	var yearPane = document.getElementById("year");
	var monthPane = document.getElementById("month");
	
	//获取当前Date对象，并获取当前年，月，日，星期
	date = new Date();
	currentYear = date.getFullYear();
	currentMonth = date.getMonth();
	currentDay = date.getDate();
	currentWeek = date.getDay();
	
	//用year， month记住当前年月
	month = currentMonth;
	year = currentYear;
	
	//初始化年月面板值
	yearPane.innerHTML = currentYear;
	monthPane.innerHTML = monthToString(currentMonth);
	getMonthDays(year, currentMonth);
}

// 向上一月，下一月按钮添加事件
document.getElementById("last").addEventListener("click", function(){updateDaysPane(1)});
document.getElementById("next").addEventListener("click", function(){updateDaysPane(2)});

// 修改年月，日期面板
function updateDaysPane(flag){
	// 获取年月面板
	var yearPane = document.getElementById("year");
	var monthPane = document.getElementById("month");
	
	//判断是上一月还是下一月
	if(flag == 1){
		if(month == 0){
			year = --year;
			month = 11;
		}else{
			month = --month;
		}
	}else if(flag == 2){
		if(month == 11){
			year = ++year;
			month = 0;
		}else{
			month = ++month;
		}
	}
	
	//移除原来ul中的所有li（移除前一个之后，后一个节点的下表自动减一）
	var k = 0;
	while(daysPane.hasChildNodes()){
		daysPane.removeChild(daysPane.childNodes[k]);
	}
	
	//修改年，月，日期面板的值
	yearPane.innerHTML = year;
	monthPane.innerHTML = monthToString(month);
	getMonthDays(year, month);
}

// 对日期面板进行设置
var position;
var num;
function getMonthDays(yea, mon){
	var daysPane = document.getElementById("daysPane");
	var date = new Date(yea + "-" + (mon + 1) + "-1");
	week = date.getDay();
	var days = checkMonth(yea, mon);
	num = days;
	
	for (var i = 1; i <= (42 - week); i++){
		var li=document.createElement("li");
		li.setAttribute("id",i);
		
		if(i <= days){
			var node=document.createTextNode(i);
			li.appendChild(node);
			if(i == 1){
				li.style.marginLeft = week * 14.28 + "%";
			}
			if(i == currentDay && yea == currentYear && mon == currentMonth){
				li.style.backgroundColor = "#1ABC9C";
				li.style.color = "white";
				position = li.id;
			}
		}else{
			li.style.backgroundColor = "#eee";
			if(i == (42 - week)){
				li.style.fontSize = "23px";
			}
		} 
		daysPane.appendChild(li);
	}
	timer();
}

function timer(){
		var today = new Date();
		var lis = document.getElementsByTagName("li");
		var h=today.getHours();
		var m=today.getMinutes();
		var s=today.getSeconds();
		// 在小于10的数字前加一个‘0’
		if(h < 10){
			h = "0" + h;
		}
		if(m < 10){
			m = "0" + m;
		}
		if(s < 10){
			s = "0" + s;
		}
		lis[lis.length - 1].innerHTML=h+":"+m+":"+s;
		setTimeout(function(){timer()},500);
}

document.getElementById("daysPane").onclick = function(){
	var e = e || window.event;
	var target = e.target;
	// console.log(num);
	if(((num >=target.id && target.id >= currentDay && month == currentMonth) || year > currentYear || (year == currentYear && month > currentMonth)) && target.id > 0){
		target.style.backgroundColor = "#1ABC9C";
		target.style.color = "white";
		target.style.hover = "#1ABC9C";
		
		var lis = document.getElementsByTagName("li");
		for(var i = 0; i < lis.length; i++){
			//console.log(lis[i].id);
			if(lis[i].id == position){
				// console.log("right");
				console.log(lis[i].nodeType);
				lis[i].style.backgroundColor = "#eee";
				lis[i].style.color = "#222";
			}
		}
		position = target.id;
	}
}

//判断月份，返回天数
function checkMonth(yea, mon){
	switch(++mon){
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:return 31;
		case 4:
		case 6:
		case 9:
		case 11:return 30;
		case 2:if((year % 400 == 0) || ((year % 100 != 0) && (year % 4 == 0))){
			return 29;
		}else{
			return 28;
		}
	}
}

// 将月份的数字转为英文字符串
function monthToString(mon){
	switch(mon){
		case 0:return "JANUARY";
		case 1:return "FEBRUARY";
		case 2:return "MARCH";
		case 3:return "APRIL";
		case 4:return "MAY";
		case 5:return "JUNE";
		case 6:return "JULY";
		case 7:return "AUGUST";
		case 8:return "SEPTEMBER";
		case 9:return "OCTOBER";
		case 10:return "NOVEMBER";
		case 11:return "DECEMBER";
	}
}