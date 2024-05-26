import swal from 'sweetalert';

export default {
    classic(msg){
        swal(msg);
    },
    success(title, msg = ""){
    swal(title, msg, "success");
    },
    error(title, msg = ""){
    swal(title, msg, "error");
    },
    info(title, msg = ""){
    swal(title, msg, "info");
    }
};


