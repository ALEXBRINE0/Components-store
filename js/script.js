// Obtener los elementos necesarios del DOM
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalContainer = document.querySelector('.cart-total');
const components = document.querySelectorAll(".componentes li");

// Inicializar la cesta de compras con los elementos almacenados en el almacenamiento local
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Función para actualizar la cesta de compras y el total
function updateCart() {
  // Vaciar el contenedor de elementos de la cesta
  cartItemsContainer.innerHTML = '';

  // Actualizar la lista de elementos de la cesta
  cartItems.forEach((item, index)=> {
    const cartItem = document.createElement('li');
    cartItem.innerText = `${item.nombre} - $${item.precio}`;
    cartItemsContainer.appendChild(cartItem);

  });

  // Actualizar el total de la cesta
  const cartTotal = cartItems.reduce((total, item) => total + item.precio, 0);
  cartTotalContainer.innerText = `Total: $${cartTotal.toFixed(2)}`;

  // Almacenar los elementos actualizados en el almacenamiento local
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Función para agregar un elemento a la cesta de compras
function addToCart(item) {
  // Agregar el elemento a la lista de elementos de la cesta
  cartItems.push(item);

  // Actualizar la cesta de compras y el total
  updateCart();
}

// Función para eliminar un elemento de la cesta de compras
function removeFromCart(index) {
  // Eliminar el elemento de la lista de elementos de la cesta
  cartItems.splice(index, 1);

  // Actualizar la cesta de compras y el total
  updateCart();
}

// Modificar la función updateCart para incluir un botón para eliminar cada elemento de la cesta
function updateCart() {
  // Vaciar el contenedor de elementos de la cesta
  cartItemsContainer.innerHTML = '';

  // Actualizar la lista de elementos de la cesta
  cartItems.forEach((item, index) => {
    const cartItem = document.createElement('li');
    cartItem.innerText = `${item.nombre} - $${item.precio}`;

    // Crear un botón de eliminar para cada elemento de la cesta
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Eliminar';
    removeButton.addEventListener('click', () => {
      removeFromCart(index);
    });

    // Agregar el botón de eliminar al elemento de la cesta
    cartItem.appendChild(removeButton);

    cartItemsContainer.appendChild(cartItem);
  });

  // Actualizar el total de la cesta
  const cartTotal = cartItems.reduce((total, item) => total + item.precio, 0);
  cartTotalContainer.innerText = `Total: $${cartTotal.toFixed(2)}`;

  // Almacenar los elementos actualizados en el almacenamiento local
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Escuchar los clics en los botones "Añadir a la cesta"
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Obtener los datos del elemento correspondiente
    const item = {
      nombre: button.parentNode.getAttribute('data-nombre'),
      precio: parseFloat(button.parentNode.getAttribute('data-precio'))
    };

    // Agregar el elemento a la cesta de compras
    addToCart(item);
  });
});

// Activar la funcionalidad de arrastrar y soltar

// Establecer el objeto de datos de arrastre
let datosArrastre = null;

// Agregar listeners de arrastrar y soltar a cada imagen
for (let i = 0; i < imagenes.length; i++) {
  const imagen = imagenes[i];

  imagen.addEventListener('dragstart', function(e) {
    // Guardar los datos de arrastre en el objeto
    datosArrastre = {
      nombre: e.target.parentNode.getAttribute('data-nombre'),
      precio: e.target.parentNode.getAttribute('data-precio')
    };
  });
}

// Obtener el elemento de la cesta y agregar un listener de soltar
const cesta = document.getElementById('cart-item');

cesta.addEventListener('drop', function(e) {
  e.preventDefault();

  // Crear un nuevo elemento de lista con los datos de arrastre
  const nuevoItem = document.createElement('li');
  nuevoItem.textContent = `${datosArrastre.nombre} - $${datosArrastre.precio}`;

  // Agregar el nuevo elemento de lista a la cesta
  cesta.appendChild(nuevoItem);

  // Actualizar el total de la cesta
  const total = document.querySelector('.cart-total');
  const precioActual = parseFloat(total.textContent.replace('$', ''));
  total.textContent = `$${(precioActual + parseFloat(datosArrastre.precio)).toFixed(2)}`;

  // Restablecer los datos de arrastre
  datosArrastre = null;
});

cesta.addEventListener('dragover', function(e) {
  e.preventDefault();
});

// Actualizar la cesta de compras y el total al cargar la página
updateCart();
