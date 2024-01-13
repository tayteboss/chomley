import { compareDesc, format } from 'date-fns';

// Add the following line to fix the TypeScript error
import 'date-fns';

const orderIndex = (cards: any[]) => {
	// flatten cards array first
	cards = [].concat.apply([], cards);

	let sortedCards = cards.sort((a, b) => {
		return compareDesc(new Date(a.date), new Date(b.date));
	});

	return sortedCards;
};

export default orderIndex;
