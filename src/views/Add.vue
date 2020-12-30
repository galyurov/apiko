<template>
  <div class="container">
    <div class="card">
      <form action="" @submit.prevent="submitHandler">
        <div class="card__wrap">
          <div class="card__title">
            Add product
          </div>
          <div class="form__field">
            <input v-model.trim="title"
                   type="text" id="title" class="form__input validate" placeholder="For example: Iron man suit">
            <label class="form__label" for="title">Title</label>
            <span class="required">*</span>
          </div>
          <div class="form__field">
            <input type="text" v-model.trim="location"
                   id="fullName" class="form__input validate" placeholder="For example: Los Angeles, CA">
            <label class="form__label" for="fullName">Location</label>
            <span data-info="location" class="required">*</span>
          </div>
          <div class="form__field">
          <textarea type="text" v-model.trim="description"
                    id="description" class="form__input text__area" placeholder="For example: Iron man suit"></textarea>
            <label class="form__label" for="fullName">Description</label>
          </div>
          <div class="form__field">
            <div ref="imageBlock" class="form__input image__input">
              <div @click="openFileWatcher" class="add__img">
                <svg width="38px" height="38px" viewBox="0 0 38 38" version="1.1" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                  <title>Add Photo</title>
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Rectangle-3.1" transform="translate(0.000000, 17.000000)" fill="#349A89" fill-rule="nonzero">
                      <rect id="Rectangle"
                            transform="translate(19.000000, 2.000000) rotate(-90.000000) translate(-19.000000, -2.000000) "
                            x="17" y="-17" width="4" height="38" rx="2"></rect>
                    </g>
                    <g id="Rectangle-3.1"
                       transform="translate(19.000000, 19.000000) rotate(90.000000) translate(-19.000000, -19.000000) translate(0.000000, 17.000000)"
                       fill="#349A89" fill-rule="nonzero">
                      <rect id="Rectangle"
                            transform="translate(19.000000, 2.000000) rotate(-90.000000) translate(-19.000000, -2.000000) "
                            x="17" y="-17" width="4" height="38" rx="2"></rect>
                    </g>
                  </g>
                </svg>
              </div>
              <div class="imgWrap" v-for="(img,index) in images" :key="index">
                <img class="imgFromInput" :src='img' alt="">
              </div>

              <input @change="addPhoto" multiple ref="photoInput" class="photoInput" type="file" id="file">
            </div>
            <label class="form__label">Photos</label>
          </div>
          <div class="form__field">
            <input type="text" v-model.trim="price"
                   id="price" class="form__input" placeholder="For example: $594">
            <label class="form__label" for="fullName">Price</label>
          </div>
          <div class="form__action">
            <button type="submit" class="form__btn form__submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Add",
  data() {
    return {
      title: '',
      location: '',
      description: '',
      price: '',
      like:false,
      images: []
    }

  },
  methods: {
    openFileWatcher() {
      this.$refs.photoInput.click()
    },
    addPhoto() {
      let handleFiles = async (files) => {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];

          if (!file.type.startsWith('image/')) {
            continue
          }
          var img = document.createElement("img");
          img.file = file;
          var reader = new FileReader();
          reader.onload = ((aImg) => {
            return (e) => {
              aImg.src = e.target.result;
              this.$set(this.images, this.images.length, e.target.result)
            };
          })(img);
          reader.readAsDataURL(file);
        }
      }
      handleFiles(this.$refs.photoInput.files)
    },
    submitHandler() {
      const params = {
        title: this.title,
        location: this.location,
        description: this.description,
        price: this.price,
        images: this.images,
        like:this.like
      }
      this.$store.dispatch('saveProduct', params)
      .then(()=>{
        this.clearForm()
      })

    },
    clearForm() {
      this.images = []
      this.title = ''
      this.location = ''
      this.description = ''
      this.price = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1136px;
  margin: 0 auto;
  font-family: Helvetica;

  padding-bottom: 95px;
}

.card {
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 2px 42px rgba(0, 0, 0, 0.111233);
  border-radius: 7px;
  margin-top: 34px;
  padding-top: 36px;

  &__title {
    font-size: 22px;
    line-height: 25px;
    text-align: center;
    color: #282828;
    margin-bottom: 42px;
  }

  &__wrap {
    max-width: 664px;
    margin: 0 auto;
    padding: 0 10px;
  }
}

.form__field {
  position: relative;
  display: flex;
  flex-direction: column;
}

.form__input {
  background: #F9FAFB;
  border: 1px solid #DEDEE0;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 19px 41px 21px 13px;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.4px;
  margin-bottom: 33px;

  &::placeholder {
    color: rgba(102, 102, 102, 0.466455);
  }

}

.text__area {
  height: 183px;
  resize: none;

  &::placeholder {
    color: rgba(102, 102, 102, 0.466455);
  }
}
.form__label {
  position: absolute;
  top: -15px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #303030;
}

.required {
  position: absolute;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  top: -17px;
  left: 36px;
  color: #FF0000;

  &[data-info='location'] {
    left: 65px
  }

}

.add__img {
  width: 92px;
  height: 92px;
  background: #E4E4E4;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 2px;
}

.image__input {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
}

.form__btn {
  width: 377px;
  background: #349A89;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.4px;
  padding: 19px 29px 21px;
  margin-top: 16px;
  margin-bottom: 32px;
  color: #FFFFFF;
}

.form__action {
  display: flex;
  justify-content: center;
}

.photoInput {
  display: none;
}

.imgWrap {
  width: 92px;
  height: 92px;
  display: flex;
  align-items: center;
  margin: 0 2px
}

.imgFromInput {
  width: 100%;
}
</style>