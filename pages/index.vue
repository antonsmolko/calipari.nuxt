<template lang="pug">
    Page
        template(#main)
            main
                home-hero-section
                SectionAlbums
                home-textures-section
                home-watch-section
                home-interiors-section(
                    v-if="interiors.length"
                    :items="interiors")
                SectionConsultation
                //SectionTopics
                SectionAdvantages
                home-purchase-steps-section(
                    v-if="purchaseSteps.length"
                    :items="purchaseSteps")
</template>
<script>
import { mapState } from 'vuex'
import Page from '@/components/layout/Page.vue'
import HomeHeroSection from '@/components/Home/HomeHeroSection.vue'
import SectionAlbums from '@/components/sections/SectionAlbums.vue'
import SectionMaterials from '@/components/sections/SectionMaterials.vue'
import SectionPlacements from '@/components/sections/SectionPlacements.vue'
import SectionConsultation from '@/components/sections/SectionConsultation.vue'
import SectionTopics from '@/components/sections/SectionTopics.vue'
import SectionAdvantages from '@/components/sections/SectionAdvantages.vue'
import HomeTexturesSection from '@/components/Home/HomeTexturesSection'
import HomeWatchSection from '@/components/Home/HomeWatchSection'
import HomeInteriorsSection from '@/components/Home/HomeInteriorsSection'
import HomePurchaseStepsSection from '@/components/Home/HomePurchaseStepsSection'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import scrollToTarget from '@/components/mixins/scrollToTarget'

export default {
  components: {
    Page,
    HomeHeroSection,
    SectionAlbums,
    SectionMaterials,
    SectionPlacements,
    SectionConsultation,
    SectionTopics,
    SectionAdvantages,
    HomeTexturesSection,
    HomeWatchSection,
    HomeInteriorsSection,
    HomePurchaseStepsSection
  },
  mixins: [setLayout, scrollToTop, scrollToTarget],
  metaInfo () {
    return {
      title: this.page.long_title,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.page.description
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: this.page.keywords
        }
      ]
    }
  },
  async fetch ({ store }) {
    await Promise.all([
      store.dispatch('home/getPurchaseSteps'),
      store.dispatch('home/getInteriors'),
      store.dispatch('pages/getItem', 'home')
    ])
  },
  computed: {
    ...mapState({
      purchaseSteps: state => state.home.purchaseSteps,
      interiors: state => state.home.interiors,
      page: state => state.pages.fields,
      scrollTo: state => state.scrollTo
    })
  },
  created () {
    this.setFieldsAction({
      topBar: false,
      bottomBar: true,
      pageTitle: this.page.title
    })
  }
}
</script>
