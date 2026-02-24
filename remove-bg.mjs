import Jimp from 'jimp';
import fs from 'fs';
import path from 'path';

const images = ['land.png'];

async function processImages() {
    for (const file of images) {
        const filePath = path.join('public', 'images', file);
        try {
            const img = await Jimp.read(filePath);
            const width = img.bitmap.width;
            const height = img.bitmap.height;

            // get top-left corner color assuming it's the solid background color
            const bgHex = img.getPixelColor(1, 1);
            const bgRgb = Jimp.intToRGBA(bgHex);

            // Simple flood-fill or exact match removal
            // If we only remove the exact gray background, that's better.
            const threshold = 15;
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    const hex = img.getPixelColor(x, y);
                    const rgb = Jimp.intToRGBA(hex);
                    const diff = Math.abs(rgb.r - bgRgb.r) + Math.abs(rgb.g - bgRgb.g) + Math.abs(rgb.b - bgRgb.b);

                    if (diff <= threshold * 3) { // Close to background color
                        img.setPixelColor(Jimp.rgbaToInt(rgb.r, rgb.g, rgb.b, 0), x, y);
                    }
                }
            }

            await img.writeAsync(filePath.replace('.png', '_transparent.png'));
            fs.copyFileSync(filePath.replace('.png', '_transparent.png'), filePath);
            console.log('Processed:', file);
        } catch (e) {
            console.error('Error processing', file, e.message);
        }
    }
}

processImages();
