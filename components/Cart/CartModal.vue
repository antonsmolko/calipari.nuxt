<template lang="pug">
  modal-confirm(
    id="cart-modal-delete"
    saveText="Удалить"
    @cancel="onCancel"
    @save="onSave")
    p.uk-text-large Вы уверены, что хотите удалить позицию?
</template>

<script>
import ModalConfirm from '../Modal/ModalConfirm'

export default {
  name: 'CartModal',
  components: { ModalConfirm },
  methods: {
    onCancel () {
      this.$emit('cancelDelete')
    },
    onSave () {
      this.$emit('applyDelete')
    }
  }
}
</script>
