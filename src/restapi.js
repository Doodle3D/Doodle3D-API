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
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
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