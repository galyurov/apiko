import firebase from "firebase/app";
export default {
    state: {
        productList: {},
        filterList:{}
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        async saveProduct({dispatch, commit}, {title, location, description, price, like, images}) {
            let id = Date.now()
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/products/${id}`).set({
                    title,
                    location,
                    description,
                    price,
                    like,
                    id,
                    images
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        // eslint-disable-next-line no-unused-vars
        async getProductList({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}/products`).once('value')).val()
                commit('saveProductList', info)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateItemInfo({dispatch,commit},{title,id, location, like, description, price, images}){
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/products/${id}/`).set({title,id, location, description, price, images,like})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        }
    },
    mutations: {
        saveProductList(state, list) {
            state.productList = list
        },
        filter(state,payload){
            if(state.productList){
                let name = Object.values(state.productList).filter((item)=> {
                    if (payload.name && item.title.includes(payload.name)) {
                        return true
                    } else if (!payload.name) {
                        return true
                    }
                })
                    let location = name.filter((item) => {
                        if (payload.location && item.location.includes(payload.location)) {
                            return true
                        } else if (!payload.location) {
                            return true
                        }
                    })
                    let minPrice = location.filter((item) => {
                        if (payload.minPrice && item.price > payload.minPrice) {
                            return true
                        } else if (!payload.minPrice) {
                            return true
                        }
                    })
                    let maxPrice = minPrice.filter((item) => {
                        if (payload.maxPrice && item.price < payload.maxPrice) {
                            return true
                        } else if (!payload.maxPrice) {
                            return true
                        }
                    })
                    state.filterList = maxPrice
                }
        }
    },
    getters: {
        productList(state) {
            return state.productList
        },
        filterList(state){
            return Object.values(state.filterList).length ? state.filterList : state.productList
        }
    }
}