import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

    personChange = new Subject<string[]>();
    persons: string[];

    constructor(private httpClient: HttpClient) {}

    fetchPersons(){
        this.httpClient.get<any>('https://swapi.dev/api/people').pipe().subscribe(responseData => {
            console.log(responseData);
        })
    }

    addPerson(name: string) {
        this.persons.push(name);
        this.personChange.next(this.persons);
    }
    removePerson(name: string){
        this.persons = this.persons.filter(person => {return person !== name});
        this.personChange.next(this.persons);
        console.log(this.persons);
    }
}