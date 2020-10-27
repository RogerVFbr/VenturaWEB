import User from "../core/User";

export default class UserService {

    // static user = new User(
    //     1,
    //     '',
    //     'CANDIDATO',
    //     '',
    //     '',
    // )

    static user = new User(
        6,
        'Test Empresa',
        'EMPRESA',
        '',
        '',
    )

    // static user

    static getUser() {
        return this.user
    }

    static setUser(user) {
        if (user instanceof User) {
            this.user = user
        }
        else {
            console.error('User data structure does not comply.');
        }
    }

    static logout() {
        this.user = null
    }
}
