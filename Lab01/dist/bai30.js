"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.School = void 0;
class School {
    constructor() {
        this.students = [];
        this.teachers = [];
    }
    addStudent(student) {
        this.students.push(student);
    }
    addTeacher(teacher) {
        this.teachers.push(teacher);
    }
    displayInfo() {
        console.log("Students:");
        this.students.forEach(student => {
            console.log(`- ${student.name}, Age: ${student.age}, GPA: ${student.grade}`);
        });
        console.log("Teachers:");
        this.teachers.forEach(teacher => {
            console.log(`- ${teacher.name}, Age: ${teacher.age}, Subject: ${teacher.subject}`);
        });
    }
}
exports.School = School;
