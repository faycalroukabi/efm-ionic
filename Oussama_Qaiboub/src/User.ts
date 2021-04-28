/**
 * Created by Oussama_Qaiboub on 15/04/2021.
 */

/*const User = {
    id: null,
    name: null,
    email: null,
    image: null,
    get: () => {
        return {
            id: User.id,
            name: User.name,
            email: User.email,
            image: User.image
        };
    },
    set: (data: any) => {
        User.id = data.id ? data.id : User.id;
        User.name = data.name ? data.id : User.name;
        User.email = data.email ? data.id : User.email;
        User.image = data.image ? data.id : User.image;
    }
};
export default User;*/

export class UserModel {

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    id: number;
    name: string;
    email: string;
    image: string;

}
