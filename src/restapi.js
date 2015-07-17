import $ from 'jquery';
//in future remove jquery and use framework specificly for ajax calls or write own ajax calls

export default {
	post (url, data, callback) {
		$.ajax({
			url: url, 
			type: 'POST', 
			data: data, 
			dataType: 'json', 
			timeout: 10000, 
			success: function (response) {
				if (response.status === 'success') {
					if (callback !== undefined) {
						callback(null, response);
					}
				}
				else {
					callback(response.msg);
				}
			}
		}).fail(function () {
			callback('Failed connecting to ' + url);
		});
	}, 

	get (url, callback) {
		$.ajax({
			url: url, 
			dataType: 'json', 
			timeout: 5000, 
			success: function (response) {
				if (response.status === 'success') {
					if (callback !== undefined) {
						callback(null, response.data);
					}
				}
				else {
					callback(response.msg);
				}
			}
		}).fail(function () {
			callback('Failed connecting to ' + url);
		});	
	}
};