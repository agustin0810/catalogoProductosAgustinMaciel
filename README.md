# Catálogo de Productos - Prueba Técnica

Aplicación web desarrollada en React que permite registrar, visualizar, editar y eliminar productos. Cada producto incluye los campos que se requirieron a nivel de propuesta pero adicionalmente el campo imagen que opcionalmente permite agregar una imagen a cada producto:

- Nombre del producto
- Precio
- Correo del proveedor
- Fecha de ingreso
- Imagen (opcional) subida a un bucket de Amazon S3
  
**IMPORTANTE: para que funcione la gestión de imágenes es necesario seguir pasos de instalación y generar el .env especificado.**
---

## 🚀 Instalación

1. **Clonar el repositorio:**

git clone [https://github.com/tu-usuario/catalogo-productos.git](https://github.com/agustin0810/catalogoProductosAgustinMaciel/)

cd catalogo-productos

2. **Instalar dependencias:**
npm install

3. **Configurar variables de entorno:**

Crear un archivo .env en la raíz del proyecto con las siguientes variables:

VITE_S3_ACCESS_KEY=AKIAX74AW34BFOHWHQFJ

VITE_S3_SECRET_ACCESS_KEY=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

VITE_S3_BUCKET_NAME=productsagustinmaciel

VITE_S3_REGION=us-east-1

4. **Ejecución**
npm run dev

La aplicación se abrirá en: http://localhost:5173

---
Funcionalidades:
1. Agregar productos con validación de campos.
2. Subida de imagen recortada automáticamente (cuadrada) a S3.
3. Listado de productos con imagen, precio, proveedor y fecha.
4. Edición de productos existentes y sus imágenes.
5. Eliminación de productos.
6. Persistencia local de datos usando localStorage.

**Detalles técnicos:**

Recorte de imagen: al seleccionar una imagen, se recorta automáticamente al área cuadrada más grande posible del centro.

Amazon S3: se utiliza AWS SDK para subir imágenes directamente al bucket desde el cliente.

Persistencia: los productos se guardan en localStorage, lo que permite que persistan entre recargas de la página.

Componentes: la aplicación está modularizada en componentes ProductAdd, ProductList, y ProductEdit.

**Estructura del proyecto:**

src/

├── components/

│   ├── ProductAdd.jsx

│   ├── ProductList.jsx

│   ├── ProductEdit.jsx

├── utils/

│   ├── s3Uploader.js

│   └── validateImage.js

├── App.jsx

├── main.jsx

**Requisitos:**
Node.js 16+

**Autor**
Desarrollado por Agustín Maciel para la prueba técnica de 2H
