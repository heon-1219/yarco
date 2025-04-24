document.addEventListener('DOMContentLoaded', () => {
    const passwordSection = document.getElementById('password-section');
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submit-password');
    const errorMessage = document.getElementById('error-message');
    const mainContent = document.getElementById('main-content');
    const imageContainer = document.querySelector('.image-container');

    const correctPasswordYarco = 'iluvyarco'; // The password for main site
    const correctPasswordNotes = 'iluvyavid'; // The password for notes page

    submitButton.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', function(event) {
        // Allow submission on Enter key press
        if (event.key === 'Enter') {
            checkPassword();
        }
    });

    function checkPassword() {
        const enteredPassword = passwordInput.value;

        if (enteredPassword === correctPasswordYarco) {
            // Hide password section, show main content
            passwordSection.style.display = 'none';
            mainContent.style.display = 'block';
            // Initialize the bouncing images animation ONLY after password is correct
            initializeAnimation();
        } else if (enteredPassword === correctPasswordNotes) {
            // Redirect to the notes page
            window.location.href = 'notes.html';
        } else {
            // Show error message briefly
            errorMessage.style.display = 'inline';
            passwordInput.value = ''; // Clear the input
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 2000); // Hide error after 2 seconds
        }
    }

    // --- Animation Logic (moved into a function) ---
    function initializeAnimation() {
        const containerWidth = imageContainer.offsetWidth;
        const containerHeight = imageContainer.offsetHeight;
        const imageSize = 125; // Match the CSS size
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
                x: (Math.random() - 0.5) * 2 * speedMultiplier,
                y: (Math.random() - 0.5) * 2 * speedMultiplier
            };

            // Ensure images don't start overlapping
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
            return distance < size;
        }

        function updatePositions() {
            images.forEach((img, i) => {
                img.position.x += img.velocity.x;
                img.position.y += img.velocity.y;

                if (img.position.x <= 0 || img.position.x >= containerWidth - imageSize) {
                    img.velocity.x *= -1;
                    img.position.x = Math.max(0, Math.min(img.position.x, containerWidth - imageSize));
                }
                if (img.position.y <= 0 || img.position.y >= containerHeight - imageSize) {
                    img.velocity.y *= -1;
                    img.position.y = Math.max(0, Math.min(img.position.y, containerHeight - imageSize));
                }

                for (let j = i + 1; j < images.length; j++) {
                    const otherImg = images[j];
                    if (checkOverlap(img.position, otherImg.position, imageSize)) {
                        const tempVx = img.velocity.x;
                        const tempVy = img.velocity.y;
                        img.velocity.x = otherImg.velocity.x;
                        img.velocity.y = otherImg.velocity.y;
                        otherImg.velocity.x = tempVx;
                        otherImg.velocity.y = tempVy;

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

                img.element.style.left = `${img.position.x}px`;
                img.element.style.top = `${img.position.y}px`;
            });

            requestAnimationFrame(updatePositions);
        }

        requestAnimationFrame(updatePositions);
    }
    // --- End of Animation Logic ---
}); 