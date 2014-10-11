function gridLayout(goats){
	var output =''
	for(var i=0,len=goats.length; i < len;i++){
		var farmGoat = goats[i]
		if( i%3 == 0){
			output += '<div class="row">'
		}
		
		output += singleGrid(farmGoat);
		
		if(i%3 == 2){
			output += '</div>'
		}
		
	}
	
	$('#goats').html(output);
}

function singleGrid(farmGoat){
	output = "";
	
	output += "<div class='col-md-4 col-sm-4 col-xs-4'>";
		output += "<div class='row'>";
			output += "<div class='col-md-12'>";
				if(farmGoat.profile_picture){
					output += "<img src='" + farmGoat.profile_picture.large +"' width='100%'>";
				}
				else{
					output += '<img src="/img/missing_goat.png" width="100%">'
				}
			output += "</div>";
		output += "</div>";
		output += "<div class='row'>";
			output += "<div class='col-md-12' style='text-align:center;'>";
				output += "<h4><a href='/"+farmGoat.goat.sex+"s/"+ farmGoat.goat.reg_num+ "'>"+ farmGoat.goat.fullName + "</a></h4>"
				output += formatDateStandard(new Date(farmGoat.goat.dob));
			output += "</div>"
		output += "</div>";
	output += "</div>";
	return output;
}

function goatPageLayout(goat){
	
	farmGoat = goat[0]
	if(!farmGoat){
		farmGoat = goat;
	}
	
	if(farmGoat.profile_picture){
		$('#goatImage').html("<img src='" + farmGoat.profile_picture.large +"' width='100%'>");
	}
	else{
		$('#goatImage').html("<img src='/img/missing_goat.png'>");
	}
	$('#name').html(farmGoat.goat.fullName + "</a>");
	if(farmGoat.goat.sire){
		goatPages.getGoats(checkSire, {reg_num: farmGoat.goat.sire.reg_num })
		$('#sire').append(farmGoat.goat.sire.fullName)
	}
	if(farmGoat.goat.dam){
		goatPages.getGoats(checkDam, {reg_num: farmGoat.goat.dam.reg_num })
		$('#dam').append(farmGoat.goat.dam.fullName)
	}
	$('#dob').append(formatDateStandard(new Date(farmGoat.goat.dob)));
	$('#description').append(farmGoat["description"]);
	
	if(farmGoat.goat.goat_pictures){
		pictures = "";
		
		for(var i=0, len= farmGoat.goat.goat_pictures.length; i < len; i++){
			picture = farmGoat.goat.goat_pictures[i]
			pictures += "<a href='" + picture.large +"'><img src='" + picture.large + "' alt='" + picture['caption'] + "'></a>"
		}
		
		$('#pictures').html(pictures);
	}
	else{
		$('#pictures').html("Sorry No Pictures")
	}
}

function checkSire(farmGoat){
	if(farmGoat.length > 0){
		output = "Sire: ";
		output += "<a href='/goat?reg_num=" + farmGoat[0].goat.reg_num + "'>" + farmGoat[0].goat.fullName + "</a>"
		$('#sire').html(output);
	}
}

function checkDam(farmGoat){
	if(farmGoat.length > 0){
		output = "Dam: ";
		output += "<a href='/goat?reg_num=" + farmGoat[0].goat.reg_num + "'>" + farmGoat[0].goat.fullName + "</a>"
		$('#dam').html(output);
	}
}
