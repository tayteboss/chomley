import { firestore } from './index';

const readContributions = async () => {
	try {
		const siteDataRef = firestore.collection('data').doc('site-data');
		const siteDataDoc = await siteDataRef.get();

		if (siteDataDoc.exists) {
			const data = siteDataDoc.data();
			const contributions = data.contributions || 0;
			return contributions;
		}

		return 0;
	} catch (error) {
		console.error('Error reading contributions:', error);
		return 0;
	}
};

const readDate = async () => {
	try {
		const siteDataRef = firestore.collection('data').doc('site-data');
		const siteDataDoc = await siteDataRef.get();

		if (siteDataDoc.exists) {
			const data = siteDataDoc.data();
			const date = data.date;

			if (date) {
				const now = new Date();
				const dateJS = date.toDate(); // Convert Firestore Timestamp to JavaScript Date

				const millisecondsDiff = now - dateJS;

				// Calculate the time difference in seconds, minutes, hours, days, months, and years
				const seconds = Math.floor(millisecondsDiff / 1000);
				const minutes = Math.floor(seconds / 60);
				const hours = Math.floor(minutes / 60);
				const days = Math.floor(hours / 24);
				const months = Math.floor(days / 30);
				const years = Math.floor(months / 12);

				if (seconds < 60) {
					return `< 1 minute ago`;
				} else if (minutes < 60) {
					return `${minutes} minute(s) ago`;
				} else if (hours < 24) {
					return `${hours} hour(s) ago`;
				} else if (days < 30) {
					return `${days} day(s) ago`;
				} else if (months < 12) {
					return `${months} month(s) ago`;
				} else {
					return `${years} year(s) ago`;
				}
			} else {
				return 'Invalid date format';
			}
		}

		return null;
	} catch (error) {
		console.error('Error reading date:', error);
		return null;
	}
};


const incrementContributions = async () => {
	try {
		const siteDataRef = firestore.collection('data').doc('site-data');
		const siteDataDoc = await siteDataRef.get();

		if (siteDataDoc.exists) {
			const data = siteDataDoc.data();
			const currentDate = new Date();

			// Update contributions and date fields
			const updatedContributions = (data.contributions || 0) + 1;
			await siteDataRef.update({
				contributions: updatedContributions,
				date: currentDate
			});

			console.log('Contributions updated successfully!');
		} else {
			console.log('Site data document does not exist.');
		}
	} catch (error) {
		console.error('Error updating contributions:', error);
	}
};

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

export { updateNewPoints, readAllPoints, readContributions, readDate, incrementContributions };
