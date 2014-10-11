
//= require _vendor/_jquery.min.js
//= require _vendor/bootstrap.min.js
//= require html5shiv.js
//= require goatpages.js
//= require maynesboergoats.js

goatPages.setSubdomain('maynesboergoats');

function formatDateStandard(date){
	return (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
