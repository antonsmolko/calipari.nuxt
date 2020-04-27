<template lang="pug">
    InputNotificationLayer(:name="name")
        | {{ $validationLib({ field_name: name }).ALIAS }}
</template>

<script>
import InputNotificationLayer from '~/components/form/input-notifications/InputNotificationLayer'

export default {
  components: { InputNotificationLayer },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
