const root = document.getElementById('root');

let coursesAndDurationArray = [
	{ title: 'JavaScript Complex', monthDuration: 5 },
	{ title: 'Java Complex', monthDuration: 6 },
	{ title: 'Python Complex', monthDuration: 6 },
	{ title: 'QA Complex', monthDuration: 4 },
	{ title: 'FullStack', monthDuration: 7 },
	{ title: 'Frontend', monthDuration: 4 }
];

class Item {
	constructor(title, monthDuration, cssClasses, rootElement) {
		this.title = title;
		this.monthDuration = monthDuration;
		this.cssClasses = cssClasses;
		this.rootElement = rootElement;
	}

	build() {
		const divItem = document.createElement('div');
		divItem.classList.add(this.cssClasses[0]);

		const h2Title = document.createElement('h2');
		h2Title.classList.add(this.cssClasses[1]);
		h2Title.innerText = this.title;

		const spanMonthDuration = document.createElement('span');
		spanMonthDuration.classList.add(this.cssClasses[2]);
		spanMonthDuration.innerText = this.monthDuration;

		const buttonAdd = document.createElement('button');
		buttonAdd.classList.add(this.cssClasses[3]);
		buttonAdd.innerText = 'Add to cart';

		divItem.append(h2Title, spanMonthDuration, buttonAdd);
		this.rootElement.appendChild(divItem);

		// стрілочна для того щоб контекст не належав кнопці, а належав новому об'єкту
		buttonAdd.onclick = () => {
			const cart = JSON.parse(localStorage.getItem('cart')) ?? [];
			cart.push({title: this.title, monthDuration: this.monthDuration, addTime: new Date()});
			localStorage.setItem('cart', JSON.stringify(cart));
		};
	}
}

coursesAndDurationArray.forEach(({title, monthDuration}) => {
	new Item(title, monthDuration, ['item', 'title', 'duration', 'btn-add'], root).build();
});
