import Swal from 'sweetalert2'
export default {
  setup () {
    /**
     * sweetAlert 彈跳視窗，此為 success Icon。顯示為正上方中間。
     * @param {String} message 彈跳視窗內要顯示的訊息。
     */
    function swalSuccess (message) {
      Swal.fire({
        icon: 'success',
        title: message,
        position: 'top',
        showConfirmButton: false,
        timer: 2000
      })
    }

    return { swalSuccess }
  }
}
