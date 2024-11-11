// Función para obtener productos desde la API
async function fetchProducts() {
    try {
        // Hacer una solicitud HTTP GET a la API para obtener productos
        const response = await fetch("http://127.0.0.1:5000/productos");

        // Verificar si la respuesta es exitosa (status code 200-299)
        if (!response.ok) {
            // Lanzar un error si la respuesta no es exitosa
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Convertir la respuesta a formato JSON
        const data = await response.json();
        console.log(data);  // Mostrar los datos obtenidos en la consola

        // Retornar los datos obtenidos
        return data;
    } catch (error) {
        // Capturar errores durante la solicitud o conversión
        console.log("Error fetching products:", error);

        // Devolver un array vacío en caso de error
        return [];
    }
}

// Función para mostrar los productos en el HTML con Bootstrap
function displayProducts(products) {
    // Selecciona el contenedor en el que se mostrarán los productos
    const shopContent = document.getElementById("shopContent");

    // Limpiar el contenido actual del contenedor
    shopContent.innerHTML = '';

    // Crear una variable para almacenar el HTML de los productos
    let htmlContent = '';

    // Iterar sobre el array de productos y generar el HTML
    products.forEach(product => {
        // Añadir cada producto como un elemento HTML con formato Bootstrap
        htmlContent += `
            <div class="col-lg-3 col-md-4 mb-4">
                <div class="card h-100 product-card">
                    <img src="${product.product_url}" class="card-img-top" alt="Imagen de ${product.product_name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.product_name}</h5>
                        <p class="card-text">Precio: $${product.product_price}</p>
                        <button class="btn btn-custom add-to-cart"
                                data-name="${product.product_name}"
                                data-price="${product.product_price}"
                                data-url="${product.product_url}">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    // Insertar el HTML de todos los productos en el contenedor de una sola vez
    shopContent.innerHTML = htmlContent;

    // Seleccionar todos los botones "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Iterar sobre los botones y agregarles un evento de clic
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtener los datos del producto desde los atributos personalizados del botón
            const productName = button.getAttribute('data-name');
            const productPrice = button.getAttribute('data-price');
            const productUrl = button.getAttribute('data-url');

            // Crear un objeto con la información del producto
            const product = {
                name: productName,
                price: productPrice,
                url: productUrl
            };

            // Llamar a la función para agregar el producto al carrito
            addToCart(product);
        });
    });
}

// Función principal para obtener los productos y mostrarlos
async function main() {
    // Llamar a la función para obtener productos desde la API
    const products = await fetchProducts();

    // Mostrar los productos en el HTML
    displayProducts(products);
}

// Ejecutar la función principal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', main);
