export default class VagaFormService {

    static content = {
        shortDescription: '',
        longDescription: '',
        city: '',
        state: '',
        type: 'CLT',
        timeSpan: '',
        expirationDate: ''
    }

    static getContent() {
        return this.content
    }

    static setContent(data) {
        this.content = data
    }

    static initializeContent() {
        this.content = {
            shortDescription: '',
            longDescription: '',
            city: '',
            state: '',
            type: 'CLT',
            timeSpan: '',
            expirationDate: ''
        }
    }

}
