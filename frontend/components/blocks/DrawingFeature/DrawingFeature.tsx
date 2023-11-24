import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { incrementContributions, updateNewPoints } from '../../../firebase/firebasePoints';

type Point = {
	x: number;
	y: number;
	id: string;
};

type Props = {
	initPoints: Point[];
	drawingIsActive: boolean;
	handleResetPoints: number;
	handleSavePoints: number;
};

const Canvas = styled.canvas<{ $isActive: boolean }>`
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	pointer-events: ${(props) => props.$isActive ? 'auto' : 'none'};
`;

const DrawingFeature = (props: Props) => {
	const {
		initPoints,
		drawingIsActive,
		handleResetPoints,
		handleSavePoints
	} = props;

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [points, setPoints] = useState<Point[]>(initPoints ? initPoints : []);

	useEffect(() => {
		setPoints(initPoints);
	}, [initPoints]);

	useEffect(() => {
		if (handleResetPoints >= 1) {
			setPoints([]);
		}
	}, [handleResetPoints]);

	// useEffect(() => {
	// 	if (handleSavePoints >= 1) {
	// 		updateNewPoints(points);
	// 		incrementContributions();
	// 	}
	// }, [handleSavePoints]);

	useEffect(() => {
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext('2d')!;

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		ctx.strokeStyle = '#FAFF00';
		ctx.lineWidth = 25;
		ctx.lineJoin = 'miter';
		ctx.lineCap = 'butt';

		const handleMouseDown = (e: MouseEvent) => {
			

			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

			setPoints([...points, { id, x, y, }]);
		};

		const drawLines = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let i = 0; i < points.length - 1; i++) {
				ctx.beginPath();
				ctx.moveTo(points[i].x, points[i].y);
				ctx.lineTo(points[i + 1].x, points[i + 1].y);
				ctx.stroke();
			}
		};

		drawLines();

		canvas.addEventListener('mousedown', handleMouseDown);

		return () => {
			canvas.removeEventListener('mousedown', handleMouseDown);
		};
	}, [points]);

	return (
		<Canvas $isActive={drawingIsActive} ref={canvasRef} />
	);
};

export default DrawingFeature;
