document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');

    // Array of image filenames
    const images = [
        'chlapy-debata',
        'fotkaSpolu',
        'fotkaSpolu2',
        'fotkaSpolu3',
        'Lucka-Klavir',
        'MRGitara',
        'sviecky',
        'zalm-Rajnakovci'
    ];

    let currentIndex = 0;

    // Load thumbnails
    images.forEach((image, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = `/media/IMGs/gallery/thumbnails/${image}Thumb.jpg`;
        imgElement.alt = image;
        imgElement.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = `/media/IMGs/gallery/${image}.jpg`;
            currentIndex = index;
        });
        imgElement.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
        galleryContainer.appendChild(imgElement);
    });

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightboxImg.src = ''; // Clear the image
    });

    // Close lightbox when clicking outside the image and arrow buttons
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg && e.target !== leftArrow && e.target !== rightArrow) {
            lightbox.style.display = 'none';
            lightboxImg.src = ''; // Clear the image
        }
    });

    // Prevent image dragging
    lightboxImg.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    // Function to change image with animation
    function changeImage(index) {
        if (index === -1){
            // If the index is -1, set it to an empty image for no flash
            lightboxImg.style.opacity = 0;
            setTimeout(() => {
                lightboxImg.src = '';
                lightboxImg.style.opacity = 1;
            }, 500);
        }
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = `/media/IMGs/gallery/${images[index]}.jpg`;
            lightboxImg.style.opacity = 1;
        }, 500);
    }

    // Navigate to the previous image
    leftArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        changeImage(-1)
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        changeImage(currentIndex);
    });

    // Navigate to the next image
    rightArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        changeImage(-1)
        currentIndex = (currentIndex + 1) % images.length;
        changeImage(currentIndex);
    });
});