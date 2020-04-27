<template lang="pug">
  main
    SectionHero
    SectionAlbums
    //SectionMaterials
    //SectionQuickOrder
    //SectionPlacements
    SectionConsultation
    //SectionTopics
    SectionAdvantages
    SectionOrderInstruction
</template>
<script>
import SectionHero from '~/components/sections/SectionHero.vue'
import SectionAlbums from '~/components/sections/SectionAlbums.vue'
import SectionMaterials from '~/components/sections/SectionMaterials.vue'
import SectionQuickOrder from '~/components/sections/SectionQuickOrder.vue'
import SectionPlacements from '~/components/sections/SectionPlacements.vue'
import SectionConsultation from '~/components/sections/SectionConsultation.vue'
import SectionTopics from '~/components/sections/SectionTopics.vue'
import SectionAdvantages from '~/components/sections/SectionAdvantages.vue'
import SectionOrderInstruction from '~/components/sections/SectionOrderInstruction.vue'
import setLayout from '~/components/mixins/setLayout'

export default {
  components: {
    SectionHero,
    SectionAlbums,
    SectionMaterials,
    SectionQuickOrder,
    SectionPlacements,
    SectionConsultation,
    SectionTopics,
    SectionAdvantages,
    SectionOrderInstruction
  },
  mixins: [setLayout],
  metaInfo () {
    return {
      title: 'Главная'
    }
  },
  created () {
    this.setFieldsAction({
      topBar: false,
      bottomBar: true,
      pageTitle: 'Главная'
    })
  }
}
</script>
