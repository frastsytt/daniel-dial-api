"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(username, email, password, age) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.age = age;
    }
    changePassword(newPassword) {
        this.password = newPassword;
    }
    changeEmail(newEmail) {
        this.email = newEmail;
    }
    getUsername() {
        return this.email;
    }
}
exports.User = User;
