import Person from './Person.js';

export default class Student extends Person {
    constructor(id, name, address, email, role, mathScore, physicsScore, chemistryScore) {
        super(id, name, address, email, role);
        this.mathScore = mathScore;
        this.physicsScore = physicsScore;
        this.chemistryScore = chemistryScore;
        this.role = role
    }

    calculateAverageScore() {
        return (this.mathScore + this.physicsScore + this.chemistryScore) / 3;
    }
}
// export default Student;