import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  APIBaseUrl = "https://api.adviceslip.com/advice/";

  searchQuery = "People";
  searchResults = {
    query: "",
    slips: [{
      date: ""
    }],
    total_results: ""
  };
  isLoading = false;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.isLoading = true;
    fetch(this.APIBaseUrl + `search/${this.searchQuery}`)
    .then(response => response.json()).then(
      (result) => (
        this.searchResults = result,
        localStorage.setItem("slips", JSON.stringify(result.slips)),
        this.isLoading = false
      )
    );
  }

  onEnter() {
    if (this.searchQuery.length == 0) {
      this.messageService.add('Please input the searching query!');
      return;
    }
    this.search();
  }
}
