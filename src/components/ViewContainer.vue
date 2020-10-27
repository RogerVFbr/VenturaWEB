<template>
    <div class="container" :class="{ 'bypass-horizontal-padding': inner }">
        <div class="view-container" :class="{ 'view-contrast-background': !inner, 'view-light-background': inner, 'view-margin-top': !inner }">
            <div v-if="title" class="view-container-title" :class="{ 'title-contrast-background': !titleOpaqueBackground, 'title-opaque-background': titleOpaqueBackground }">
                <p>{{title}}</p>
            </div>
            <div v-if="!inner" class="view-container-horizontal-margin"></div>

            <div class="view-container-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ViewContainer",
        props: {
            title: {},
            titleOpaqueBackground: {},
            inner: {}
        }
    }
</script>

<style scoped>

    .view-container {
        border-radius: 0.25rem;
        /*margin-top: 20px;*/
        padding-bottom: 20px;
        padding-left: 0px;
        padding-right: 0px;
    }

    .view-container-title {
        border-radius: 0.25rem 0.25rem 0rem 0rem;
        align-content: center;
        margin-bottom: 0;
        height: 48px;
    }

    .view-contrast-background {
        background-color: rgba(255, 255, 255, 0.1)
    }

    .view-light-background {
        background-color: rgba(255, 255, 255, 0.025)
    }

    .view-margin-top {
        margin-top: 20px;
    }

    .title-contrast-background {
        background-color: rgba(255, 255, 255, 0.1)
    }

    .title-opaque-background {
        background-color: rgba(255, 255, 255, 0)
    }

    .bypass-horizontal-padding {
        padding-right: 0 !important;
        padding-left: 0 !important;
    }

    .view-container-title p {
        color: white;
        opacity: 0.7;
        font-size: 1.1rem;
        text-align: center;
        vertical-align: middle;
        line-height: 48px;
        font-weight: bold;
        margin-bottom: 0 !important;
    }

    .view-container-content {
        margin-left: 20px;
        margin-right: 20px;
    }

    .view-container-horizontal-margin {
        /*background-color: green;*/
        height: 20px;
    }

    @media only screen and (max-width: 575px) {
        .view-container {
            margin-left: 0 !important;
            margin-right: 0 !important;
        }
        .view-container-content {
            margin-left: 0px;
            margin-right: 0px;
        }
        .container {
            padding-right: 0px;
            padding-left: 0px;
        }
    }

</style>
