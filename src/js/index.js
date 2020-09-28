// Global app controller
import Search from "./models/Search"
import Recipe from "./models/Recipe"
import { elements, renderLoader, clearLoader } from "./views/base"
import * as searchView from "./views/searchView"
import * as recipeView from "./views/recipeView"
/**Global state of the App*
 * - Search object
 * -current recipie
 * -shopping list object
 * -liked recipies
 */
const state = {};
/*SEARCH CONTROLLER */
const controlSearch = async () => {
    //1) get query from the view
    const query = searchView.getInput()
    if (query) {

        //2) new search obj
        state.search = new Search(query)

        // 3) prepare the ui for the result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes)
        try {
            await state.search.getResults()
            //5)render result on ui
            clearLoader();
            searchView.renderResults(state.search.result,)
        } catch (error) {
            alert("Something wrong with search..")
            clearLoader()
        }
        //4) search for recipies  
    }
}
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault()
    controlSearch()
})


elements.searchResPages.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline")
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10)
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage)
    }
})

/*RECIPE CONTROLLER */
const controllRecipe = async () => {
    //get id from url
    const id = window.location.hash.replace("#", "")
    if (id) {

        //prepare ui change
        recipeView.clearRecipe()
        renderLoader(elements.recipe)


        //highlight sector 
        if (state.search) searchView.highlightSelected(id)

        //create recipe object
        state.recipe = new Recipe(id)

        try {

            //get recipe data and parse ingredients
            await state.recipe.getRecipe()
            state.recipe.parseIngredients()

            //calculate serving and time
            state.recipe.calcTime();
            state.recipe.calcServings()
            //render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe)
        }
        catch (err) {
            alert("Error processing recipe! ")
        }

    }
}
["hashchange", "load"].forEach(event => addEventListener(event, controllRecipe));

//handling recipe button clicks
elements.recipe.addEventListener("click", e => {
    if (e.target.matches(`.btn-dec, .btn-dec *`)) {
        //dec btn is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings("dec")
            recipeView.updateServingsIngredients(state.recipe)
        }
    }
    else if (e.target.matches(`.btn-inc, .btn-inc *`)) {
        //inc btn is clicked
        state.recipe.updateServings("inc")
        recipeView.updateServingsIngredients(state.recipe)
    }
})
