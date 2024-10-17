
// Stockage des fichiers
let uploadedFiles = [];

// Gestion du drag & drop
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const successMessage = document.getElementById('successMessage');
const filesList = document.getElementById('filesList');

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    const file = files[0];
    if (file) {
        // Simuler un téléversement
        progressBar.style.display = 'block';
        progress.style.width = '0%';

        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                successMessage.style.display = 'block';
                setTimeout(() => {
                    progressBar.style.display = 'none';
                    successMessage.style.display = 'none';
                }, 3000);
                
                // Ajouter le fichier à la liste
                addFileToList(file);
            } else {
                width += 2;
                progress.style.width = width + '%';
            }
        }, 50);
    }
}

function addFileToList(file) {
    const fileId = Date.now(); // Identifiant unique pour le fichier
    const fileSize = formatFileSize(file.size);
    const currentDate = new Date().toLocaleDateString('fr-FR');

    const fileData = {
        id: fileId,
        name: file.name,
        size: fileSize,
        date: currentDate,
        file: file // Garder une référence au fichier pour le téléchargement
    };

    uploadedFiles.push(fileData);

    const tr = document.createElement('tr');
    tr.id = `file-${fileId}`;
    tr.innerHTML = `
        <td>${file.name}</td>
        <td>${currentDate}</td>
        <td>${fileSize}</td>
        <td>
            <div class="action-buttons">
                <button class="btn" onclick="downloadFile(${fileId})">
                    Télécharger
                </button>
                <button class="btn btn-danger" onclick="deleteFile(${fileId})">
                    Supprimer
                </button>
            </div>
        </td>
    `;

    filesList.appendChild(tr);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function downloadFile(fileId) {
    const fileData = uploadedFiles.find(f => f.id === fileId);
    if (fileData) {
        // Créer un URL pour le fichier et déclencher le téléchargement
        const url = URL.createObjectURL(fileData.file);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileData.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

function deleteFile(fileId) {
    if (confirm('Voulez-vous vraiment supprimer ce fichier ?')) {
        // Supprimer de la liste des fichiers
        uploadedFiles = uploadedFiles.filter(f => f.id !== fileId);
        
        // Supprimer l'élément du DOM
        const element = document.getElementById(`file-${fileId}`);
        if (element) {
            element.remove();
        }
    }
}