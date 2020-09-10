<template lang="pug">
  .tm-upload
    label.tm-upload__label.tm-background__smoke.uk-box-shadow-medium
      img.tm-upload__background(src="/img/bg/square.png" alt="")
      i.tm-upload__icon.uk-icon.uk-position-center(data-uk-icon="icon:cloud-upload; ratio:1.5")
      input.tm-upload__input(
        type="file"
        id="file"
        ref="file"
        accept="image/*"
        @change="handleChange")
</template>

<script>
export default {
  name: 'UploadInput',
  props: {
    maxFileSize: {
      type: Number,
      default: 10
    }
  },
  methods: {
    async handleChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return null
      }

      await this.createImage(files[0])

      // this.file = this.$refs.file.files[0]
      // const reader = new FileReader()
      // reader.addEventListener('load', function () {
      //   this.showPreview = true
      //   this.imagePreview = reader.result
      // }.bind(this), false)
      // if (this.file) {
      //   if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
      //     reader.readAsDataURL(this.file)
      //   }
      // }
    },
    createImage (file) {
      const validation = this.validate(file)

      if (!validation.status) {
        this.$emit('failed', validation)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        this.$emit('change', {
          preview: {
            name: file.name,
            size: file.size,
            content: e.target.result
          },
          file
        })
      }
      console.log(file)

      reader.readAsDataURL(file)
    },
    validate (file) {
      if (!file) {
        return {
          status: false,
          message: 'Ошибка загрузки файла!'
        }
      }

      if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
        return {
          status: false,
          message: 'Неправильный формат файла!'
        }
      }

      if (file.size > this.maxFileSize * 1048576) {
        return {
          status: false,
          message: `Превышен максимально допустимый размер файла ${this.maxFileSize} МБ!`
        }
      }

      return { status: true }
    }
  }
}
</script>

<style lang="scss">
.tm-upload {
  &__label {
    position: relative;
    display: flex;
    width: 100%;
    min-width: 50px;
    min-height: 50px;
  }
  &__background {
    width: 100%;
    height: auto;
    display: block;
    opacity: 0;
  }
  &__icon {
    display: block;
    margin: auto;
  }
  &__input {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
