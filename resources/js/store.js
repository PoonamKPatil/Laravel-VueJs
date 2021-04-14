export default {
    state: {
        lastSearch: {
            from:null,
            to:null
        },
        basket:{
            items:[]
        }
    },
    mutations: {
        setLastSearch(state, payload) {
            state.lastSearch = payload
        },
        addToBasket(state, payload) {
            state.basket.items.push(payload)
        },
        removeFromBasket(state, payload) {
            state.basket.items = state.basket.items.filter(item => item.bookable.id !== payload)
        },
        setBasket(state, payload) {
            state.basket = payload
        }
    },
    actions: {
        setLastSearch(context, payload) {
            context.commit('setLastSearch', payload)
            localStorage.setItem('lastSearch', JSON.stringify(payload))
        },
        loadLocalstorage(context) {
            const lastSearch = localStorage.getItem('lastSearch')

            if (lastSearch) {
                context.commit('setLastSearch', JSON.parse(lastSearch))   
            }

            const basket = localStorage.getItem('basket')

            if (basket) {
                context.commit('setBasket', JSON.parse(basket))
            }
        },
        addToBasket({commit,state}, payload) {
            commit('addToBasket', payload)
            localStorage.setItem('basket',JSON.stringify(state.basket))
        },
        removeFromBasket({commit,state},payload) {
            commit('removeFromBasket', payload)
            localStorage.setItem('basket',JSON.stringify(state.basket))
        }

    },
    getters: {
        itemsInBasketCount : (state) => state.basket.items.length,
        inBasketAlready(state) {
            return function (bookableId) {
                var bookableObj = state.basket.items.find(item => item.bookable.id === bookableId)
                
                if (bookableObj === undefined) {
                    return false;
                }

                return bookableObj
            }; 
        }
    }
}