<template>
    <div class="container">
        <div class="title">
            <h1>הוסף מוצר</h1>
            <hr>
        </div>
        <div class="form-container">
            <form @submit.prevent="addProduct" class="form">
                <label for="name">שם המוצר</label>
                <input type="text" id="name" v-model="product.productName" required>

                <label for="price">מחיר:</label>
                <input type="number" id="price" v-model="product.productPrice" required>

                <label for="link">קישור למוצר:</label>
                <input type="url" id="link" v-model="product.productLink" required>

                <label for="description">תיאור:</label>
                <textarea id="description" v-model="product.productDescription" required></textarea>

                <label for="image">קישור לתמונה:</label>
                <input type="url" id="image" v-model="product.productUrlImage" required>

                <!-- <label for="category">קטגוריה:</label>
                <select id="category" v-model="product.categories" multiple required>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{
                category.categoryName }}</option>
                </select> -->

                <label for="category">קטגוריה:</label>
                <multiselect v-model="product.categories" :options="categories" :multiple="true" track-by="id"
                    label="categoryName" placeholder="בחר קטגוריות" required></multiselect>

                <button type="submit">הוסף מוצר</button>
            </form>

            <h2>הוסף קטגוריה חדשה</h2>
            <form @submit.prevent="addCategory" class="form">
                <label for="categoryName">שם הקטגוריה:</label>
                <input type="text" id="categoryName" v-model="newCategory.categoryName" required>

                <label for="categoryDescription">תיאור הקטגוריה:</label>
                <textarea id="categoryDescription" v-model="newCategory.categoryDescription" required></textarea>

                <button type="submit">הוסף קטגוריה</button>
            </form>
        </div>
    </div>
</template>

<script>
import apiService from '../services/api-service.js'; // ייבוא של שירות ה-API
import Alert from '../services/sweetAlert-service.js'; // ייבוא של שירות ה-Alert
import Multiselect from 'vue-multiselect'
export default {
    components: { Multiselect },
    data() {
        return {
            product: {
                productName: '',
                productPrice: 0,
                productLink: '',
                productDescription: '',
                productUrlImage: '',
                categories: [],
            },
            categories: [],
            newCategory: {
                categoryName: '',
                categoryDescription: ''
            }
        };
    },
    methods: {
        async addProduct() {
            // הופך את המערך של הקטגוריות למערך של אובייקטים
            const categories = this.product.categories.map(category => ({ id: category.id }));

            // צור את המוצר עם הקטגוריות החדשות
            const product = { ...this.product, categories };
            console.log(product);
            await apiService.postData('products', product)
                .then(data => {
                    console.log('Product added:', data);
                    Alert.success('המוצר נוסף בהצלחה', 'המוצר נוסף למאגר המוצרים');
                })
                .catch(error => {
                    console.error('Error:', error);
                    Alert.error('שגיאה בהוספת המוצר', 'נסה שוב מאוחר יותר');
                });
        },
        async addCategory() {
            await apiService.postData('products/categories', this.newCategory)
                .then(data => {
                    console.log('Product added:', data);
                    Alert.success('הקטגוריה נוספה בהצלחה', `מספר הקטגוריה החדשה הוא: ${data.data.id}`);
                })
                .catch(error => {
                    console.error('Error:', error);
                    Alert.error('שגיאה בהוספת המוצר', 'נסה שוב מאוחר יותר');
                });
        }
    },
    mounted() {
        // קבלת הקטגוריות מהשרת
        apiService.getData('Products/categories')
            .then(data => {
                this.categories = data.data;
                console.log(this.categories);
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.error('שגיאה בטעינת הקטגוריות', 'נסה שוב מאוחר יותר');
            });
    }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<!-- <style src="vue-multiselect/dist/vue-multiselect.min.css"></style> -->
<style scoped>
.container {
    width: 80%;
    margin: auto;
}

.title {
    text-align: center;
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form {
    width: 100%;
    max-width: 500px;
    margin-bottom: 2rem;
}

.form label {
    font-weight: bold;
}

.form input,
.form textarea,
.form select {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
}

.form button {
    padding: 0.5rem 1rem;
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
}

.form button:hover {
    background-color: #0056b3;
}
</style>