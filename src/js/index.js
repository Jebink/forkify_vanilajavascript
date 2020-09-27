// Global app controller
import Search from "./models/Search"
import { elements, renderLoader, clearLoader } from "./views/base"
import * as searchView from "./views/searchView"
/**Global state of the App*
 * - Search object
 * -current recipie
 * -shopping list object
 * -liked recipies
 */
const state = {};
const controlSearch = async () => {
    //1) get query from the view
    const query = searchView.getInput()
    console.log(query)
    if (query) {

        //2) new search obj
        state.search = new Search(query)

        // 3) prepare the ui for the result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes)

        //4) search for recipies  
        await state.search.getResults()

        //5)render result on ui
        clearLoader();
        searchView.renderResults(state.search.result)
    }

}
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault()
    controlSearch()

})