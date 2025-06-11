import { Component, OnInit } from "@angular/core";
import { PersonService } from "./person.service";


@Component({
    selector: 'app-person-input',
    templateUrl: './person-input.component.html',
    styleUrls: ['./person-input.component.css']
})

export class PersonInputComponent implements OnInit{

    enteredPersonName = '';

    constructor(private personService: PersonService){}

    onCreatePerson(){
        console.log('Person created ' + this.enteredPersonName); 
        this.personService.addPerson(this.enteredPersonName);
        this.enteredPersonName = '';
    }
    ngOnInit(){
        
    }
} 