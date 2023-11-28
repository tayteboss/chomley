import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

type Point = {
	x: number;
	y: number;
	id: string;
};

type Props = {
	drawingIsActive: boolean;
	handleResetPoints: number;
	points: Point[];
	setPoints: (points: Point[]) => void;
};

const Canvas = styled.canvas<{ $isActive: boolean }>`
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	pointer-events: ${(props) => props.$isActive ? 'auto' : 'none'};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const DrawingFeature = (props: Props) => {
	const {
	  drawingIsActive,
	  handleResetPoints,
	  points,
	  setPoints
	} = props;

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [previewPoint, setPreviewPoint] = useState<Point | null>(null);

	useEffect(() => {
		if (handleResetPoints >= 1) {
			setPoints([]);
		}
	}, [handleResetPoints]);

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

			setPoints([...points, { id, x, y }]);
		};

	  const handleMouseMove = (e: MouseEvent) => {
		if (drawingIsActive) {
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			setPreviewPoint({ id: 'preview', x, y }); // Store the preview point
		}
	};

	const drawLines = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw existing lines if there are at least 2 points
		if (points.length >= 2) {
			for (let i = 0; i < points.length - 1; i++) {
				ctx.beginPath();
				ctx.moveTo(points[i].x, points[i].y);
				ctx.lineTo(points[i + 1].x, points[i + 1].y);
				ctx.stroke();
			}
		}
  
		// Draw preview line only if there are points and drawing is active
		if (previewPoint && points.length > 0 && drawingIsActive) {
			ctx.beginPath();
			ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
			ctx.lineTo(previewPoint.x, previewPoint.y);
			ctx.stroke();
		} else {
			setPreviewPoint(null); // Remove the preview line if drawing is not active
		}
	};

	drawLines();

	canvas.addEventListener('mousedown', handleMouseDown);
	canvas.addEventListener('mousemove', handleMouseMove); // Listen for mouse movement

	return () => {
		canvas.removeEventListener('mousedown', handleMouseDown);
		canvas.removeEventListener('mousemove', handleMouseMove); // Clean up event listener
	};
}, [points, drawingIsActive, previewPoint]);
  
	return (
	  <Canvas $isActive={drawingIsActive} ref={canvasRef} />
	);
  };
  
  export default DrawingFeature;