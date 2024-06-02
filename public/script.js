document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const spinner = document.getElementById('loadingSpinner');

    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Show the spinner
    spinner.classList.remove('hidden');

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('File uploaded successfully.');
        } else {
            alert('Error uploading file.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error uploading file.');
    } finally {
        // Hide the spinner
        spinner.classList.add('hidden');
    }
});

document.getElementById('fetchFilesButton').addEventListener('click', fetchFiles);

async function fetchFiles() {
    try {
        const response = await fetch('/files');
        const files = await response.json();
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = ''; // Clear the gallery before appending new images

        files.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.className = 'p-2 border rounded';

            console.log('Processing file:', file);

            const img = document.createElement('img');
            img.src = file.url;
            img.alt = file.filename;
            img.className = 'w-full h-auto';
            fileElement.appendChild(img);

            gallery.appendChild(fileElement);
        });
    } catch (error) {
        console.error('Error fetching files:', error);
    }
}
