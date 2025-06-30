import { useState, useEffect } from 'react';
import { uploadToS3 } from '../utils/s3Uploader';
import { validateImage } from '../utils/validateImage';

export default function ProductEdit({ product, onUpdate, onCancel }) {
    const [form, setForm] = useState({ ...product, image: null });
    const [preview, setPreview] = useState(product.imageUrl || null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = async () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = 'El nombre del producto es obligatorio';
        const parsedPrice = parseFloat(form.price);
        if (!form.price || isNaN(parsedPrice) || parsedPrice <= 0) {
            newErrors.price = 'El precio debe ser un número mayor a 0';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim()) {
            newErrors.email = 'El correo es obligatorio';
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = 'El formato del correo no es válido';
        }
        if (!form.date) newErrors.date = 'La fecha de ingreso es obligatoria';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (await validate()) {
            let imageUrl = form.imageUrl;
            if (form.image) {
                try {
                    imageUrl = await uploadToS3(form.image);
                } catch (err) {
                    console.error('Error al subir a S3:', err);
                    setErrors((prev) => ({
                        ...prev,
                        image: 'No se pudo subir la imagen, se guardará la anterior'
                    }));
                }
            }

            const { name, price, email, date } = form;
            onUpdate({ ...form, name, price, email, date, imageUrl });
        }

        setIsLoading(false);
    };

    const handleChange = async (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            const file = files[0];
            if (!file) return;

            try {
                await validateImage(file, setPreview, setForm);
                setErrors((prev) => ({ ...prev, image: null }));
            } catch (err) {
                setErrors((prev) => ({ ...prev, image: err }));
                setPreview(null);
                setForm((prev) => ({ ...prev, image: null }));
            }
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    return (
        <div className="min-h-screen bg-orange-100 flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Editar producto</h2>

                {isLoading && (
                    <div className="mb-4 text-center text-blue-600 font-semibold animate-pulse">
                        Actualizando producto...
                    </div>
                )}

                <label className="block mb-2 font-semibold">Nombre del producto <span className="text-red-500">*</span></label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-blue-500 rounded-md p-2 mb-2"
                />
                {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

                <label className="block mb-2 font-semibold">Precio del producto <span className="text-red-500">*</span></label>
                <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full border border-blue-500 rounded-md p-2 mb-2"
                />
                {errors.price && <p className="text-red-500 text-sm mb-2">{errors.price}</p>}

                <label className="block mb-2 font-semibold">Correo del proveedor <span className="text-red-500">*</span></label>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-blue-500 rounded-md p-2 mb-2"
                />
                {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

                <label className="block mb-2 font-semibold">Fecha de ingreso <span className="text-red-500">*</span></label>
                <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border border-blue-500 rounded-md p-2 mb-4"
                />
                {errors.date && <p className="text-red-500 text-sm mb-2">{errors.date}</p>}

                <div className="relative w-full mb-4">
                    <label
                        htmlFor="image"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Cambiar imagen
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                    />
                </div>
                {errors.image && <p className="text-red-500 text-sm mb-2">{errors.image}</p>}

                {preview && (
                    <img
                        src={preview}
                        alt="preview"
                        className="w-32 h-32 object-cover rounded mb-4 mx-auto"
                    />
                )}

                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700">
                    Guardar cambios
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full bg-gray-400 text-white font-bold py-2 rounded-md mt-2 hover:bg-gray-500"
                    >
                        Volver al listado
                    </button>
                )}
            </form>
        </div>
    );
}
