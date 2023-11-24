import { firestore } from './index';

const readAllPoints = async () => {
	try {
		const snapshot = await firestore.collection('artwork').doc('points').get();

		if (snapshot.exists) {
			const data = snapshot.data();

			if (data && data.points) {
				const points = data.points;
				return points;
			}
		}

		return [];

	} catch (error) {
		console.error('Error reading points:', error);
		return [];
	}
};

const clearArtworkPoints = async () => {
	try {
		await firestore.collection('artwork').doc('points').update({ points: [] });
		console.log('Artwork points cleared successfully!');
	} catch (error) {
		console.error('Error clearing artwork points:', error);
	}
};

const updateNewPoints = async (newPoints) => {
	await clearArtworkPoints();

	try {
		await firestore.collection('artwork').doc('points').update({ points: newPoints });
		console.log('Artwork points updated successfully!');
	} catch (error) {
		console.error('Error updating artwork points:', error);
	}
};

export { updateNewPoints, readAllPoints };
