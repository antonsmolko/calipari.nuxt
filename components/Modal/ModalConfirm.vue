<template lang="pug">
    div(data-uk-modal :id="id")
        .uk-modal-dialog.uk-modal-body
            slot
                p Вы уверены?
            p.uk-text-right
                button.uk-button.uk-button-default.uk-modal-close(type='button' @click="onCancel") {{ cancelText }}
                button.uk-button.uk-button-primary.uk-modal-close(type='button' @click="onSave") {{ saveText }}
</template>

<script>
export default {
  name: 'ModalConfirm',
  props: {
    id: {
      type: String,
      required: true
    },
    cancelText: {
      type: String,
      default: 'Отменить'
    },
    saveText: {
      type: String,
      default: 'Применить'
    }
  },
  methods: {
    onCancel () {
      this.$emit('cancel')
    },
    onSave () {
      this.$emit('save')
    }
  }
}
</script>

<style lang="scss">

</style>
