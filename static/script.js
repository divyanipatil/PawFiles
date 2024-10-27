document.addEventListener('DOMContentLoaded', function() {
    const radioButtons = document.querySelectorAll('input[name="animal"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', showAnimalImage);
    });
});

function showAnimalImage() {
    const selectedAnimal = document.querySelector('input[name="animal"]:checked').value;
    const imageElement = document.getElementById('animal-image');

    imageElement.src = `/static/images/${selectedAnimal}.jpg`;
    imageElement.style.display = 'block';
}

async function uploadFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file first');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        document.getElementById('file-info').innerHTML = `
            <p>Filename: ${data.filename}</p>
            <p>Size: ${formatFileSize(data.size)}</p>
            <p>Type: ${data.content_type}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        alert('Error uploading file');
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
