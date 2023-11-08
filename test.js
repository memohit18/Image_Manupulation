const Jimp = require('jimp');

try {
    const backgroundImagePath = 'https://e1.pxfuel.com/desktop-wallpaper/10/282/desktop-wallpaper-minimalist-bus-vector-road-afari.jpg';
    const secondImagePath = 'https://w0.peakpx.com/wallpaper/309/624/HD-wallpaper-luffytaro-luffy-portrait-thumbnail.jpg';

    // Load the background image
    Jimp.read(backgroundImagePath)
        .then(backgroundImage => {
            // Load the second image
            return Jimp.read(secondImagePath)
                .then(secondImage => {
                    // Calculate the position for the second image (left side)
                    const xPosition = 0; // Place it at the left edge
                    const yPosition = (backgroundImage.getHeight() - secondImage.getHeight()) / 2;

                    // Composite the background image on a new Jimp image
                    const mergedImage = new Jimp(backgroundImage.getWidth(), backgroundImage.getHeight());
                    mergedImage.blit(backgroundImage, 0, 0);

                    // Composite the second image on the left side
                    mergedImage.blit(secondImage, xPosition, yPosition);

                    // Load a font
                    return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
                        // Add text using the loaded font with line breaks
                        const text = 'All the thing that you are asking about is here and can be used without any issue';
                        const fontSize = 32;
                        const textX = backgroundImage.getWidth() - 500; // Adjust the X position as needed
                        const textY = yPosition + 20; // Adjust the Y position as needed

                        // Split the text into lines based on a certain character count or word count
                        const maxLineLength = 30; // Maximum characters per line
                        const lines = [];
                        let currentLine = '';
                        for (const word of text.split(' ')) {
                            if (currentLine.length + word.length <= maxLineLength) {
                                currentLine += (currentLine.length > 0 ? ' ' : '') + word;
                            } else {
                                lines.push(currentLine);
                                currentLine = word;
                            }
                        }
                        lines.push(currentLine);

                        // Print each line with appropriate Y position
                        lines.forEach((line, index) => {
                            mergedImage.print(font, textX, textY + index * fontSize, line);
                        });

                        // Save the merged image with the added text
                        mergedImage.write('merged-image.jpg');
                    });
                });
        })
        .catch(error => {
            console.error(error);
        });
} catch (error) {
    console.log('error', error);
}
