<template lang="pug">
    client-only
        .tm-navbar.tm-bottombar.uk-position-bottom.uk-position-fixed.uk-light(class="uk-hidden@l")
            .uk-navbar-container
                .uk-container
                    div(data-uk-navbar)
                        slot
</template>
