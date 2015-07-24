import $ from 'jquery';

export function get (url) {

	return new Promise((resolve, reject) => {

		$.ajax({
			url: url, 
			dataType: 'json', 
			timeout: 5000, 
			success: (response) => {

				if (response.status === 'success') {
					resolve(response.data);
				}
				else {
					reject(response.msg);
				}
			}
		}).fail(reject);	

	});
}

export function post (url, data) {

	return new Promise((resolve, reject) => {

		$.ajax({
			url: url, 
			type: 'POST', 
			data: data, 
			dataType: 'json', 
			timeout: 10000, 
			success: (response) => {

				if (response.status === 'success') {
					resolve(response.data);
				}
				else {
					reject(response.msg);
				}

			}
		}).fail(reject);
	});
}

/*
import 'github/fetch';

export function get (url) {

	return new Promise((resolve, reject) => {

		fetch(url).then((response) => {

			return response.json();

		}).then((json) => {

			if (json.status === 'success') {
				resolve(json.data);
			}
			else {
				reject(json.msg);
			}

		}).catch(reject);

	});
}

export function post (url, data) {

	return new Promise((resolve, reject) => {

		fetch(url, {
			method: 'post', 
			enctype: 'x-www-form-urlencoded', 
			headers: {
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		}).then((response) => {

			return response.json();

		}).then((json) => {

			if (json.status === 'success') {
				resolve(json.data);
			}
			else {
				reject(json.msg);
			}

		}).catch(reject);
	});
}
*/