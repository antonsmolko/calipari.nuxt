<template lang="pug">
    .tm-orders__item.uk-box-shadow-medium
        .tm-orders__header.uk-flex.uk-flex-middle
            span.tm-orders__number.tm-text-medium.uk-margin-right.uk-text-emphasis {{ order.number }}
            button.uk-button.tm-button-success.uk-button-small(
                v-if="order.status.alias === 'confirmed'"
                @click="onPay") Оплатить
            .tm-orders__more.uk-margin-auto-left.uk-inline
                button.uk-icon(data-uk-icon="more-vertical")
                .tm-orders__dropdown(
                    data-uk-dropdown="animation: uk-animation-slide-right-small")
                    ul.uk-nav.uk-dropdown-nav
                        li: nuxt-link.uk-link(:to="`/profile/orders/${order.number}`") Подробнее
                        li: a.uk-link(
                            href="/profile/orders/cancel"
                            v-if="order.status.alias === 'processing' || order.status.alias === 'confirmed'"
                            @click.prevent="onCancel") Отменить
        .tm-orders__info
            .tm-orders__info-item
                span.tm-orders__info-heading.uk-text-muted Дата
                span.tm-orders__info-value.uk-text-emphasis {{ order.date }}
            .tm-orders__info-item
                span.tm-orders__info-heading.uk-text-muted Статус
                span.tm-orders__info-value.uk-text-emphasis
                    span.uk-label.uk-label-danger(v-if="order.status.alias === 'canceled'") {{ order.status.title }}
                    span.uk-label.uk-label-success(v-else-if="order.status.alias === 'completed'") {{ order.status.title }}
                    span(v-else) {{ order.status.title }}
            .tm-orders__info-item
                span.tm-orders__info-heading.uk-text-muted Доставка
                span.tm-orders__info-value.uk-text-emphasis {{ order.delivery.title }}
            .tm-orders__info-item
                span.tm-orders__info-heading.uk-text-muted Оплата
                span.tm-orders__info-value.uk-text-emphasis Безналичный расчет
            .tm-orders__info-item
                span.tm-orders__info-heading.uk-text-muted Цена
                span.tm-orders__info-value.tm-orders__price.uk-text-emphasis {{ formatPrice }}
        .tm-orders__thumbs.uk-margin-top.uk-position-relative.uk-visible-toggle(
            v-if="order.items.length"
            data-uk-slider="finite: true"
            tabindex="-1")
            ul.uk-slider-items.uk-grid.uk-grid-small(data-uk-lightbox="animation: slide")
                li(v-for="(item, index) in order.items" :key="index")
                    a.uk-inline.uk-transition-toggle(
                        :data-caption="getDataCaption(item)"
                        :href="item.image_path")
                        img.uk-box-shadow-small(
                            :data-src="item.thumb_path"
                            :alt="item.article"
                            data-uk-img)
</template>

<script>
import { getFormatPrice } from '~/helpers'

export default {
  name: 'OrderListItem',
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  computed: {
    formatPrice () {
      return getFormatPrice(this.order.price)
    }
  },
  methods: {
    getDataCaption (item) {
      /* eslint-disable */
      return `
        Изображение: ${item.article} |
        Ширина: ${item.width} см |
        Высота: ${item.height} см |
        Фактура: «${item.texture}» |
        Эффекты: ${item.filter} |
        Цена: ${getFormatPrice(item.price)}`
      /* eslint-enable */
    },
    onPay () {
      this.$emit('pay', this.order.hash_number)
    },
    onCancel () {
      this.$emit('cancel', this.order.number)
    }
  }
}
</script>

<style lang="scss">
.tm-orders {
    &__item {
        background: $background-smoke;
        padding: $global-margin $global-small-gutter;
        overflow: hidden;
        &:not(:last-child) {
            margin-bottom: $global-small-gutter;
        }
        .uk-light & {
            background: $inverse-background-smoke;
        }
        @include media-desk($s) {
            margin-left: -$global-small-gutter;
            margin-right: -$global-small-gutter;
        }
        @include media-mob($s) {
            padding: $global-margin;
            &:not(:last-child) {
                margin-bottom: $global-margin;
            }
        }
        @include media-mob($s) {
            padding: $global-gutter;
            &:not(:last-child) {
                margin-bottom: $global-medium-margin;
            }
        }
    }
    &__header {
        margin-bottom: $global-margin;
    }
    &__number {
        min-width: 80px;
    }
    &__more {
        > button {
            position: relative;
            z-index: 1;
        }
    }
    &__dropdown {
        min-width: 165px;
        top: -22px !important;
        right: -$global-small-gutter !important;
        left: inherit !important;
        margin: 0;
        background: $overlay-default-background;
        z-index: 0;
        padding: $global-small-gutter $global-medium-margin $global-small-gutter $global-margin;
        .uk-light & {
            background: $overlay-primary-background;
        }
        @include media-mob($s) {
            min-width: 220px;
            top: -33px !important;
            right: -30px !important;
            padding: $global-gutter $global-gutter * 2 $global-gutter $global-gutter;
        }
    }
    &__info {
        width: 100%;
        border-top: 1px solid $global-border;
        border-bottom: 1px solid $global-border;
        padding: $global-small-gutter 0;
        .uk-light & {
            border-top: 1px solid $inverse-global-border;
            border-bottom: 1px solid $inverse-global-border;
        }
        &-item {
            display: flex;
            &:not(:last-child) {
                margin-bottom: 5px;
            }
            @include media-mob($m) {
                flex-direction: column;
                &:not(:last-child) {
                    margin-bottom: 0;
                }
            }
        }
        &-heading {
            min-width: 100px;
            padding-right: $global-small-margin;
            line-height: 1.3;
            box-sizing: border-box;
        }
        &-value {
            flex-grow: 1;
            padding-right: $global-small-margin;
            line-height: 1.3;
        }
        @include media-mob($m) {
            display: flex;
            justify-content: space-between;
            &-heading {
                width: auto;
                padding-right: 0;
            }
            &-value {
                margin-top: 5px;
                line-height: 30px;
                padding-right: 0;
            }
        }
    }
    &__price {
        line-height: 1;
        font-size: $global-large-font-size;
        @include media-mob($m) {
            font-size: 1.2rem;
            line-height: 28px;
        }
    }
    &__thumbs {
        margin-right: -$global-small-gutter;
        li {
            height: 120px;
            > a {
                height: inherit;
                img {
                    height: 100%;
                    width: auto;
                }
            }
            &:last-child {
                padding-right: $global-small-gutter;
            }
        }
        @include media-mob($s) {
            margin-right: -$global-gutter;
            li {
                &:last-child {
                    padding-right: $global-gutter;
                }
            }
        }
    }
}
</style>
