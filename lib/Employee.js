// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email, role='Employee'){
        this.name = name
        this.id = id
        this.email = email
        this.role
    }
    getName(){return this.name}
    getID(){return this.id}
    getEmail(){return this.email}
    getRole(){return this.role}
}

module.exports = Employee