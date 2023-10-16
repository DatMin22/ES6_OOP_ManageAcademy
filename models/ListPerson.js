// import Customer from "./Customer";
// import Student from "./Student";
// import Employee from "./Employee";
class ListPerson {
    constructor() {
        this.persons = [];
    }

    addPerson(person) {
        this.persons.push(person);
    }

    removePersonById(id) {
        this.persons = this.persons.filter(person => person.id !== id);
    }

    updatePersonById(id, updatedPerson) {
        this.persons = this.persons.map(person => {
            if (person.id === id) {
                return updatedPerson;
            }
            return person;
        });
    }

    sortByName() {
        this.persons.sort((a, b) => a.name.localeCompare(b.name));
    }

    filterByType(type) {
        return this.persons.filter(person => person instanceof type);
    }
}
export default ListPerson;


