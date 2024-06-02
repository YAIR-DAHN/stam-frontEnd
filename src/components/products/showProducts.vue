<template>

    <div class="Title">
        <h1>מוצרים מומלצים</h1>
        <hr>
    </div>
    <div>
        <div id="searchContiner">
            <input type="text" v-model="search" placeholder="חפש מוצר">
        </div>
        <div id="slectCategore">
        <div v-for="category in categories" :key="category.id" >
            <button @click="search = category.categoryName">{{ category.categoryName }}</button>
        </div>
    </div>
        <div class="card-grid">
            <!-- <div v-for="product in products" :key="product.id" class="card"> -->
            <div v-for="product in filteredProducts" :key="product.id" class="card">
                <div class="imgContiner">
                    <img :src="product.productUrlImage" :alt="product.productName" class="product-image"
                        v-if="product.productUrlImage" />
                    <img src="https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
                        alt="no Image" class="product-image" v-if="!product.productUrlImage" />

                </div>
                <h3>{{ product.productName }} </h3>
                <div class="descriptionContiner">
                    <text-clamp :text="product.productDescription" :max-lines='2' />
                </div>
                <p>{{ product.productPrice }} ₪</p>
                <button @click="openProductModal(product)">הצג מוצר</button>
                <!-- <vue-final-modal name="product-modal" v-model="isModalOpen">
                    <h1>מחנינינ</h1>
                    <p>חנניניינני</p>
                    <p>חמחחמח</p>
                    <button @click="closeModal">סגור</button>
                </vue-final-modal> -->
            </div>
        </div>
    </div>
</template>

<script>
// import { VueFinalModal } from 'vue-final-modal'
import apiService from '../services/api-service.js';
import Alert from '../services/sweetAlert-service.js';
// import { ModalsContainer } from 'vue-final-modal'

export default {
    //   components: {
    //     VueFinalModal,
    //     ModalsContainer
    //   },
    data() {
        return {
            products: [],
            modalProduct: {},
            isModalOpen: false,
            search: '',
            categories: [],
        };
    },
    computed: {
    filteredProducts() {
        if (this.search) {
            return this.products.filter(product => {
                if (product.productName.includes(this.search)) {
                    return true;
                }

                // Check if any of the product's categories include the search string
                for (let category of product.categories) {
                    if (category.category.categoryName.includes(this.search)) {
                        return true;
                    }
                }

                // If neither the product name nor the categories include the search string, exclude the product
                return false;
            });
        } else {
            return this.products;
        }
    }
},
    mounted() {
        this.fetchProducts();
        this.fetchCategories();
    },
    methods: {
        async fetchProducts() {

            await apiService.getData('products', "")
                .then(data => {
                    console.log('Products:', data);
                    this.products = data.data;
                })
                .catch(error => {
                    console.error('Error:', error);
                    Alert.error('שגיאה בטעינת המוצרים', 'נסה שוב מאוחר יותר');
                });
        },
        async fetchCategories() {
            await apiService.getData('products/categories', "")
                .then(data => {
                    console.log('Categories:', data);
                    this.categories = data.data;
                })
                .catch(error => {
                    console.error('Error:', error);
                    Alert.error('שגיאה בטעינת הקטגוריות', 'נסה שוב מאוחר יותר');
                });
        },
        openProductModal(product) {
            this.modalProduct = product;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        }
    }
};
</script>

<style>
#searchContiner {
    display: flex;
    justify-content: center;
    margin: 20px;
}

#searchContiner input[type="text"] {
    padding: 10px;
    width: 50%; 
    border-radius: 20px; 
    border: 1px solid #ccc; 
    font-size: 16px; 
    transition: border-color 0.3s ease; /* הוספת אנימציה לשינוי צבע הגבול */
}

#searchContiner input[type="text"]:focus {
    border-color: #808080; /* שינוי צבע הגבול בעת מיקוד */
    outline: none; /* הסרת ההדגשה הכחולה של הדפדפן בעת מיקוד */
}
#slectCategore{
    display: flex;
    justify-content: center;
    
}

#slectCategore button {
    padding: 10px 20px; 
    border-radius: 20px; 
    /* background-color: #808080;  */
    color: white; 
    border: none; 
    font-size: 14px; 
    transition: background-color 0.3s ease; /* הוספת אנימציה לשינוי צבע */
}

#slectCategore button:hover {
    background-color: #84a6f7; /* שינוי צבע בעת העברת העכבר */
}

#slectCategore button:active {
    background-color: #4d4d4d; /* שינוי צבע בעת לחיצה */
}

#slectCategore {
    justify-content: space-around; /* הפצה שווה של הכפתורים ברחבי המסך */
    flex-wrap: wrap; /* שורות מרובות של כפתורים אם יש יותר מדי להתאים לשורה אחת */
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* 3 עמודות במסכים גדולים */
    grid-gap: 10px;
}

.imgContiner {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.descriptionContiner {
    height: 80px;
    overflow: hidden;
}

@media (max-width: 768px) {
    .card-grid {
        grid-template-columns: repeat(2, 1fr);
        /* 2 עמודות במסכי טלפון */
    }
}

.card {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}

.product-image {
    width: 100%;
    height: auto;
}
</style>
