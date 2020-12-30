import firebase from "firebase/app";
export default {
    state:{
        info:{}
    },
    actions:{
        async fetchInfo({dispatch,commit}){
            try{
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setInfo',info)
                // eslint-disable-next-line no-empty
            } catch (e) {

            }

        }
    },
    mutations:{
        setInfo(state,info){
            state.info = info
        },
        clearInfo(state){
            state.info = {}
        }
    },
    getters:{
        info(state){
            return state.info
        }
    }
}