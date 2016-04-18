import $ from 'jquery';

const GET_TIMEOUT = 5000;
const POST_TIMEOUT = 10000;

// TODO
// implement queue meganism
const queue = [];

export function get (url) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: url, 
			dataType: 'json', 
			timeout: GET_TIMEOUT, 
			type: 'GET',
			success: (response) => {
				if (response.status === 'success') {
					resolve(response.data, response.msg);
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
			timeout: POST_TIMEOUT, 
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