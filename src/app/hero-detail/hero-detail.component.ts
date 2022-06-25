import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero?: Hero;
  constructor(private route: ActivatedRoute, private messageService: MessageService, private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');

    let slips: any = localStorage.getItem("slips");
    let slipsList: [] = JSON.parse(slips);

    this.hero = slipsList.find((slip) => {
      if (slip.id == id) 
        return slip;
    })

    this.messageService.add(`HeroService : fetched advice id = ${id}`)
  }

  goBack(): void {
    this.location.back();
  }
}
