import { Component, OnDestroy, OnInit } from "@angular/core";
import { PersonService } from "./person.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-persons',
    templateUrl: './persons.component.html',
})
export class PersonsComponent implements OnInit, OnDestroy {
    
    private personlistSud : Subscription;
    personsList: string[]
    // private personService: PersonService;

    constructor(private personService: PersonService){
        // this.personsList = personService.persons;
        // this.personService = personService
    }
    ngOnInit(){
        this.personService.fetchPersons();
        this.personlistSud = this.personService.personChange.subscribe(person => {
            this.personsList = person;
        })
    }
    onRemovePerson(personName: string){
        this.personService.removePerson(personName);
    }
    ngOnDestroy(): void {
        this.personlistSud.unsubscribe();
    }
}