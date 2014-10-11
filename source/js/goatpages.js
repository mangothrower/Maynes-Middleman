/*
	GoatPages.js - Library for easily accessing information contained at GoatPages.com	
	Requires Jquery
	
	Author: Joshua Edward Mayne
	Date: 1/19/2014
*/
	var goatPages = (function () {

		//Public Variables
		var subdomain
		
		//Private Variables
		var fullDomain
		var fullDomainSet = false;
		
		//Private Functions
		function setFullDomain(){
			fullDomain = 'http://'+subdomain + '.goatpages.com'
			//fullDomain = 'http://'+ subdomain + '.multi.dev'
			
			fullDomainSet= true;
		}
		
		//Public Functions
		function setSubdomain(subdomainName){
			subdomain = subdomainName;
			setFullDomain();
		}
		
		function getSubdomain(){
			return subdomain;
		}
		
		/*function getGoatsAll(callback){
			getGoatsAllCalled = true
			$.ajax(
				{
					type: 'GET',
					url: fullDomain + '/farm_goats.json',
					dataType: 'json',
					cache: false,
					success: function(response){
						dataAllGoats = response;
						goatsAllSuccess= true;
						callback(response);
					},
					error: function(response){
						goatsAllSuccess = false;
						callback(response);
					}
					
				}
			);		
		}*/
		
		function getGoats(callback, options){
			domain = fullDomain + '/farm_goats.json'
			
			var first = true
			
			if (options['sex']){
				if(first)
				{
					domain += '?sex=' + options['sex'];
					first = false;
				}
				else
				{
					domain += '&sex=' + options['sex'];
				}
			}
			if (options['status']){
				if(first)
				{
					domain += '?status=' + options['status'];
					first = false;
				}
				else
				{
					domain += '&status=' + options['status'];
				}
			}
			
			if(options.reg_num){
				if(first)
				{
					domain += '?reg_num=' + options['reg_num'];
					first = false;
				}
				else
				{
					domain += '&reg_num=' + options['reg_num'];
				}
			}
			if(options.limit){
				if(first)
				{
					domain +=  '?limit=' + options['limit'];
					first = false;
				}
				else
				{
					domain += '&limit=' + options['limit'];
				}
			}
			
			if(options.recent){
				if(first)
				{
					domain = domain + '?recent=' + options['recent'];
					first = false;
				}
				else
				{
					domain = domain + '&recent=' + options['recent'];
				}
			}
			
			$.ajax(
				{
					type: 'GET',
					url: domain,
					dataType: 'json',
					cache: true,
					success: function(response){
						callback(response);
					},
					error: function(response){
						callback(response);
					}
					
				}
			);
			
		}


		//Reveal public pointers to
		//private functions and properties
		return {
			setSubdomain: setSubdomain,
			getSubdomain: getSubdomain,
			getGoats: getGoats
		};

	})();