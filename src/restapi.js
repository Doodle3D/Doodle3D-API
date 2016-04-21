import $ from 'jquery';

const GET_TIMEOUT = 5000;
const POST_TIMEOUT = 10000;

export function get (url) {
	return send(url, 'GET');
}

export function post (url, data) {
	return send(url, 'POST', data);
}

function send(url, type, data) {
	const timeout = (type === 'GET') ? GET_TIMEOUT : POST_TIMEOUT;

	return new Promise((resolve, reject) => {
		$.ajax({
			url, type, data, timeout, dataType: 'json',
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
