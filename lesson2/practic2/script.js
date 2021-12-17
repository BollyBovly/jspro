function getCounter() {
	let last = 0

	return () => ++last
}

const stackIDGenrator = getCounter()

class Good {
	constructor({ id, title, price }) {
		this.id = id
		this.title = title
		this.price = price
	}

	// render() {
	// 	return `<div class="goods-list__product-box">
	//     <div class="goods-list__product-box__name">${this.title}</div>
	//     <div class="goods-list__product-box__price">${this.price}</div>
	//     <div class="goods-list__product-box__id" src=${this.id}></div>
	//   </div>`
	// }

	getId() {
		return this.id
	}

	getPrice() {
		return this.price
	}

	getTitle() {
		return this.title
	}
}

class GoodStack {
	constructor(good) {
		this.id = stackIDGenrator()
		this.good = good
		this.count = 1
	}

	getGoodId() {
		return this.good.id
	}

	getGood() {
		return this.good
	}

	getCount() {
		return this.count
	}

	add() {
		this.count++
		return this.count
	}

	remove() {
		this.count--
		return this.count
	}
}

class Cart {
	constructor() {
		this.list = []
	}

	add(good) {
		const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id)

		if (idx >= 0) {
			this.list[idx].add()
		} else {
			this.list.push(new GoodStack(good))
		}
	}

	remove(id) {
		const idx = this.list.findIndex((stack) => stack.getGoodId() == id)

		if (idx >= 0) {
			this.list[idx].remove()

			if (this.list[idx].getCount() <= 0) {
				this.list.splice(idx, 1)
			}
		}
	}
}

class Showcase {
	constructor(cart) {
		this.list = []
		this.cart = cart
	}

	fetchGoods() {
		this.list = [
			new Good({ id: 1, title: 'Футболка', price: 140 }),
			new Good({ id: 2, title: 'Брюки', price: 320 }),
			new Good({ id: 3, title: 'Галстук', price: 24 }),
		]
	}

	addToCart(id) {
		const idx = this.list.findIndex((good) => id == good.id)

		if (idx >= 0) {
			this.cart.add(this.list[idx])
		}
	}
}

const $button = document.querySelector('.cart-button')

class ShowCartsOnShowcase {
	renderShowCase = ({ title, price }) => {
		return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`
	}

	renderGoodsList = (list = showcase) => {
		let goodsList = list
			.map((item) => {
				return renderGoodsItem(item)
			})
			.join('')

		$button.insertAdjacentHTML('beforeend', goodsList)
	}
}

const cart = new Cart()
const showcase = new Showcase(cart)

showcase.fetchGoods()

showcase.addToCart(1)
showcase.addToCart(1)
showcase.addToCart(1)
showcase.addToCart(3)

cart.remove(1)

console.log(showcase, cart)
