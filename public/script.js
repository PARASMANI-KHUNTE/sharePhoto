const messageBox = document.getElementById('messageBox')
messageBox.innerText = ""
document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const spinner = document.getElementById('loadingSpinner');

    if (!file) {
        messageBox.innerText = 'Please select a file to upload.'
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
            messageBox.className = "text-green-400  text-bold "
            messageBox.innerText = 'File uploaded successfully.'
        } else {
            messageBox.className = "text-red-400  text-bold "
            messageBox.innerText = 'Error uploading file.'
        }
    } catch (error) {
        console.error('Error:', error);
        messageBox.className = "text-red-400  text-bold "
        messageBox.innerText = 'Error uploading file.'
    } finally {
        // Hide the spinner
        spinner.classList.add('hidden');
    }
});




//upload file 
document.getElementById('uploadBtn').addEventListener('click', () => {
    document.getElementById('uploadModal').classList.remove('hidden');
});

document.getElementById('cancelUpload').addEventListener('click', () => {
    document.getElementById('fileInput').value = '';
    document.getElementById('filePreview').innerHTML = '';
    document.getElementById('uploadModal').classList.add('hidden');
});

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('uploadModal').classList.add('hidden');
});

document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const preview = document.getElementById('filePreview');
    preview.innerHTML = '';

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'w-full h-auto';
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});



//Upload form code
document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const spinner = document.getElementById('loadingSpinner');

    if (!file) {
        messageBox.className = "text-black  text-bold "
        messageBox.innerText = 'Please select a file to upload.'
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
            messageBox.className = "text-green-400  text-bold "
            messageBox.innerText ='File uploaded successfully.'
            document.getElementById('uploadModal').classList.add('hidden');
            fetchFiles();
        } else {
            messageBox.className = "text-red-400  text-bold "
            messageBox.innerText ='Error uploading file.'
        }
    } catch (error) {
        console.error('Error:', error);
        messageBox.className = "text-red-400  text-bold "
        messageBox.innerText ='Error uploading file.'
    } finally {
        // Hide the spinner
        spinner.classList.add('hidden');
    }
});


window.addEventListener('load', fetchFiles);



//File Fetching for display purpose
async function fetchFiles() {
    try {
        const response = await fetch('/files');
        const files = await response.json();
        const homeGallery = document.getElementById('homeGallery');
        homeGallery.innerHTML = ''; // Clear the home gallery before appending new images

        files.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.className = 'p-2 border rounded';
            fileElement.id = "ImgEle";
            const img = document.createElement('img');
            img.src = file.url;
            img.alt = file.filename;
            img.className = 'w-full h-64 object-cover';
            fileElement.appendChild(img);

            homeGallery.appendChild(fileElement);
        });
    } catch (error) {
        console.error('Error fetching files:', error);
    }
}