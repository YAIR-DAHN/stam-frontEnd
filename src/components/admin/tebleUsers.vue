<template>

  <div class="Title">
    <h1>משתמשים</h1>
    <hr>
  </div>
  <!-- The AG Grid component -->

  <!-- תיבת חיפוש מהיר, לעיין בהמשך -->
  <!-- <div class="example-header">
                    <span>Quick Filter:</span>
                    <input type="text" id="filter-text-box" placeholder="Filter..." v-on:input="onFilterTextBoxChanged()">
                </div> -->


  <ag-grid-vue style="height: 500px" class="ag-theme-alpine-auto-dark" :rowData="rowData" :columnDefs="colDefs"
    :undoRedoCellEditing=true :undoRedoCellEditingLimit=20 editType='fullRow' enableRtl=true>
  </ag-grid-vue>



</template>

<script>
import { ref } from 'vue';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme
import { AgGridVue } from "ag-grid-vue3"; // Vue Grid Logic

import apiService from '../services/api-service.js'; // ייבוא של שירות ה-API
import Alert from '../services/sweetAlert-service.js'; // ייבוא של שירות ה-Alert
export default {
  name: "App",
  components: {
    AgGridVue, // Add AG Grid Vue3 component
  },
  setup() {


    // Row Data: מכיל נתונים להצגה.
    const rowData = ref([]);

    const fetchUsers = async () => {
      try {
        const response = await apiService.getData('users', "")
        rowData.value = response.data
      }
      catch (error) {
        console.error('Error:', error);
        Alert.error('שגיאה בטעינת המשתמשים', 'יתכן ואין לך הרשאה / השרת אינו זמין');
      }
    }



    fetchUsers()

    // יצירת תיבת חיפוש מהיר, לעיין בהמשך.
    //       const gridApi = ref();
    // const onFilterTextBoxChanged = () => {
    //       gridApi.value.setGridOption(
    //         'quickFilterText',
    //         document.getElementById('filter-text-box').value
    //       );
    //     };
    //     const onGridReady = (params) => {
    //       gridApi.value = params.api;

    //       const updateData = (data) => (rowData.value = data);

    //       fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //         .then((resp) => resp.json())
    //         .then((data) => updateData(data));
    //     };





    // Column Definitions: Defines & controls grid columns.
    const colDefs = ref([
      {
        field: "userFirstName", filter: 'agSetColumnFilter', editable: true,
        headerComponentParams: { displayName: "שם משתמש" },
        valueSetter: params => {
          params.data.userFirstName = params.newValue;
          upData(params.data);
          return true;
        }
      },
      // {
      //   field: "userLastName", filter: 'agSetColumnFilter', editable: true,
      //   headerComponentParams: {displayName: "שם משפחה"},
      //   valueSetter: params => {
      //     params.data.userLastName = params.newValue;
      //     upData(params.data);
      //     return true;
      //   }
      // },
      {
        field: "userPhone", filter: 'agSetColumnFilter', editable: true,
        headerComponentParams: { displayName: "טלפון" },
        valueSetter: params => {
          params.data.userPhone = params.newValue;
          upData(params.data);
          return true;
        }
      },
      {
        field: "userEmail", filter: 'agSetColumnFilter', editable: true,
        headerComponentParams: { displayName: "מייל" },
        valueSetter: params => {
          params.data.userEmail = params.newValue;
          upData(params.data);
          return true;
        }
      },


      {
        field: "userRole", filter: 'agNumberColumnFilter', editable: true,
        headerComponentParams: { displayName: "סוג משתמש" },
        valueSetter: params => {
          params.data.userRole = params.newValue;
          upData(params.data);
          return true;
        }
      },
      {
        field: "createdAt", filter: 'agNumberColumnFilter', editable: false,
        headerComponentParams: { displayName: "תאריך הצטרפות" },
        valueSetter: params => {
          params.data.createdAt = params.newValue;
          upData(params.data);
          return true;
        }
      },



    ]);
    const upData = async (data) => {
      try {
        const response = await apiService.putData(`users/admin/${data.id}`, data)
        console.log(response)
        Alert.success('המשתמש עודכן בהצלחה', 'המשתמש עודכן בהצלחה');
      }
      catch (error) {
        console.error('Error:', error);
        Alert.error('שגיאה בעדכון המשתמש', 'נסה שוב מאוחר יותר');
      }
    }

    return {
      rowData,
      colDefs,

    };
  },
};
</script>
<style scoped>
/* body{
 background-color: aliceblue;
 background: fixed;
} */
</style>