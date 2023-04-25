
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

export async function ServerErrorAlert() {
    return (
        MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong'
        })
    )
}

export async function CustomErrorAlert( message ) {
    return (
        MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message
        })
    )
}

