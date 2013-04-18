var langs = "";
var geo = "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ";
var rus = "фипвумяЕшлдьтщзОкыегайКнЫСсЯцЦчорю";
var eng = "abgdevzTiklmnopJrstufqRySCcZwWxjh.";

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

function isDomaInGeo(str) { // regex for Domain name in Goergian
	return /^((?:[ა-ჰ0-9-]+\.)+(?:ცომ|ნეტ|ორგ|გე))$/.test(str);
}
function isDomaInRus(str) {
    return /^((?:[а-я0-9-,])+([ю,]{1})+(?:сщь|туе|щкп|пу|кг))$/.test(str);
}

function translateQuery(query, lang){ //translating query into possible English variant
	var translatedQuery = "";
	if (lang == "geo") {
		langs = geo;
	} else {
		langs = rus;
	}
	for (var i=0; i<query.length;i++) {
		if (isLetter(query[i])) {
			translatedQuery += eng[langs.indexOf(query[i])];
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
	if (isDomaInGeo(query)) { //if it's correct query in Georgian
		changeQuery(translateQuery(query, "geo"));
		searchButton.click();
	} else if (isDomaInRus(query)) {
		changeQuery(translateQuery(query, "rus"));
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