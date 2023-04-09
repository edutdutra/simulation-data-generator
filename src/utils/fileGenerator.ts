export function generateFile(fileData: string[], fileName: string) {
    const blob = new Blob(fileData, {type: 'application/json'});

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.download = fileName;
    link.href = url;

    link.click();
}