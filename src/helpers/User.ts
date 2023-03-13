export class User {
    username: string;
    email: string;
    password: string;
    age?: number | undefined | null;
  
    constructor(username: string, email: string, password: string, age?:number) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.age = age;
    }
  
    changePassword(newPassword: string): void {
      this.password = newPassword;
    }
    changeEmail(newEmail: string): void {
        this.email = newEmail;
    }
    getUsername(): string {
        return this.email;
    }
  }
  