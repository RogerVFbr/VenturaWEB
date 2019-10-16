<template>

    <div class="content">

        <filter-bar :isLoading="isLoading"
                    :callback="loadData"
                    :visible="!entryMode.active"
        />

        <log-cards-container :data="reckonData"
                             :bucketUrl="bucket_url"
                             :callback="selectEntry"
                             :visible="!entryMode.active"

        />

        <entry-mode-container :data="entryMode.data"
                              :bucketUrl="bucket_url"
                              :callback="setEntryModeInactive"
                              :visible="entryMode.active"
        />

<!--        <div class="fixed-action-btn">-->
<!--            <a class="btn-floating btn-large red">-->
<!--                <i class="large material-icons">mode_edit</i>-->
<!--            </a>-->
<!--            <ul>-->
<!--                <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>-->
<!--                <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>-->
<!--                <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>-->
<!--                <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>-->
<!--            </ul>-->
<!--        </div>-->

        <floating-action-button :show="true"
                                :onclick="navigateToAdd"/>

    </div>

</template>

<script>

    import FilterBar from '@/components/FilterBar.vue'
    import LogCardsContainer from '@/components/LogCardsContainer.vue'
    import EntryModeContainer from '@/components/EntryModeContainer.vue'
    import FloatingActionButton from '@/components/FloatingActionButton.vue'
    import { apiUrl } from "../sensitivedata/aws";
    import { bucketUrl } from "../sensitivedata/aws";
    import { apiKey } from "../sensitivedata/aws";

    export default {
        name: "users",
        components: {
            FilterBar,
            LogCardsContainer,
            EntryModeContainer,
            FloatingActionButton
        },
        mounted() {
            M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'))
        },
        data() {
            return {
                bucket_url: bucketUrl,
                isLoading: false,
                reckonData: [],
                entryMode: {
                    active: false,
                    data: {}
                }
            }
        },
        methods: {
            loadData: function (request) {
                this.isLoading = true;
                this.reckonData = [];
                request.command = 'collections';
                request.table = '';
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey
                    },
                    body: JSON.stringify(request)
                })
                    .then(response => response.json())
                    .then(data => {
                        data.payload.sort((a, b) => (a.time > b.time) ? 1 : -1 )
                        this.reckonData = data.payload;
                        this.isLoading = false;
                    })
                    .catch(err => {
                        console.error('Failed retrieving data : ' + err);
                        this.isLoading = false;
                    })
            },
            selectEntry: function (entry) {
                this.entryMode.data = entry;
                this.entryMode.active = true;
            },
            setEntryModeInactive() {
                this.entryMode.active = false;
            }
        }
    }

</script>


<style scoped>

    .content {
        margin-top: 20px;
        padding-bottom: 50px;
        width: 100%;
    }

</style>
