<template lang="pug">
  section.tm-topics.uk-section.uk-section-large.uk-section-default
    .uk-container.uk-container-large
      h2.uk-heading-small Темы
      .uk-divider-small
      .uk-margin-large-top(data-uk-grid)
        .uk-width-1-1(class="uk-width-1-4@s uk-width-medium@l")
          .tm-tab__container
            ul.uk-tab-left(data-uk-tab="connect: #component-tab-left; animation: uk-animation-fade; media: @s")
              li(v-for="topic in topics" :key="topic.id")
                a.uk-h4(href="") {{ topic.title }}
        .uk-width-expand
          ul.uk-switcher(id="component-tab-left")
            li(v-for="topic in topics" :key="topic.id")
              .uk-grid-small(class="uk-child-width-1-2 uk-child-width-1-3@m uk-child-width-1-4@l" data-uk-grid="masonry: true")
                div(v-for="(image, index) in topic.images" :key="index")
                  .tm-card__image.uk-card.uk-card-small.uk-card-secondary.uk-box-shadow-medium
                    .uk-card-media-top.uk-transition-toggle
                      img(:src="image" alt="")
                    .uk-card-body.uk-flex.uk-flex-between.uk-flex-middle
                      h3.uk-card-title.uk-margin-remove 000234
                      .tm-card__image-likes
                        span.tm-card__image-likes-count 57
                        span.uk-icon(data-uk-icon="icon: heart-fill; ratio: 0.8")
</template>
<script>
export default {
  data () {
    return {
      topics: [
        {
          id: 1,
          title: 'Мегаполис',
          images: [
            '/img/main/topics/megapolice/A0010.jpg',
            '/img/main/topics/megapolice/A0032.jpg',
            '/img/main/topics/megapolice/A0037.jpg',
            '/img/main/topics/megapolice/A0045.jpg',
            '/img/main/topics/megapolice/A0116.jpg',
            '/img/main/topics/megapolice/A0135.jpg',
            '/img/main/topics/megapolice/A0217.jpg',
            '/img/main/topics/megapolice/A0238.jpg',
            '/img/main/topics/nature/E0390.jpg',
            '/img/main/topics/nature/F0034.jpg'
          ]
        },
        {
          id: 2,
          title: 'Природа',
          images: [
            '/img/main/topics/nature/E0284.jpg',
            '/img/main/topics/nature/F0084.jpg',
            '/img/main/topics/nature/E0287.jpg',
            '/img/main/topics/nature/E0289.jpg',
            '/img/main/topics/nature/E0304.jpg',
            '/img/main/topics/nature/E0380.jpg',
            '/img/main/topics/nature/E0390.jpg',
            '/img/main/topics/nature/F0034.jpg',
            '/img/main/topics/nature/E0390.jpg',
            '/img/main/topics/nature/F0034.jpg'
          ]
        },
        {
          id: 3,
          title: 'Живопись',
          images: [
            '/img/main/topics/megapolice/A0010.jpg',
            '/img/main/topics/megapolice/A0032.jpg',
            '/img/main/topics/megapolice/A0037.jpg',
            '/img/main/topics/megapolice/A0045.jpg',
            '/img/main/topics/megapolice/A0116.jpg',
            '/img/main/topics/megapolice/A0135.jpg',
            '/img/main/topics/megapolice/A0217.jpg',
            '/img/main/topics/megapolice/A0238.jpg'
          ]
        },
        {
          id: 4,
          title: 'Города',
          images: [
            '/img/main/topics/nature/E0284.jpg',
            '/img/main/topics/nature/F0084.jpg',
            '/img/main/topics/nature/E0287.jpg',
            '/img/main/topics/nature/E0289.jpg',
            '/img/main/topics/nature/E0304.jpg',
            '/img/main/topics/nature/E0380.jpg',
            '/img/main/topics/nature/E0390.jpg',
            '/img/main/topics/nature/F0034.jpg'
          ]
        },
        {
          id: 5,
          title: 'Живопись',
          images: [
            '/img/main/topics/megapolice/A0010.jpg',
            '/img/main/topics/megapolice/A0032.jpg',
            '/img/main/topics/megapolice/A0037.jpg',
            '/img/main/topics/megapolice/A0045.jpg',
            '/img/main/topics/megapolice/A0116.jpg',
            '/img/main/topics/megapolice/A0135.jpg',
            '/img/main/topics/megapolice/A0217.jpg',
            '/img/main/topics/megapolice/A0238.jpg'
          ]
        },
        {
          id: 6,
          title: 'Города',
          images: [
            '/img/main/topics/nature/E0284.jpg',
            '/img/main/topics/nature/F0084.jpg',
            '/img/main/topics/nature/E0287.jpg',
            '/img/main/topics/nature/E0289.jpg',
            '/img/main/topics/nature/E0304.jpg',
            '/img/main/topics/nature/E0380.jpg',
            '/img/main/topics/nature/E0390.jpg',
            '/img/main/topics/nature/F0034.jpg'
          ]
        }
      ]
    }
  }
}
</script>
