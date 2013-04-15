var geo = "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ";
var eng = "abgdevzTiklmnopJrstufqRySCcZwWxjh";
var inputField = document.getElementsByName("q")[0];
var searchButton = document.getElementsByName("btnG")[0];

function getQuery(){// get typed query using the Googles divs name
	return inputField.value;
}

function isLetter(str) { // pattern for domain part which are no letters 
	return !/^\d+|-+|\.+$/.test(str);
}

function isDomain(str) {// regex for Domain name in English
	return /^((?:[a-z0-9-]+\.)+(?:com|net|org))$/.test(str);
}

function isDomeInGeo(str) { // regex for Domain name in Goergian
	return /^((?:[ა-ჰ0-9-]+\.)+(?:ცომ|ნეტ|ორგ|გე))$/.test(str);
}

function translateQuery(query){ //translating query into possible English variant
	var translatedQuery = "";
	for (var i=0; i<query.length;i++) {
		if (isLetter(query[i])) {
			translatedQuery += eng[geo.indexOf(query[i])];
		} else {
			translatedQuery +=query[i];
		}
	}
	return translatedQuery;
}

function changeQuery(str){ // changing query into suggestion
	inputField.value = str;
}


// main process
function processQuery() {
	var query = getQuery();
	if (isDomeInGeo(query)) { //if it's correct query in Georgian
		changeQuery(translateQuery(query));
		searchButton.click();
		
	}
}
//typed in address bar
processQuery();

//click on the search button using mouse
searchButton.onclick = function(){
    processQuery();
};

//hit enter
inputField.onkeydown = function(e){
	if(e.keyCode == 13) {
		processQuery();
	}
}