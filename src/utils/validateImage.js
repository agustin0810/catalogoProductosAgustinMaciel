export const validateImage = (file, setPreview, setForm) => {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) return reject('Debe ser una imagen');
        if (file.size > 5 * 1024 * 1024) return reject('La imagen no debe pesar más de 5MB');

        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.onload = () => {
                const size = Math.min(img.width, img.height);
                const offsetX = (img.width - size) / 2;
                const offsetY = (img.height - size) / 2;

                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

                canvas.toBlob((blob) => {
                    if (!blob) return reject('Error al recortar la imagen');

                    const croppedFile = new File([blob], file.name, { type: file.type });

                    // Actualizar el estado
                    setPreview(canvas.toDataURL(file.type));
                    setForm((prev) => ({ ...prev, image: croppedFile }));

                    resolve();
                }, file.type);
            };
            img.src = e.target.result;
        };

        reader.onerror = () => reject('Error cargando la imagen');
        reader.readAsDataURL(file);
    });
};
