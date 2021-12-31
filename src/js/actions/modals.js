import Form from './form'

class Modal {
    open(id) {
        document.getElementById(id).classList.add('show')
        document.body.style.overflow = 'hidden'
    }
    close() {
        Form.clear()
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show')
        })
        document.body.style = ''
    }
}

export default new Modal()