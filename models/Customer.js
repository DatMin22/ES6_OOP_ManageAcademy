import Person from './Person.js';
export default class Customer extends Person {
    constructor(id, name, address, email, role, companyName, orderValue, rating) {
        super(id, name, address, email, role);
        this.companyName = companyName;
        this.orderValue = orderValue;
        this.rating = rating;
        this.role = role;
    }
}
//  Customer;