<template>

    <div class="productTitle">
        <h1>מוצרים מומלצים</h1>
        <!-- <progressBar></progressBar> -->

        <!-- <Button @click="show = true">
            Open Modal
        </Button>

        <ModalConfirm v-model="show" title="Hello World!" @confirm="() => confirm()">
            <p>The content of the modal</p>
        </ModalConfirm> -->
        <hr>

    </div>
    <ModalsContainer />
    <div>
        <div class="card-grid">
            <div v-for="product in products" :key="product.id" class="card">
                <div class="imgContiner">
                    <img :src="product.productUrlImage" alt="Product Image" class="product-image" />
                </div>
                <h3>{{ product.productName }} </h3>
                <div class="descriptionContiner">
                    <text-clamp :text="product.productDescription" :max-lines='2' />
                </div>
                <p>{{ product.productPrice }} ₪</p>
                <button @click="openProductModal(product)">הצג מוצר</button>
                <vue-final-modal name="product-modal" v-model="isModalOpen">
                    <h1>מחנינינ</h1>
                    <p>חנניניינני</p>
                    <p>חמחחמח</p>
                    <button @click="closeModal">סגור</button>
                </vue-final-modal>
            </div>
        </div>
    </div>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'
import apiService from '../services/api-service.js';
import Alert from '../services/sweetAlert-service.js';
import { ModalsContainer } from 'vue-final-modal'

export default {
  components: {
    VueFinalModal,
    ModalsContainer
  },
    data() {
        return {
            products: [],
            modalProduct: {},
            isModalOpen: false
        };
    },
    mounted() {
        this.fetchProducts();
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
        // openProductModal(product) {
        //     // Implement the logic to open the product modal with full details
        //     // You can use a library like Vue Modal or create your own modal component
        //     console.log('Open product modal:', product);
        // },
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
.productTitle {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 20px;
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
