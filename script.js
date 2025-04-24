document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.image-container');
    const numberOfImages = 10; // Adjust the number of images you want
    const containerWidth = imageContainer.offsetWidth;
    const containerHeight = imageContainer.offsetHeight; // Use for animation bounds if needed

    // Array of placeholder image sources (or use actual URLs later)
    // For now, we'll just create divs with background colors
    const imageSources = [
        // Add paths to your images here, e.g., 'images/image1.png'
        'images/yarcollick.jpg',
        'images/yarcowondering.jpg',
        'images/yarcoandme.png'
    ];

    for (let i = 0; i < numberOfImages; i++) {
        // const imgElement = document.createElement('div'); // Use div for placeholders
        // imgElement.classList.add('moving-image');

        // // Set random horizontal position
        // const randomX = Math.random() * (containerWidth - 50); // Subtract image width
        // imgElement.style.left = `${randomX}px`;

        // // Add random delay to the animation start time
        // const randomDelay = Math.random() * 5; // Delay up to 5 seconds
        // imgElement.style.animationDelay = `${randomDelay}s`;

        // // Optional: Assign background colors for placeholders
        // const colors = ['lightblue', 'lightcoral', 'lightgreen', 'lightpink', 'lightsalmon'];
        // imgElement.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];


        // If you have image sources:
        const imgElement = document.createElement('img');
        imgElement.classList.add('moving-image');
        imgElement.src = imageSources[i % imageSources.length]; // Cycle through images if needed
        const randomX = Math.random() * (containerWidth - 50); // Subtract image width
        imgElement.style.left = `${randomX}px`;
        const randomDelay = Math.random() * 5;
        imgElement.style.animationDelay = `${randomDelay}s`;


        imageContainer.appendChild(imgElement);
    }
}); 