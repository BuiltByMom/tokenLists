'use client';

import type {ReactElement} from 'react';

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

// Generate a base64 encoded SVG pattern that can be used as a background image
// This is generated once on the server and then reused
const generatePatternSVG = (): string => {
	// SVG dimensions - make it large enough to cover most screens without repeating
	const width = 1200;
	const height = 800;

	// Character grid settings
	const charWidth = 20;
	const charHeight = 20;
	const cols = Math.ceil(width / charWidth);
	const rows = Math.ceil(height / charHeight);

	// Define highlight spots
	const highlights = [
		{x: width * 0.3, y: height * 0.1, radius: width * 0.2},
		{x: width * 0.75, y: height * 0.35, radius: width * 0.2},
		{x: width * 0.65, y: height * 0.8, radius: width * 0.12}
	];

	// Generate SVG content
	let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;

	// Background rectangle
	svgContent += `<rect width="${width}" height="${height}" fill="#ff401a" />`;

	// Track used positions
	const usedPositions = new Set<string>();
	const isPositionAvailable = (row: number, col: number): boolean => {
		return !usedPositions.has(`${row},${col}`);
	};
	const markPositionUsed = (row: number, col: number): void => {
		usedPositions.add(`${row},${col}`);
	};

	// Helper to check if a position is in a highlight zone
	const getHighlightIntensity = (x: number, y: number): number => {
		let maxIntensity = 0;

		for (const spot of highlights) {
			const dx = x - spot.x;
			const dy = y - spot.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < spot.radius) {
				const distanceRatio = distance / spot.radius;
				const intensity = Math.pow(1 - distanceRatio, 2);

				if (intensity > maxIntensity) {
					maxIntensity = intensity;
				}
			}
		}

		return maxIntensity;
	};

	// Helper to get color based on highlight intensity
	const getColor = (intensity: number): string => {
		if (intensity > 0) {
			// Interpolate between orange and yellow
			const baseColor = '#ff6b4d';
			const highlightColor = '#ffcc66';
			return lerpColor(baseColor, highlightColor, intensity);
		}
		return '#ff6b4d';
	};

	// Helper to get opacity based on highlight intensity
	const getOpacity = (intensity: number): number => {
		return intensity > 0 ? Math.min(1, 0.4 + intensity * 0.6) : 0.3;
	};

	// Generate characters with MOM patterns
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (!isPositionAvailable(i, j)) {
				continue;
			}

			const x = j * charWidth;
			const y = i * charHeight;

			// Try to create "MOM" pattern horizontally (15% chance)
			if (
				Math.random() < 0.15 &&
				j + 2 < cols &&
				isPositionAvailable(i, j + 1) &&
				isPositionAvailable(i, j + 2)
			) {
				// Add horizontal MOM pattern
				const chars = ['M', '0', 'M'];
				for (let k = 0; k < 3; k++) {
					const charX = (j + k) * charWidth;
					const intensity = getHighlightIntensity(charX, y);
					const color = getColor(intensity);
					const opacity = getOpacity(intensity);

					svgContent += `<text x="${charX}" y="${y + charHeight}" font-family="monospace" font-size="20px" letter-spacing="1px" fill="${color}" opacity="${opacity}">${chars[k]}</text>`;
					markPositionUsed(i, j + k);
				}
				j += 2; // Skip the next two positions
			} else if (
				Math.random() < 0.15 &&
				i + 2 < rows &&
				isPositionAvailable(i + 1, j) &&
				isPositionAvailable(i + 2, j)
			) {
				// Add vertical MOM pattern
				const chars = ['M', '0', 'M'];
				for (let k = 0; k < 3; k++) {
					const charY = (i + k) * charHeight;
					const intensity = getHighlightIntensity(x, charY);
					const color = getColor(intensity);
					const opacity = getOpacity(intensity);

					svgContent += `<text x="${x}" y="${charY + charHeight}" font-family="monospace" font-size="20px" letter-spacing="1px" fill="${color}" opacity="${opacity}">${chars[k]}</text>`;
					markPositionUsed(i + k, j);
				}
			} else {
				// Add single character
				const char = Math.random() < 0.3 ? 'M' : '0';
				const intensity = getHighlightIntensity(x, y);
				const color = getColor(intensity);
				const opacity = getOpacity(intensity);

				svgContent += `<text x="${x}" y="${y + charHeight}" font-family="monospace" font-size="20px" letter-spacing="1px" fill="${color}" opacity="${opacity}">${char}</text>`;
				markPositionUsed(i, j);
			}
		}
	}

	// Close SVG
	svgContent += '</svg>';

	// Convert to base64
	return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
};

// Generate the pattern once on the server
const PATTERN_SVG_BASE64 = generatePatternSVG();

// Client component that uses the pre-generated pattern
export function BackgroundPattern({className = ''}: TBackgroundPatternProps): ReactElement {
	return (
		<div
			className={`absolute inset-0 ${className}`}
			style={{
				backgroundImage: `url("${PATTERN_SVG_BASE64}")`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat'
			}}
		/>
	);
}
