<template lang="pug">
    page
        template(#main)
            main
                home-hero-section
                section-albums
                home-textures-section
                home-watch-section
                home-interiors-section(
                    v-if="interiors.length"
                    :items="interiors")
                home-consultation-section(
                  :page="page.title")
                //section-topics
                section-advantages
                home-purchase-steps-section(
                  v-if="purchaseSteps.length"
                  :items="purchaseSteps")
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Page from '@/components/layout/Page.vue'
import HomeHeroSection from '@/components/Home/HomeHeroSection.vue'
import SectionAlbums from '@/components/sections/SectionAlbums.vue'
import SectionMaterials from '@/components/sections/SectionMaterials.vue'
import SectionPlacements from '@/components/sections/SectionPlacements.vue'
import HomeConsultationSection from '@/components/Home/HomeConsultationSection.vue'
import SectionTopics from '@/components/sections/SectionTopics.vue'
import SectionAdvantages from '@/components/sections/SectionAdvantages.vue'
import HomeTexturesSection from '@/components/Home/HomeTexturesSection'
import HomeWatchSection from '@/components/Home/HomeWatchSection'
import HomeInteriorsSection from '@/components/Home/HomeInteriorsSection'
import HomePurchaseStepsSection from '@/components/Home/HomePurchaseStepsSection'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import scrollToTarget from '@/components/mixins/scrollToTarget'
import pageMeta from '@/components/mixins/pageMeta'

export default {
  components: {
    Page,
    HomeHeroSection,
    SectionAlbums,
    SectionMaterials,
    SectionPlacements,
    HomeConsultationSection,
    SectionTopics,
    SectionAdvantages,
    HomeTexturesSection,
    HomeWatchSection,
    HomeInteriorsSection,
    HomePurchaseStepsSection
  },
  mixins: [setLayout, scrollToTop, scrollToTarget, pageMeta],
  async fetch () {
    await Promise.all([
      this.getPurchaseStepsAction(),
      this.getInteriorsAction(),
      this.getPageAction('home')
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
  },
  methods: {
    ...mapActions({
      getPurchaseStepsAction: 'home/getPurchaseSteps',
      getInteriorsAction: 'home/getInteriors'
    })
  }
}
</script>
