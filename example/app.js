import { Doodle3DManager } from 'src/index.js';

const doodle3DManager = new Doodle3DManager();
doodle3DManager.setAutoUpdate(true, 1000);

doodle3DManager.addEventListener('boxappeared', ({ box }) => {
	box.setAutoUpdate(true);

	box.addEventListener('connect', () => {
		console.log('connect to box', box);
	});

	box.addEventListener('disconnect', () => {
		console.log('disonnect to box', box);
	})

	box.addEventListener('update', ({ state }) => {
		console.log(state);
	});
});

doodle3DManager.addEventListener('boxdisappeared', ({ box }) => {
	box.setAutoUpdate(false);
});

doodle3DManager.addEventListener('boxeschanged', ({ boxes }) => {

});
