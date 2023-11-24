import { compareDesc, format } from 'date-fns';

// Add the following line to fix the TypeScript error
import 'date-fns';


const orderIndex = (cards: any[]) => {
    const years: number[] = [];
    const cardsByYear: any[][] = [];

    cards.forEach((card: any) => {
        const date = new Date(card.date);
        const year = date.getFullYear();

        if (!years.includes(year)) {
            years.push(year);
            cardsByYear.push([]);
        }

        const index = years.indexOf(year);
        card.indexYear = `${(cardsByYear[index].length + 1).toString().padStart(2, '0')}-${year.toString().slice(-2)}`;
        cardsByYear[index].push(card);

        // also make a new variable called formattedDate that is formated like 05.12.21 (dd.mm.yy)
        card.formattedDate = format(date, 'dd.MM.yy');
    });

    // Sort years in descending order
    years.sort((a: number, b: number) => b - a);

    // Sort cards within each year array by date
    cardsByYear.forEach((yearArray: any[]) => {
        yearArray.sort((a: any, b: any) => compareDesc(new Date(a.date), new Date(b.date)));
    });

    // Flatten the array while maintaining the correct order
    const flattenedArray: any[] = cardsByYear.flat();

    return flattenedArray;
};

export default orderIndex;
