import Person from './Person.js';

export default class Employee extends Person {
    constructor(id, name, address, email, role, workDays, dailySalary) {
        super(id, name, address, email, role);
        this.workDays = workDays;
        this.dailySalary = dailySalary;
        this.role=role
    }

    calculateSalary() {
        return this.workDays * this.dailySalary;
    }
}
// export default Employee;
