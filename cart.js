class CartItem {
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

        divItem.append(h2Title, spanMonthDuration);
        this.rootElement.appendChild(divItem);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // buttons
    const btnShowCartItems = document.createElement('button'); // +
    btnShowCartItems.classList.add('btn-utils');
    btnShowCartItems.innerText = 'Show/Hide cart items';

    const btnDeleteLastItem = btnShowCartItems.cloneNode();
    btnDeleteLastItem.innerText = 'Delete last item from cart';

    const btnDeleteFirstItem = btnShowCartItems.cloneNode();
    btnDeleteFirstItem.innerText = 'Delete first item from cart';

    const btnClearCart = btnShowCartItems.cloneNode();
    btnClearCart.innerText = 'Clear cart';

    const btnCalcTotalDuration = btnShowCartItems.cloneNode();
    btnCalcTotalDuration.innerText = 'Calc total duration of my courses';

    // calc window
    const divTotalDurationView = document.createElement('div');
    divTotalDurationView.classList.add('view');

    // nav btn
    const a = document.createElement('a');
    a.classList.add('btn-utils');
    a.href = 'index.html';
    // у попередніх рядках cloneNode() сама мені додавала клас 'btn-utils' до клонованих кнопок,
    // але тут мені такого щастя не треба, тому через createElement()
    const btnNavToStore = document.createElement('button');
    btnNavToStore.innerText = 'Go back to the store';

    // cart items
    const divCart = document.createElement('div');
    divCart.classList.add('hide', 'wrapper');

    // LSData
    const data = JSON.parse(localStorage.getItem('cart'));
    console.log(data);

    if (!data || data === []) {
        alert('local storage is empty');
    } else {
        data.forEach(({title, monthDuration}) => {
            new CartItem(title, monthDuration, ['item', 'title', 'duration'], divCart).build();
        });
    }

    // events
    const clearViewField = () => divTotalDurationView.innerText = '';
    const deleteItem = (place = '') => {
        const currentData = JSON.parse(localStorage.getItem('cart'));
        if (!currentData || currentData.length <= 0) {
            alert('local storage is empty');
        } else {
            place ? currentData.shift() : currentData.pop();

            localStorage.setItem('cart', JSON.stringify(currentData));
            divCart.innerHTML = '';

            currentData.forEach(({title, monthDuration}) => {
                new CartItem(title, monthDuration, ['item', 'title', 'duration'], divCart).build();
            });
        }
    };

    btnShowCartItems.onclick = () => {
        divCart.classList.toggle('hide');
    };
        // delete first item
    btnDeleteFirstItem.onclick = () => {
        deleteItem('textForCorrectWork');
        clearViewField();
    };
        // delete last item
    btnDeleteLastItem.onclick = () => {
        deleteItem();
        clearViewField();
    };
        // clear cart
    btnClearCart.onclick = () => {
        localStorage.clear();
        divCart.innerHTML = '';
        clearViewField();
    };

    btnCalcTotalDuration.onclick = () => {
        let total = JSON.parse(localStorage.getItem('cart')).reduce((acc, {monthDuration}) => acc + monthDuration, 0);

        // console.log(total);
        divTotalDurationView.innerText = 'All courses duration is: ' + total + ' months';
    };

    // appends
    a.appendChild(btnNavToStore);
    document.body.append(
        btnShowCartItems,
        btnDeleteFirstItem,
        btnDeleteLastItem,
        btnClearCart,
        btnCalcTotalDuration,
        a,
        divCart,
        divTotalDurationView
    );
});