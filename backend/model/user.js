const db =require('../util/database')

module.exports = class User {
    constructor(firstName,lastName,otherNames,country,email,telephoneNumber,password){
        this.firstName=firstName;
        this.lastName=lastName;
        this.otherNames=otherNames;
        this.country=country;
        this.email=email;
        this.telephoneNumber=telephoneNumber;
        this.password=password;

    }

    static find(email){
        return db.execute('SELECT * FROM users WHERE email = ?', [email])
    }

    //Save User
    static save(user){
        return db.execute(
           "INSERT INTO users (`first name`, `last name`, `other names`, `country`, `email`, `telephone number`, `password`) VALUES(?,?,?,?,?,?,?)", [user.firstName,user.lastName,user.otherNames,user.country,user.email,user.telephoneNumber,user.password] //Accepts values as a String to deter SQL injection.
        )
    }
}