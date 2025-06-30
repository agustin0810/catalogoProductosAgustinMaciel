export default function ProductList({ products, onEdit, onDelete, onAddNew }) {
    return (
        <div className="min-h-screen bg-orange-100 p-4">
            <div className="flex flex-col items-center mb-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Listado de productos</h2>
                <button
                    onClick={onAddNew}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                    + Agregar producto
                </button>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-4 flex flex-col">
                        {product.imageUrl && (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                        )}
                        <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                        <p className="text-gray-700 mb-1">Precio: ${product.price}</p>
                        <p className="text-gray-700 mb-1">Proveedor: {product.email}</p>
                        <p className="text-gray-500 text-sm mb-2">Fecha de ingreso: {product.date}</p>

                        <div className="mt-auto flex gap-2">
                            <button
                                onClick={() => onEdit(product)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(product)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
