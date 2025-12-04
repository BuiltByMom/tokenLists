/* eslint-disable @typescript-eslint/no-unnecessary-condition */
'use client';

import {useEffect, useRef, useState} from 'react';

import type {ReactElement} from 'react';

import {BackgroundPattern} from '@/app/components/BackgroundPattern';

type TBackgroundPatternProps = {
	className?: string;
};

// Helper function for smooth color interpolation
const lerpColor = (color1: string, color2: string, factor: number): string => {
	// Convert hex to RGB
	const hex1 = color1.replace('#', '');
	const hex2 = color2.replace('#', '');

	// Parse hex values
	const r1 = Number.parseInt(hex1.substring(0, 2), 16);
	const g1 = Number.parseInt(hex1.substring(2, 4), 16);
	const b1 = Number.parseInt(hex1.substring(4, 6), 16);

	const r2 = Number.parseInt(hex2.substring(0, 2), 16);
	const g2 = Number.parseInt(hex2.substring(2, 4), 16);
	const b2 = Number.parseInt(hex2.substring(4, 6), 16);

	// Interpolate
	const r = Math.round(r1 + factor * (r2 - r1));
	const g = Math.round(g1 + factor * (g2 - g1));
	const b = Math.round(b1 + factor * (b2 - b1));

	// Convert back to hex
	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

export function BackgroundPatternAnimated({className = ''}: TBackgroundPatternProps): ReactElement {
	const containerRef = useRef<HTMLDivElement>(null);
	const staticCanvasRef = useRef<HTMLCanvasElement>(null);
	const dynamicCanvasRef = useRef<HTMLCanvasElement>(null);
	const [isSupported, set_isSupported] = useState(true);

	// Use refs instead of state for animation values to avoid re-renders
	const targetMousePosition = useRef({x: 0, y: 0});
	const currentMousePosition = useRef({x: 0, y: 0});
	const animationFrameRef = useRef<number>();
	const lastMouseMoveTime = useRef(0);

	// Check browser support on mount
	useEffect(() => {
		// Check if Canvas is supported
		const isCanvasSupported =
			typeof window !== 'undefined' && !!window.document && !!document.createElement('canvas').getContext;

		// Check if requestAnimationFrame is supported
		const isRAFSupported = typeof window !== 'undefined' && !!window.requestAnimationFrame;

		set_isSupported(isCanvasSupported && isRAFSupported);
	}, []);

	// Throttle mouse move events
	const handleMouseMove = useRef((e: MouseEvent) => {
		const now = Date.now();
		if (now - lastMouseMoveTime.current > 16) {
			// ~60fps
			if (containerRef.current) {
				// Get container's bounding rectangle
				const rect = containerRef.current.getBoundingClientRect();

				// Calculate mouse position relative to the container
				const relativeX = e.clientX - rect.left;
				const relativeY = e.clientY - rect.top;

				// Update target position with coordinates relative to container
				targetMousePosition.current = {
					x: relativeX,
					y: relativeY
				};

				lastMouseMoveTime.current = now;
			}
		}
	}).current;

	// Setup static background once
	useEffect(() => {
		if (!isSupported || !containerRef.current) {
			return;
		}

		const container = containerRef.current;
		const canvas = staticCanvasRef.current;
		if (!canvas) {
			return;
		}

		const ctx = canvas.getContext('2d', {alpha: false});
		if (!ctx) {
			set_isSupported(false);
			return;
		}

		const initStaticCanvas = (): void => {
			if (!container) {
				return;
			}

			// Get device pixel ratio
			const dpr = window.devicePixelRatio || 1;

			// Get CSS size
			const rect = container.getBoundingClientRect();

			// Set canvas size accounting for high DPI displays
			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;

			// Scale canvas CSS size to match container (will be rendered at higher resolution)
			canvas.style.width = `${rect.width}px`;
			canvas.style.height = `${rect.height}px`;

			// Scale all drawing operations by pixel ratio
			ctx.scale(dpr, dpr);

			// Draw base background
			ctx.fillStyle = '#ff401a';
			ctx.fillRect(0, 0, rect.width, rect.height);
		};

		// Create resize observer to track container size changes
		const resizeObserver = new ResizeObserver(() => {
			initStaticCanvas();
		});

		resizeObserver.observe(container);
		initStaticCanvas();

		return () => {
			resizeObserver.disconnect();
		};
	}, [isSupported]);

	// Handle dynamic effects with similar high DPI optimizations
	useEffect(() => {
		if (!isSupported || !containerRef.current) {
			return;
		}

		const container = containerRef.current;
		const canvas = dynamicCanvasRef.current;
		if (!canvas) {
			return;
		}

		const ctx = canvas.getContext('2d');
		if (!ctx) {
			set_isSupported(false);
			return;
		}

		// Store device pixel ratio for use in animation frame
		const dpr = window.devicePixelRatio || 1;

		// Store character positions and values
		const characters: {x: number; y: number; char: string}[] = [];

		const initDynamicCanvas = (): void => {
			if (!container) {
				return;
			}

			// Get CSS size
			const rect = container.getBoundingClientRect();

			// Set canvas size accounting for high DPI displays
			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;

			// Scale canvas CSS size to match container
			canvas.style.width = `${rect.width}px`;
			canvas.style.height = `${rect.height}px`;

			// Scale all drawing operations by pixel ratio
			ctx.scale(dpr, dpr);

			// Rest of initialization code, adjusted for dpr...
			// (Set font size, calculate grid, etc.)

			// Clear existing characters
			characters.length = 0;

			// Set font to measure character width - adjust for high DPI
			ctx.font = '16px monospace';

			// Measure character width for proper spacing
			const charWidth = ctx.measureText('M').width;
			const charHeight = 16; // Font size

			// Calculate grid based on character dimensions with precise spacing
			const cellWidth = Math.ceil(charWidth * 1.5);
			const cellHeight = Math.ceil(charHeight * 1.5);

			const rows = Math.ceil(rect.height / cellHeight);
			const cols = Math.ceil(rect.width / cellWidth);

			// Track used positions to prevent overlaps
			const usedPositions = new Set<string>();

			// Helper to check if a position is available
			const isPositionAvailable = (row: number, col: number): boolean => {
				return !usedPositions.has(`${row},${col}`);
			};

			// Helper to mark position as used
			const markPositionUsed = (row: number, col: number): void => {
				usedPositions.add(`${row},${col}`);
			};

			// Generate characters with precise spacing
			for (let i = 0; i < rows; i++) {
				for (let j = 0; j < cols; j++) {
					if (!isPositionAvailable(i, j)) {
						continue;
					}

					// Try to create "MOM" pattern horizontally (10% chance)
					if (
						Math.random() < 0.1 &&
						j + 2 < cols &&
						isPositionAvailable(i, j + 1) &&
						isPositionAvailable(i, j + 2)
					) {
						characters.push({
							x: j * cellWidth,
							y: i * cellHeight + charHeight,
							char: 'M'
						});
						characters.push({
							x: (j + 1) * cellWidth,
							y: i * cellHeight + charHeight,
							char: 'O'
						});
						characters.push({
							x: (j + 2) * cellWidth,
							y: i * cellHeight + charHeight,
							char: 'M'
						});

						markPositionUsed(i, j);
						markPositionUsed(i, j + 1);
						markPositionUsed(i, j + 2);
						j += 2; // Skip the next two positions
					} else if (
						// Try to create "MOM" pattern vertically (10% chance)
						Math.random() < 0.1 &&
						i + 2 < rows &&
						isPositionAvailable(i + 1, j) &&
						isPositionAvailable(i + 2, j)
					) {
						characters.push({
							x: j * cellWidth,
							y: i * cellHeight + charHeight,
							char: 'M'
						});
						characters.push({
							x: j * cellWidth,
							y: (i + 1) * cellHeight + charHeight,
							char: '0'
						});
						characters.push({
							x: j * cellWidth,
							y: (i + 2) * cellHeight + charHeight,
							char: 'M'
						});

						markPositionUsed(i, j);
						markPositionUsed(i + 1, j);
						markPositionUsed(i + 2, j);
					} else {
						// Add single character
						const randomValue = Math.random();
						let char;

						// Create clusters of Ms in specific regions
						if ((i < rows / 4 && j < cols / 4) || (j > cols * 0.7 && i > rows * 0.3 && i < rows * 0.8)) {
							// In cluster regions: 60% M, 40% O
							char = randomValue < 0.6 ? 'M' : '0';
						} else {
							// In other regions: 20% M, 80% O
							char = randomValue < 0.2 ? 'M' : '0';
						}

						characters.push({
							x: j * cellWidth,
							y: i * cellHeight + charHeight,
							char
						});

						markPositionUsed(i, j);
					}
				}
			}
		};

		const drawDynamicEffects = (): void => {
			if (!ctx || !canvas) {
				return;
			}

			// Before each frame, reset the transform and scale again
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.scale(dpr, dpr);

			// Normal animation logic...
			// Remember to use rect.width/height instead of canvas.width/height
			// for any drawing calculations

			// Update mouse position with smooth interpolation using refs only
			const easing = 0.1; // Lower = smoother but slower
			currentMousePosition.current = {
				x:
					currentMousePosition.current.x +
					(targetMousePosition.current.x - currentMousePosition.current.x) * easing,
				y:
					currentMousePosition.current.y +
					(targetMousePosition.current.y - currentMousePosition.current.y) * easing
			};

			const {x, y} = currentMousePosition.current;

			// Draw yellow glow with improved gradient
			const radius = 300; // Larger radius for smoother effect
			const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

			// More color stops for smoother gradient
			gradient.addColorStop(0, 'rgba(255, 230, 150, 0.25)');
			gradient.addColorStop(0.3, 'rgba(255, 230, 150, 0.15)');
			gradient.addColorStop(0.7, 'rgba(255, 230, 150, 0.05)');
			gradient.addColorStop(1, 'rgba(255, 230, 150, 0)');

			ctx.fillStyle = gradient;
			ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);

			// Draw characters with smooth color transitions
			ctx.font = '16px monospace';
			ctx.textBaseline = 'top'; // Ensure consistent vertical alignment

			// Define colors for interpolation
			const farColor = '#ff6b4d'; // Orange
			const nearColor = '#ffcc66'; // Yellow

			characters.forEach(({x: charX, y: charY, char}) => {
				const dx = charX - x;
				const dy = charY - y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < radius) {
					// Smooth interpolation factor with cubic easing
					const t = 1 - distance / radius;
					const easedT = t * t * (3 - 2 * t); // Smooth step function

					// Interpolate color smoothly
					ctx.fillStyle = lerpColor(farColor, nearColor, easedT);

					// Smooth opacity transition
					ctx.globalAlpha = Math.min(1, 0.3 + easedT * 0.7);
				} else {
					ctx.fillStyle = farColor;
					ctx.globalAlpha = 0.3;
				}

				ctx.fillText(char, charX, charY);
			});

			animationFrameRef.current = requestAnimationFrame(drawDynamicEffects);
		};

		// Set initial mouse position to center of container
		targetMousePosition.current = {
			x: container.clientWidth / 2,
			y: container.clientHeight / 2
		};
		currentMousePosition.current = {...targetMousePosition.current};

		// Change back to window listener to track mouse everywhere
		const initMouseListeners = (): void => {
			window.addEventListener('mousemove', handleMouseMove);
		};

		// Initial setup
		initDynamicCanvas();

		// Create resize observer to track container size changes
		const resizeObserver = new ResizeObserver(() => {
			initDynamicCanvas();
		});

		resizeObserver.observe(container);
		initMouseListeners();

		// Start animation
		animationFrameRef.current = requestAnimationFrame(drawDynamicEffects);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('mousemove', handleMouseMove);
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [handleMouseMove, isSupported]);

	// If not supported, render fallback
	if (!isSupported) {
		return <BackgroundPattern />;
	}

	return (
		<div
			ref={containerRef}
			className={`absolute inset-0 z-0 ${className}`}>
			{isSupported ? (
				<>
					<canvas
						ref={staticCanvasRef}
						className={'absolute inset-0 size-full'}
					/>
					<canvas
						ref={dynamicCanvasRef}
						className={'absolute inset-0 size-full'}
					/>
				</>
			) : (
				<BackgroundPattern />
			)}
		</div>
	);
}
