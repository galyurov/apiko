<template>
  <div class="home__container">
    <div class="home__wrap">
      <div class="home__filter">
        <div class="container">
          <div @click="dropdown = !dropdown" class="filter__category">
            <svg class="filter__icon" width="17" height="17" viewBox="0 0 17 17" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.1429 0H14.5714C15.9126 0 17 1.08739 17 2.42857V4.85714C17 6.19832 15.9126 7.28571 14.5714 7.28571H12.1429C10.8017 7.28571 9.71429 6.19832 9.71429 4.85714V2.42857C9.71429 1.08739 10.8017 0 12.1429 0ZM12.1429 9.71429H14.5714C15.9126 9.71429 17 10.8017 17 12.1429V14.5714C17 15.9126 15.9126 17 14.5714 17H12.1429C10.8017 17 9.71429 15.9126 9.71429 14.5714V12.1429C9.71429 10.8017 10.8017 9.71429 12.1429 9.71429ZM4.85714 9.71429H2.42857C1.08739 9.71429 0 10.8017 0 12.1429V14.5714C0 15.9126 1.08739 17 2.42857 17H4.85714C6.19832 17 7.28571 15.9126 7.28571 14.5714V12.1429C7.28571 10.8017 6.19832 9.71429 4.85714 9.71429ZM2.42857 0H4.85714C6.19832 0 7.28571 1.08739 7.28571 2.42857V4.85714C7.28571 6.19832 6.19832 7.28571 4.85714 7.28571H2.42857C1.08739 7.28571 0 6.19832 0 4.85714V2.42857C0 1.08739 1.08739 0 2.42857 0Z"
                    fill="#505050"/>
            </svg>
            <p v-if="!category" class="filter__text">Choose category</p>
            <p v-else class="filter__text">Category {{ category }}</p>
            <svg class="filter__icon icon__arrow" width="16" height="10" viewBox="0 0 16 10" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8.14256 7.62263L14.7307 0.206903C15.0092 -0.0569426 15.4723 -0.0701756 15.7649 0.177159C16.0576 0.424494 16.0691 0.838996 15.7904 1.10284L9.06588 8.67222C8.86861 8.85905 8.57881 8.92028 8.32251 8.85227C8.03055 9.06765 7.59773 9.0531 7.32469 8.80862C7.03436 8.54867 0.217836 1.35396 0.217836 1.35396C-0.072612 1.09414 -0.072612 0.672842 0.217836 0.412901C0.508284 0.153081 0.978876 0.153081 1.26934 0.412901L8.14256 7.62263Z"
                    fill="#666666"/>
            </svg>
            <div v-show="dropdown" @click="category = $event.target.textContent" class="filter__drop">
              <p  class="drop__category"></p>
              <p class="filter__dropdivider"></p>
              <p  class="drop__category">A - E</p>
              <p class="filter__dropdivider"></p>
              <p class="drop__category">F - M</p>
              <p class="filter__dropdivider"></p>
              <p class="drop__category">N - Z</p>
            </div>
          </div>
          <div class="filter__price">
            <input v-model="minPrice" @change="filter" type="text" class="filter__input" placeholder="Price from (USD)">
          </div>
          <div class="filter__divider"></div>
          <div class="filter__price">
            <input v-model="maxPrice" @change="filter" type="text" class="filter__input" placeholder="Price to (USD)">
          </div>
        </div>

      </div>

      <template v-if="!loading && lengthOfList">
        <div class="home__items">
          <div v-for="(item,index) in filteredList" :key="index" class="home__item">
            <img v-if="item.images" :src='item.images'  class="item__img">
            <p  class="item__img noImage" v-else>No image</p>
            <div @click="likeToItem(item)" class="item__fav">
              <svg v-if="!item.like" class="item__icon like" width="17" height="15" viewBox="0 0 17 15" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M8.5 1.18016C10.5328 -0.489899 13.5751 -0.386848 15.4836 1.48538C16.4619 2.4443 17 3.72024 17 5.078C17 6.43654 16.4619 7.7117 15.4836 8.67062L9.40693 14.6318C9.15674 14.8773 8.82797 15 8.5 15C8.17203 15 7.84326 14.8773 7.59307 14.6318L1.51637 8.67062C0.538066 7.7117 0 6.43576 0 5.078C0 3.72024 0.538066 2.44509 1.51637 1.48538C3.42566 -0.386848 6.46802 -0.489112 8.5 1.18016ZM8.72613 13.964L14.8036 8.00276C15.5999 7.2224 16.0377 6.18403 16.0377 5.078C16.0377 3.97276 15.5999 2.9336 14.8036 2.15324C13.159 0.540611 10.4839 0.540611 8.84 2.15324C8.65156 2.33732 8.34684 2.33732 8.1592 2.15324C7.33726 1.34614 6.25712 0.943375 5.17778 0.943375C4.09844 0.943375 3.0183 1.34693 2.19637 2.15324C1.40009 2.93438 0.962264 3.97276 0.962264 5.078C0.962264 6.18324 1.40009 7.22162 2.19637 8.00276L8.27307 13.964C8.39816 14.0867 8.60104 14.0867 8.72613 13.964Z"
                      fill="#B7B7B7"/>
              </svg>
              <svg v-else class="item__icon" width="17" height="15" viewBox="0 0 17 15" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15.4836 1.48538C13.5751 -0.386848 10.5328 -0.489899 8.5 1.18016C6.46802 -0.489112 3.42566 -0.386848 1.51637 1.48538C0.538066 2.44509 0 3.72024 0 5.078C0 6.43576 0.538066 7.7117 1.51637 8.67062L7.59307 14.6318C7.84326 14.8773 8.17203 15 8.5 15C8.82797 15 9.15674 14.8773 9.40693 14.6318L15.4836 8.67062C16.4619 7.7117 17 6.43654 17 5.078C17 3.72024 16.4619 2.4443 15.4836 1.48538Z"
                    fill="#349A89"/>
              </svg>

            </div>
            <div class="item__name">{{ item.title }}</div>
            <div class="item__price">${{item.price}}</div>
          </div>
        </div>
      </template>
      <template v-else-if="loading">
        <div class="animate">
          <div class="windows8">
            <div class="wBall" id="wBall_1">
              <div class="wInnerBall"></div>
            </div>
            <div class="wBall" id="wBall_2">
              <div class="wInnerBall"></div>
            </div>
            <div class="wBall" id="wBall_3">
              <div class="wInnerBall"></div>
            </div>
            <div class="wBall" id="wBall_4">
              <div class="wInnerBall"></div>
            </div>
            <div class="wBall" id="wBall_5">
              <div class="wInnerBall"></div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="!loading && !lengthOfList">
        <div class="info__text">No Items!</div>
      </template>
    </div>

    <div :style="!lengthOfList ? 'position:fixed;bottom:0;width:100%': null" class="footer">
      Copyright © 2017. Privacy Policy.
    </div>
  </div>


</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      dropdown: null,
      like: false,
      category:'',
      minPrice: null,
      maxPrice: null,
      loading:true,
    }
  },
  methods:{
    filter(){
      this.$store.commit('filter',{minPrice:this.minPrice,maxPrice:this.maxPrice})
    },
    likeToItem(item){
      item.like = !item.like
      this.$store.dispatch('updateItemInfo',item)
    }

  },
  mounted() {
    this.$store.dispatch('getProductList')
    .then(()=>{
      this.loading = false

    })
  },
  computed: {
    productsList(){
      return this.$store.getters.productList
    },
    filteredList() {
      return this.$store.getters.filterList
    },
    lengthOfList(){
      return this.productsList ? Object.keys(this.productsList).length : 0
    }
  }
}
</script>
<style lang="scss" scoped>
.home__container {
  display: flex;
  flex-direction: column;
  position: relative;
}

.home__wrap {
  font-family: Helvetica;
  max-width: 855px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: 19px;
}

.home__filter {
  background: #FFFFFF;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.217111);
  border-radius: 4px;
  padding: 12px 11px;
}

.filter__category, .filter__price {
  background: #F9FAFB;
  border: 1px solid #DEDEE0;
  box-sizing: border-box;
  border-radius: 5px;
}

.filter__category {
  cursor: pointer;
  position: relative;
  width: 285px;
  padding-left: 39px;

  &:hover {
    border: 1px solid #349A89;
  }
}

.filter__icon {
  position: absolute;
  left: 14px;
  top: 9px
}

.filter__text {
  font-size: 14px;
  font-family: Helvetica;
  line-height: 16px;
  letter-spacing: 0.35px;
  padding: 10px 0;
  margin: 0;
  color: #505050;
}

.filter__price {
  width: 143px;
  height: 38px;
}

.container {
  max-width: 620px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon__arrow {
  top: 14px;
  left: unset;
  right: 10px;
}

.filter__input {
  padding: 0 5px;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  border: none;
  height: 100%;
  background: transparent;
}

.filter__divider {
  width: 12px;
  height: 1px;
  border: 1px solid #DEDEE0;
}

.filter__drop {

  width: 100%;
  position: absolute;
  left: 0;
  background: #F9FAFB;
  border: 1px solid #DEDEE0;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0 15px;
  z-index: 3;

}

.filter__dropdivider {
  height: 1px;
  border-top: 1px solid #DEDEE0;
}

.filter__dropdivider, .drop__category {
  margin: 0;
}

.drop__category {
  padding: 10px 0 10px 5px;

  &:hover {
    background: #349A89;
  }
}

.home__items {
  display: grid;
  grid-template-columns: repeat(4, minmax(209px, 209px));
  grid-gap: 7px;
  position: relative;

  padding-top: 18px;
  padding-bottom: 18px;
}

.item__img {
  width: 202px;
  height: 148px;
  margin: 2px 2px;
  border-radius: 4px 4px 0px 0px;
}

.item__name {
  font-size: 15px;
  line-height: 17px;
  padding: 6px 0 0 12px;
  margin-bottom: 7px;
  color: #373738;

}

.item__price {
  font-size: 18px;
  line-height: 21px;
  color: #101010;
  padding-left: 12px;
}

.home__item {
  position: relative;
  background: #FFFFFF;
  border: 1px solid #E4E4E4;
  box-sizing: border-box;
  box-shadow: 0px 4px 14px rgba(121, 121, 121, 0.0527344);
  border-radius: 4px;
  padding-bottom: 10px;
}

.item__fav {
  position: absolute;
  cursor: pointer;
  right: 7px;
  bottom: 50px;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.163407);
  width: 30px;
  height: 30px;
  border-radius: 50%;

}

.item__icon {
  position: absolute;

  top: 7px;
  right: 6px;
  fill: #B7B7B7;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 14.4px;
  line-height: 17px;
  text-align: center;
  padding: 22px 0 33px 0;
  color: #C0C4CE;
  background: rgba(192, 196, 206, 0.127321);
}

.animate {
  width: 90px;
  height: 90px;
  margin: 15px auto;
}

.windows8 {
  position: relative;
  width: 28px;
  height: 28px;
  margin: auto;
  padding: 10px;
}

.windows8 .wBall {
  position: absolute;
  width: 35px;
  height: 35px;
  opacity: 0;
  transform: rotate(225deg);
  -o-transform: rotate(225deg);
  -ms-transform: rotate(225deg);
  -webkit-transform: rotate(225deg);
  -moz-transform: rotate(225deg);
  animation: orbit 4.8425s infinite;
  -o-animation: orbit 4.8425s infinite;
  -ms-animation: orbit 4.8425s infinite;
  -webkit-animation: orbit 4.8425s infinite;
  -moz-animation: orbit 4.8425s infinite;
}

.windows8 .wBall .wInnerBall {
  position: absolute;
  width: 4px;
  height: 4px;
  background:#349A89;
  left: 0px;
  top: 0px;
  border-radius: 2px;
}

.windows8 #wBall_1 {
  animation-delay: 1.056s;
  -o-animation-delay: 1.056s;
  -ms-animation-delay: 1.056s;
  -webkit-animation-delay: 1.056s;
  -moz-animation-delay: 1.056s;
}

.windows8 #wBall_2 {
  animation-delay: 0.203s;
  -o-animation-delay: 0.203s;
  -ms-animation-delay: 0.203s;
  -webkit-animation-delay: 0.203s;
  -moz-animation-delay: 0.203s;
}

.windows8 #wBall_3 {
  animation-delay: 0.4265s;
  -o-animation-delay: 0.4265s;
  -ms-animation-delay: 0.4265s;
  -webkit-animation-delay: 0.4265s;
  -moz-animation-delay: 0.4265s;
}

.windows8 #wBall_4 {
  animation-delay: 0.6295s;
  -o-animation-delay: 0.6295s;
  -ms-animation-delay: 0.6295s;
  -webkit-animation-delay: 0.6295s;
  -moz-animation-delay: 0.6295s;
}

.windows8 #wBall_5 {
  animation-delay: 0.843s;
  -o-animation-delay: 0.843s;
  -ms-animation-delay: 0.843s;
  -webkit-animation-delay: 0.843s;
  -moz-animation-delay: 0.843s;
}

@keyframes orbit {
  0% {
    opacity: 1;
    z-index: 99;
    transform: rotate(180deg);
    animation-timing-function: ease-out;
  }
  7% {
    opacity: 1;
    transform: rotate(300deg);
    animation-timing-function: linear;
    origin: 0%;
  }
  30% {
    opacity: 1;
    transform: rotate(410deg);
    animation-timing-function: ease-in-out;
    origin: 7%;
  }
  39% {
    opacity: 1;
    transform: rotate(645deg);
    animation-timing-function: linear;
    origin: 30%;
  }
  70% {
    opacity: 1;
    transform: rotate(770deg);
    animation-timing-function: ease-out;
    origin: 39%;
  }
  75% {
    opacity: 1;
    transform: rotate(900deg);
    animation-timing-function: ease-out;
    origin: 70%;
  }
  76% {
    opacity: 0;
    transform: rotate(900deg);
  }
  100% {
    opacity: 0;
    transform: rotate(900deg);
  }
}

@-o-keyframes orbit {
  0% {
    opacity: 1;
    z-index: 99;
    -o-transform: rotate(180deg);
    -o-animation-timing-function: ease-out;
  }
  7% {
    opacity: 1;
    -o-transform: rotate(300deg);
    -o-animation-timing-function: linear;
    -o-origin: 0%;
  }
  30% {
    opacity: 1;
    -o-transform: rotate(410deg);
    -o-animation-timing-function: ease-in-out;
    -o-origin: 7%;
  }
  39% {
    opacity: 1;
    -o-transform: rotate(645deg);
    -o-animation-timing-function: linear;
    -o-origin: 30%;
  }
  70% {
    opacity: 1;
    -o-transform: rotate(770deg);
    -o-animation-timing-function: ease-out;
    -o-origin: 39%;
  }
  75% {
    opacity: 1;
    -o-transform: rotate(900deg);
    -o-animation-timing-function: ease-out;
    -o-origin: 70%;
  }
  76% {
    opacity: 0;
    -o-transform: rotate(900deg);
  }
  100% {
    opacity: 0;
    -o-transform: rotate(900deg);
  }
}

@-ms-keyframes orbit {
  0% {
    opacity: 1;
    z-index: 99;
    -ms-transform: rotate(180deg);
    -ms-animation-timing-function: ease-out;
  }
  7% {
    opacity: 1;
    -ms-transform: rotate(300deg);
    -ms-animation-timing-function: linear;
    -ms-origin: 0%;
  }
  30% {
    opacity: 1;
    -ms-transform: rotate(410deg);
    -ms-animation-timing-function: ease-in-out;
    -ms-origin: 7%;
  }
  39% {
    opacity: 1;
    -ms-transform: rotate(645deg);
    -ms-animation-timing-function: linear;
    -ms-origin: 30%;
  }
  70% {
    opacity: 1;
    -ms-transform: rotate(770deg);
    -ms-animation-timing-function: ease-out;
    -ms-origin: 39%;
  }
  75% {
    opacity: 1;
    -ms-transform: rotate(900deg);
    -ms-animation-timing-function: ease-out;
    -ms-origin: 70%;
  }
  76% {
    opacity: 0;
    -ms-transform: rotate(900deg);
  }
  100% {
    opacity: 0;
    -ms-transform: rotate(900deg);
  }
}

@-webkit-keyframes orbit {
  0% {
    opacity: 1;
    z-index: 99;
    -webkit-transform: rotate(180deg);
    -webkit-animation-timing-function: ease-out;
  }
  7% {
    opacity: 1;
    -webkit-transform: rotate(300deg);
    -webkit-animation-timing-function: linear;
    -webkit-origin: 0%;
  }
  30% {
    opacity: 1;
    -webkit-transform: rotate(410deg);
    -webkit-animation-timing-function: ease-in-out;
    -webkit-origin: 7%;
  }
  39% {
    opacity: 1;
    -webkit-transform: rotate(645deg);
    -webkit-animation-timing-function: linear;
    -webkit-origin: 30%;
  }
  70% {
    opacity: 1;
    -webkit-transform: rotate(770deg);
    -webkit-animation-timing-function: ease-out;
    -webkit-origin: 39%;
  }
  75% {
    opacity: 1;
    -webkit-transform: rotate(900deg);
    -webkit-animation-timing-function: ease-out;
    -webkit-origin: 70%;
  }
  76% {
    opacity: 0;
    -webkit-transform: rotate(900deg);
  }
  100% {
    opacity: 0;
    -webkit-transform: rotate(900deg);
  }
}

@-moz-keyframes orbit {
  0% {
    opacity: 1;
    z-index: 99;
    -moz-transform: rotate(180deg);
    -moz-animation-timing-function: ease-out;
  }
  7% {
    opacity: 1;
    -moz-transform: rotate(300deg);
    -moz-animation-timing-function: linear;
    -moz-origin: 0%;
  }
  30% {
    opacity: 1;
    -moz-transform: rotate(410deg);
    -moz-animation-timing-function: ease-in-out;
    -moz-origin: 7%;
  }
  39% {
    opacity: 1;
    -moz-transform: rotate(645deg);
    -moz-animation-timing-function: linear;
    -moz-origin: 30%;
  }
  70% {
    opacity: 1;
    -moz-transform: rotate(770deg);
    -moz-animation-timing-function: ease-out;
    -moz-origin: 39%;
  }
  75% {
    opacity: 1;
    -moz-transform: rotate(900deg);
    -moz-animation-timing-function: ease-out;
    -moz-origin: 70%;
  }
  76% {
    opacity: 0;
    -moz-transform: rotate(900deg);
  }
  100% {
    opacity: 0;
    -moz-transform: rotate(900deg);
  }
}
.info__text{
  text-align: center;
  margin-top: 15px;
}
.noImage{
  text-align: center;
  line-height: 142px;
}
@media screen and (max-width: 870px){
  .home__items {
    grid-template-columns: repeat(3, minmax(209px, 209px));
    padding: 10px;
  }
}
@media screen and (max-width: 740px){
  .search__name[data-v-0446108a] {
    max-width: 51%;
  }
  .footer {
    position: static;
  }
}
@media screen and (max-width: 680px){
  .home__items {
    grid-template-columns: repeat(2, minmax(209px, 260px));
    justify-content: center;
    padding: 10px;
  }
  .item__img{
    width: 253px;
  }
  .searchBar__input{
    padding: 10px 5px 10px 40px;
  }
  .searchBar__icon{
    top: 10px;
    left: 13px;
  }
  .searchBar__btn{
    padding: 9px 35px;
  }
  .home__wrap {
    width: 580px;
  }
}
@media screen and (max-width: 590px){
  .home__wrap {
    width: 500px;
  }
  .home__items {
    grid-template-columns: repeat(2, minmax(209px, 220px));
    justify-content: center;
    padding: 10px;
  }
  .item__img{
    width: 213px;
  }
}
@media screen and (max-width: 530px){
  .home__items {
    grid-template-columns: repeat(2, minmax(209px, 220px));
    justify-content: center;
    padding: 10px;
  }
  .item__img{
    width: 213px;
  }
  //.container{
  //  flex-direction: column;
  //}
}
@media screen and (max-width: 510px) {
  .home__wrap {
    max-width: 470px;

  }
  .filter__divider{
    display: none;
  }
}
@media screen and (max-width: 490px) {
  .home__wrap {
    max-width: 420px;

  }
  .filter__divider{
    display: none;
  }
  .home__items {
    grid-template-columns: repeat(2, minmax(209px, 209px));
    justify-content: center;
    padding: 10px;
  }
  .item__img{
    width: 202px;
  }
}
@media screen and (max-width: 465px) {
  .home__wrap {
    max-width: 420px;

  }
  .filter__divider{
    display: none;
  }
  .home__items {
    grid-template-columns: repeat(2, minmax(209px, 209px));
    justify-content: center;
    padding: 10px;
  }
  .item__img{
    width: 202px;
  }
}
@media screen and (max-width: 435px) {
  .home__wrap {
    max-width: 360px;

  }
  .container{
    flex-direction: column;
  }
  .filter__divider{
    display: none;
  }
  .home__items {
    grid-template-columns: repeat(2, minmax(150px, 150px));
    justify-content: center;
    padding: 10px;
  }
  .item__img{
    width: 143px;
  }
}
@media screen and (max-width: 385px) {
  .home__wrap {
    max-width: 320px;

  }
  .container{
    flex-direction: column;
  }
  .filter__divider{
    display: none;
  }
  .home__items {
    grid-template-columns: repeat(2, minmax(140px, 140px));
    justify-content: center;
    padding: 10px;
  }
  .item__img{
    width: 133px;
  }
}

</style>
