// create loadCatagories
const loadCatagories = () => {
    // fetch the data
// create load
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.log(error));
};
// create displayCatagories
// {category_id: '1001', category: 'Music'}
const displayCatagories = (categories) => {
    // add data in html
    const categoryContainer = document.getElementById("categories")
 categories.forEach((item) => {
    console.log(item)
    // create btn
    const button = document.createElement("button")
    button.classList = 'btn';
    button.innerText = item.category;
    // add button to categoryContainer
    categoryContainer.appendChild(button)
    
 });

};
loadCatagories();
