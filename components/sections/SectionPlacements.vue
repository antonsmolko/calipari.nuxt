<template lang='pug'>
  section.tm-placements.uk-section.uk-section-large.uk-section-default
    .uk-container.uk-container-large
      .tm-placements__title.uk-width-xlarge
        h2.uk-heading-small Фотообои для&nbsp;Вашего интерьера
        .uk-divider-small
      .uk-grid(data-uk-grid)
        .uk-width-1-1(class='uk-width-1-4@s uk-width-medium@l')
          .tm-tab__container
            ul.uk-tab-left(data-uk-tab='connect: #component-tab-left; animation: uk-animation-fade; media: @s')
              li(v-for="placement in placements" :key="placement.id")
                a.uk-h4(href='') {{ placement.title }}
        .uk-width-expand
          ul.uk-switcher(id='component-tab-left')
            li(v-for="placement in placements" :key="placement.id")
              .tm-placements__item.uk-position-relative.uk-dark
                .tm-placements__background.uk-background-cover(:data-src="placement.image" data-uk-img)
                div(class='uk-visible@s')
                  button.uk-position-absolute.uk-transform-center(style='left: 20%; top: 30%' type='button' data-uk-marker)
                  .uk-width-large(data-uk-drop='mode: click')
                    .uk-card.uk-card-small.uk-card-body.uk-card-default.uk-box-shadow-medium
                      .uk-card-media-top
                        img(src='/img/main/materials/material-1-ovrl.jpg' alt='')
                    //- .tm-placements__card.uk-card.uk-card-secondary.uk-card-body.uk-box-shadow-medium(class='uk-visible@s')
                    //-     h3.uk-h4= placement.cardTitle
                    //-     p= placement.cardText
                .tm-placements__card.uk-card.uk-card-secondary.uk-card-body.uk-box-shadow-medium
                  h3.uk-h4 {{ placement.cardTitle }}
                  p {{ placement.cardText }}
</template>
<script>
export default {
  data () {
    return {
      placements: [
        {
          id: 1,
          title: 'Спальня',
          cardTitle: 'Фотообои для спальни',
          cardText: 'Здесь Вы увидите разнообразные фотообои для спальни. Свежее, оригинальное решение, которое обязательно будет приносить Вам радость каждый раз, когда Вы будете смотреть на него, утром и вечером.',
          image: '/img/main/placements/bedroom.jpg'
        },
        {
          id: 2,
          title: 'Гостиная',
          cardTitle: 'Фотообои для гостиной',
          cardText: 'Здесь Вы увидите разнообразные фотообои для спальни. Свежее, оригинальное решение, которое обязательно будет приносить Вам радость каждый раз, когда Вы будете смотреть на него, утром и вечером.',
          image: '/img/main/placements/living-room.jpg'
        },
        {
          id: 3,
          title: 'Кабинет',
          cardTitle: 'Фотообои для кабинета',
          cardText: 'Здесь Вы увидите разнообразные фотообои для спальни. Свежее, оригинальное решение, которое обязательно будет приносить Вам радость каждый раз, когда Вы будете смотреть на него, утром и вечером.',
          image: '/img/main/placements/cabinet.jpg'
        },
        {
          id: 4,
          title: 'Детская',
          cardTitle: 'Фотообои для детской',
          cardText: 'Здесь Вы увидите разнообразные фотообои для спальни. Свежее, оригинальное решение, которое обязательно будет приносить Вам радость каждый раз, когда Вы будете смотреть на него, утром и вечером.',
          image: '/img/main/placements/childrens-room.jpg'
        },
        {
          id: 5,
          title: 'Столовая',
          cardTitle: 'Фотообои для столовой',
          cardText: 'Здесь Вы увидите разнообразные фотообои для спальни. Свежее, оригинальное решение, которое обязательно будет приносить Вам радость каждый раз, когда Вы будете смотреть на него, утром и вечером.',
          image: '/img/main/placements/dinning-room.jpg'
        },
        {
          id: 6,
          title: 'Прихожая',
          cardTitle: 'Фотообои для прихожей',
          cardText: 'Здесь Вы увидите разнообразные фотообои для спальни. Свежее, оригинальное решение, которое обязательно будет приносить Вам радость каждый раз, когда Вы будете смотреть на него, утром и вечером.',
          image: '/img/main/placements/hall.jpg'
        }
      ]
    }
  }
}
</script>
