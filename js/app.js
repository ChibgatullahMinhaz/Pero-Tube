console.log('connected');

const categoryApiUrl = 'https://openapi.programming-hero.com/api/phero-tube/categories';
fetchData(categoryApiUrl);
const displayCategory = (category='') => {
    const categories = category.categories
    const buttonsContainer = document.getElementById('categoryBtns');
    categories.forEach(category => {

        buttonsContainer.innerHTML = `
                    <button class="btn active p-4">${category.category}</button>
        `;
    });
}