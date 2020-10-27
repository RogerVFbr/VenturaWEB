<template>

    <div id="message-floater-container" class="container">
        <div class="row">
            <div class="col-sm-8"></div>
            <div class="col-sm-4">
                <div id="system-messages" class="purple darken-3">
                    <p class="center-align"><strong><u>Mensagens do sistema</u></strong></p>
                    <p class="center-align">{{message}}</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "MessageFloater",
        props: {
            message: {}
        }
    }
</script>

<style scoped>

    #message-floater-container {
        position: absolute;
    }


    #system-messages {
        border-radius: 0.25rem;
        width: 100%;
        margin-top: 20px;
        padding: 10px 10px 1px 10px;
        z-index: 1000;
        position: relative;
        /*top: 80px;*/
        text-align-all: center;
        opacity: 0;
        /*right: 0px;*/
        animation-name: fadeIn;
        animation-duration: 6s;
        animation-delay: .7s;
        animation-fill-mode: forwards;
        visibility: hidden;
        /*display: none;*/
    }


    #system-messages p {
        line-height: 24px;
        color: white;
    }

    @keyframes fadeIn {
        0% {
            visibility: visible;
            opacity: 0;
            transform: scale(.95);
            -webkit-transform: scale(.95);
            box-shadow: 0px 0px 10px 2px rgba(255, 255, 255, 0.1);
        }
        30% {
            opacity: 1;
            transform: scale(1);
            -webkit-transform: scale(1);
            box-shadow: 0px 0px 40px 2px rgba(255, 255, 255, 0.5);
        }
        70% {
            opacity: 1;
            transform: scale(1);
            -webkit-transform: scale(1);
            box-shadow: 0px 0px 10px 2px rgba(255, 255, 255, 0.5);
        }
        100% {
            opacity: 0;
            transform: scale(.95);
            -webkit-transform: scale(.95);
            box-shadow: 0px 0px 5px 2px rgba(255, 255, 255, 0.1);
        }

        /*from {*/
        /*    opacity: 0;*/
        /*    !*bottom: 30px;*!*/
        /*    right: 1000px;*/
        /*    transform: scale(.8);*/
        /*    -webkit-transform: scale(.8);*/
        /*}*/
        /*to {*/
        /*    opacity: 1;*/
        /*    !*bottom: 40px;*!*/
        /*    !*right: 0px;*!*/
        /*    transform: scale(1);*/
        /*    -webkit-transform: scale(1);*/
        /*}*/
    }


</style>
