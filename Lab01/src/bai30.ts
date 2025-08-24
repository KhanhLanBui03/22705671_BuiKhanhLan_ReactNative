import { Student } from "./bai2";
import { Teacher } from "./bai27";

export class School {
    students: Student[];
    teachers: Teacher[];

    constructor() {
        this.students = [];
        this.teachers = [];
    }

    addStudent(student: Student) {
        this.students.push(student);
    }

    addTeacher(teacher: Teacher) {
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