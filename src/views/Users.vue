<template>

    <div class="content">

        <filter-bar :isLoading="isLoading"
                    :callback="loadData"
                    :visible="!entryMode.active && !showNewUserContainer"
        />

        <log-cards-container :data="reckonData"
                             :bucketUrl="bucket_url"
                             :callback="selectEntry"
                             :visible="!entryMode.active && !showNewUserContainer"

        />

        <entry-mode-container :data="entryMode.data"
                              :bucketUrl="bucket_url"
                              :callback="setEntryModeInactive"
                              :visible="entryMode.active && !showNewUserContainer"
        />

        <floating-action-button :show="showFloatingButton"
                                :onclick="setShowAddContainer"
        />

        <new-user-container :onSave="onNewUserSave"
                            :onClose="onAddContainerClose"
                            :visible="showNewUserContainer"
        />

    </div>

</template>

<script>

    import FilterBar from '@/components/FilterBar.vue'
    import LogCardsContainer from '@/components/LogCardsContainer.vue'
    import EntryModeContainer from '@/components/EntryModeContainer.vue'
    import FloatingActionButton from '@/components/FloatingActionButton.vue'
    import NewUserContainer from '@/components/NewUserContainer.vue'
    import { ADMIN_ENDPOINT_URL } from "../sensitivedata/aws";
    import { bucketUrl } from "../sensitivedata/aws";
    import { API_KEY } from "../sensitivedata/aws";

    export default {
        name: "users",
        components: {
            FilterBar,
            LogCardsContainer,
            EntryModeContainer,
            FloatingActionButton,
            NewUserContainer
        },
        mounted() {
            M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'))
        },
        data() {
            return {
                bucket_url: bucketUrl,
                isLoading: false,
                showFloatingButton: true,
                showNewUserContainer: false,
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
                fetch(ADMIN_ENDPOINT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': API_KEY
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
                this.showFloatingButton = false;
            },
            setEntryModeInactive: function () {
                this.entryMode.active = false;
                this.showFloatingButton = true;
            },
            setShowAddContainer: function () {
                this.showFloatingButton = false;
                this.showNewUserContainer = true;
            },
            onNewUserSave: function () {
                this.showNewUserContainer = false;
                this.showFloatingButton = true;
                this.loadData();
            },
            onAddContainerClose: function () {
                this.showNewUserContainer=false;
                this.showFloatingButton = true;
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
