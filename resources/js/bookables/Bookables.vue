<template>
    <div>
        <div v-if="loading"> Data is loading....</div>
        <div class = "container" v-else>
            <div class="row" v-for="row in rows" :key="'row' + row">
                <div class="col d-flex align-items-stretch" v-for="(bookable,index) in bookablesInRow(row)" :key="'row'+row+index">
                    <!-- <bookable-list-item class="col-sm"
                    :item-title="bookable.title"
                    :item-content ="bookable.description"
                    :price = "1000"
                    >
                    </bookable-list-item> -->
                     <bookable-list-item class="col-sm"
                    v-bind = bookable
                    >
                    </bookable-list-item>
                </div> 
                <div class="col" v-for="poo in placeholderInRows(row)" :key="'p' + poo"></div>
            </div>
        </div>
        
        <!-- <bookable-list-item v-if="bookable2" :item-title="bookable2.title" :item-content ="bookable2.content" :price = "2000"></bookable-list-item>
        <bookable-list-item v-if="bookable3" :item-title="bookable3.title" :item-content ="bookable3.content" :price = "2000"></bookable-list-item> -->
    </div>
</template>

<script>
import BookableListItem from "./BookableListItem"
export default {
    components:{
        BookableListItem
    },
    data() {
        return {
            // bookable1 : {
            //     'title' : "Hannah 1",
            //     'content' : "Part 1 hannah's tape stories"
            // },
            // bookable2 : {
            //     'title' : "Hannah 2",
            //     'content' : "Part 2 hannah's tape stories"
            // }
            bookables: null,
            loading : false,
            columns: 3
        }
    },
    created() {
        this.loading = true;

        //Promise example
        // const p = new Promise(function(resolve, reject) {
        //     // console.log(resolve);
        //     // console.log(reject);

        //     setTimeout(() => {
        //         resolve("poo")
        //         // reject("poo")
        //     }, 2000);
        // })
        // .then(result => "helloo first "+ result)
        // .then(result => console.log(result))
        // .catch(result => console.log(`Error ${result}`));

        // console.log(p)


        // setTimeout(() => {
        //     this.bookables = [{
        //         title : "New cheap villa",
        //         content : "content for New cheap villa"
        //     }, 
        //     {
        //         title : "second New cheap villa",
        //         content : "content for New cheap villa"
        //     },
        //     {
        //         title : "third New cheap villa",
        //         content : "content for New cheap villa"
        //     },
        //     {
        //         title : "1 New cheap villa",
        //         content : "content for New cheap villa"
        //     },
        //     {
        //         title : "2 New cheap villa",
        //         content : "content for New cheap villa"
        //     },
        //     {
        //         title : "3 New cheap villa",
        //         content : "content for New cheap villa"
        //     },
        //     {
        //         title : "3 New cheap villa",
        //         content : "content for New cheap villa"
        //     },
            
        //     ];
            
        //     this.loading = false;
        // }, 4000);



        const request = axios.get("/api/bookables").then(response => {
            this.bookables = response.data.data
            this.loading = false;
        }).catch(response => console.log(response));
    },
    computed: {
        rows() {
            return this.bookables && Math.ceil(this.bookables.length / this.columns)
        }
    },
    methods: {
        bookablesInRow(row) {
            return this.bookables.slice((row - 1) * this.columns, row * this.columns)
        },
        placeholderInRows(row) {
            return this.columns - this.bookablesInRow(row).length
        }
    },
}
</script>