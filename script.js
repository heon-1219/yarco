document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.image-container');
    const containerWidth = imageContainer.offsetWidth;
    const containerHeight = imageContainer.offsetHeight;
    const imageSize = 250; // Match the CSS size
    let speedMultiplier = 6; // Increase for faster bouncing

    const imageSources = [
        'images/yarcollick.jpg',
        'images/yarcowondering.jpg',
        'images/yarcoandme.png'
    ];

    let images = []; // Array to hold image objects

    // Create one image element for each source
    imageSources.forEach((src, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = src;
        imgElement.classList.add('moving-image');
        imgElement.style.width = `${imageSize}px`;
        imgElement.style.height = `${imageSize}px`;

        // Initialize position and velocity
        let position = {
            x: Math.random() * (containerWidth - imageSize),
            y: Math.random() * (containerHeight - imageSize)
        };
        let velocity = {
            x: (Math.random() - 0.5) * 2 * speedMultiplier, // Random horizontal velocity (-speedMultiplier to +speedMultiplier)
            y: (Math.random() - 0.5) * 2 * speedMultiplier  // Random vertical velocity
        };

        // Ensure images don't start overlapping (basic placement)
        // A more robust solution might be needed for many images
        let attempts = 0;
        while (attempts < 100 && images.some(existing => checkOverlap(position, existing.position, imageSize))) {
            position.x = Math.random() * (containerWidth - imageSize);
            position.y = Math.random() * (containerHeight - imageSize);
            attempts++;
        }

        imgElement.style.left = `${position.x}px`;
        imgElement.style.top = `${position.y}px`;

        imageContainer.appendChild(imgElement);

        images.push({ element: imgElement, position, velocity });
    });

    function checkOverlap(pos1, pos2, size) {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < size; // Simple overlap check based on distance between centers
    }

    function updatePositions() {
        images.forEach((img, i) => {
            // Update position
            img.position.x += img.velocity.x;
            img.position.y += img.velocity.y;

            // Wall collision detection
            if (img.position.x <= 0 || img.position.x >= containerWidth - imageSize) {
                img.velocity.x *= -1; // Reverse horizontal velocity
                img.position.x = Math.max(0, Math.min(img.position.x, containerWidth - imageSize)); // Prevent sticking
            }
            if (img.position.y <= 0 || img.position.y >= containerHeight - imageSize) {
                img.velocity.y *= -1; // Reverse vertical velocity
                img.position.y = Math.max(0, Math.min(img.position.y, containerHeight - imageSize)); // Prevent sticking
            }

             // Collision detection with other images
             for (let j = i + 1; j < images.length; j++) {
                const otherImg = images[j];
                if (checkOverlap(img.position, otherImg.position, imageSize)) {
                    // Simple collision response: swap velocities
                    const tempVx = img.velocity.x;
                    const tempVy = img.velocity.y;
                    img.velocity.x = otherImg.velocity.x;
                    img.velocity.y = otherImg.velocity.y;
                    otherImg.velocity.x = tempVx;
                    otherImg.velocity.y = tempVy;

                    // Optional: slightly push images apart to prevent sticking after collision
                    const dx = img.position.x - otherImg.position.x;
                    const dy = img.position.y - otherImg.position.y;
                    const overlapDistance = imageSize - Math.sqrt(dx*dx + dy*dy);
                    if (overlapDistance > 0) {
                        const angle = Math.atan2(dy, dx);
                        const moveX = (overlapDistance / 2) * Math.cos(angle);
                        const moveY = (overlapDistance / 2) * Math.sin(angle);
                        img.position.x += moveX;
                        img.position.y += moveY;
                        otherImg.position.x -= moveX;
                        otherImg.position.y -= moveY;
                    }
                }
            }

            // Apply updated position to the element
            img.element.style.left = `${img.position.x}px`;
            img.element.style.top = `${img.position.y}px`;
        });

        requestAnimationFrame(updatePositions); // Loop the animation
    }

    requestAnimationFrame(updatePositions); // Start the animation loop
}); 