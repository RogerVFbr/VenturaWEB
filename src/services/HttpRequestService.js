export default class HttpRequestService {

    static async getOnPath(path) {
        fetch(path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
            .catch(err => {
                console.error('Failed retrieving data : ' + err);
            })
    }

}
