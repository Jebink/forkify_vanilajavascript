import { elements } from "./base"

//exporting functions
export const getInput = () => elements.searchInput.value

export const clearInput = () => {
    elements.searchInput.value = ""
};
export const clearResults = () => {
    elements.searchResultList.innerHTML = "";
}
export const renderResults = (recipes) => {
    recipes.forEach(renderRecipe);
}

//logic functions
const renderRecipe = recipe => {
    const markUp = `
        <li>
            <a class="results__link results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt ="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
`;
    elements.searchResultList.insertAdjacentHTML(`beforeend`, markUp)
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = []
    if (title.length > limit) {
        title.split(" ").reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur)
            }
            return acc + cur.length
        }, 0);
        return `${newTitle.join(" ")}...`
    }
    return title
}