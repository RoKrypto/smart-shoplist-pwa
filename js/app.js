/* Form */
const productForm = document.getElementById('form');

/*Info Section*/
const infoSection = document.getElementById('info')

/* Input Fields */
const productNameInput = document.getElementById('form__productInput');
const productQtyInput = document.getElementById('form__qtyInput');
const productPriceInput = document.getElementById('form__priceInput');
const productIdInput = document.getElementById('product__id__input');

/* Buttons */
const infoBtn = document.getElementById('info__btn');
const addProductBtn = document.getElementById('add__product__btn');
const addProductBtnImg = document.getElementById('add__product__img');
const cancelFormBtn = document.getElementById('cancel__btn');
const removeProductsBtn = document.getElementById('remove__products__btn');

/* List of products */
const productListContainer = document.getElementById('productListContainer');
const productList = document.getElementById('productList');
let productId = 0;

/* Total payment */
let totalPaymentNumber = document.getElementById('total__payment');

class Calculator {
	
	static calculateProductSubtotal(productQty, productPrice) {
		const productSubtotal = productQty * productPrice;
		return productSubtotal;
	}

	static sumSubtotals() {
		const subtotals = Array.from(document.querySelectorAll('.productListItem__subtotal'));

		const sum = subtotals.reduce(
			(totalSumSubtotal, subtotal) => totalSumSubtotal + parseFloat(subtotal.textContent), 0
		);

		totalPaymentNumber.textContent = (typeof sum === 'float') ? sum.toFixed(2) : sum;
	}

	static showInfo() {
		infoSection.classList.toggle('is__showing');
	}

}

class Product {
	constructor(productName, productQty, productPrice) {
		this.productName = productName;
		this.productQty = productQty;
		this.productPrice = productPrice
	}

	addProductToList() {
		productId++;
		productList.innerHTML += `
			<li class="productListItem" data-id="${productId}">
				<div class="productListItemInfo">
					<span class="productListItem__name">${this.productName}</span>
					<span class="productListItem__subtotal">${Calculator.calculateProductSubtotal(this.productQty, this.productPrice)}</span>
					<span class="productListItem__qty">Cantidad: <span class="productListItem__qty__number">${this.productQty}</span></span>
					<span class="productListItem__price">Precio Unit.: <span class="productListItem__price__number">${this.productPrice}</span></span>
				</div>
				<button class="btnReset productListItem__btn btn__edit js__edit__product__btn">
					<img src="./icons/edit.svg" alt="editar producto" class="form__btn__icon">
				</button>
				<button class="btnReset productListItem__btn btn__remove js__remove__product__btn">
					<img src="./icons/remove.svg" alt="remover producto" class="form__btn__icon">
				</button>
			</li>`;

		removeProductsBtn.disabled = false;
	}

	static removeProduct(productItem) {
		productList.removeChild(productItem);
	}

	static getProductListItemInfo(productItem) {
		const productNameEl = productItem.querySelector('.productListItem__name');
		const productQtyEl = productItem.querySelector('.productListItem__qty__number');
		const productPriceEl = productItem.querySelector('.productListItem__price__number');
		const productItemId = productItem.dataset.id;

		return {productNameEl, productQtyEl, productPriceEl, productItemId}
	}

	static editProduct(productItem) {		
		const productInfo = this.getProductListItemInfo(productItem);

		productNameInput.value = productInfo.productNameEl.textContent;
		productQtyInput.value = productInfo.productQtyEl.textContent;
		productPriceInput.value = productInfo.productPriceEl.textContent;
		productIdInput.value = productInfo.productItemId;
		addProductBtnImg.src = './icons/check.svg';
	}

	updateProduct(productId) {
	
		const productItem = document.querySelector(`li[data-id="${productId}"]`);

		if( productItem !== null ) {
			productItem.querySelector('.productListItem__name').textContent = this.productName;
			
			productItem.querySelector('.productListItem__subtotal').textContent = Calculator.calculateProductSubtotal(this.productQty, this.productPrice);
			
			productItem.querySelector('.productListItem__qty__number').textContent = this.productQty;
	
			productItem.querySelector('.productListItem__price__number').textContent = this.productPrice;
	
			addProductBtnImg.src = './icons/cart.svg';
		}
	}

	static cleanProductInputValues() {
		productNameInput.value = '';
		productQtyInput.value = '';
		productPriceInput.value = '';
		productIdInput.value = '';
	}

	static resetProductList() {
		productList.innerHTML = '';
		totalPaymentNumber.textContent = 0;
		removeProductsBtn.disabled = true;
		productListContainer.classList.add('empty');
	}

}

productForm.addEventListener('submit', e => {
	e.preventDefault();

	productListContainer.classList.remove('empty');

	const newProduct = new Product(
		productNameInput.value,
		parseFloat(productQtyInput.value),
		parseFloat(productPriceInput.value)
	);

	const productIdNumber = productIdInput.value;

	if( productIdNumber === undefined || productIdNumber === '' ) {
		/* Add product to list and enable buttons to edit and remove products from list*/
		newProduct.addProductToList();
	} else {
		newProduct.updateProduct(productIdNumber);
	}

	/* Reset values from inputs after adding product */
	Product.cleanProductInputValues()

	/* Total Payment Calculation*/
	Calculator.sumSubtotals();
})

/* Clean products list */
removeProductsBtn.addEventListener('click', () => {
	Product.resetProductList();
})

/* Enable buttons from the list */
productList.addEventListener('click', e => {
	const clickedTarget = e.target;

	/* Target product list item */
	let productItem;

	if( clickedTarget.classList.contains('js__remove__product__btn') || clickedTarget.classList.contains('js__edit__product__btn') ) {
		productItem = clickedTarget.parentElement;
	}
	
	if( clickedTarget.getAttribute('alt') === 'remover producto' || clickedTarget.getAttribute('alt') === 'editar producto' ) {
		productItem = clickedTarget.parentElement.parentElement;
	}

	/* Remove product from the list */
	if( clickedTarget.classList.contains('js__remove__product__btn') || clickedTarget.getAttribute('alt') === 'remover producto' ) {
		Product.removeProduct(productItem);
	
		Calculator.sumSubtotals();
	
		if(productList.children.length < 1) {
			Product.resetProductList();
		}
	}

	/* Edit product from the list */
	if( clickedTarget.classList.contains('js__edit__product__btn') || clickedTarget.getAttribute('alt') === 'editar producto' ) {
		Product.editProduct(productItem);
	}

})

cancelFormBtn.addEventListener('click', () => {
	Product.cleanProductInputValues();
	addProductBtnImg.src = './icons/cart.svg';
})

infoBtn.addEventListener('click', () => {
	Calculator.showInfo();
})
