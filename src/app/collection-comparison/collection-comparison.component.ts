import { Component } from '@angular/core';
import { Ratingpair } from '../ratingpair';
import { BoardgameService } from '../boardgame.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection-comparison',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection-comparison.component.html',
  styleUrl: './collection-comparison.component.css'
})
export class CollectionComparisonComponent {

  boardGame: any;
  collection1 :any;
  collection2: any;
  idList : any;
  gameData1: Map<string,string>;
  gameData2: Map<string,string>;
  matchingList:  Ratingpair[] = [];
  player1: string | undefined;
  player2: string | undefined;



  constructor(private bggService: BoardgameService) { 
    this.gameData1 = new Map<string,string>();
    this.gameData2 = new Map<string,string>();

  }

  async ngOnInit(): Promise<void> {
    this.player1= 'noobcitizen'
    this.bggService.getBoardGameCollection(this.player1).subscribe(data => {
      this.collection1 = data.items.item.filter(this.checkRating);
      this.collection1.forEach((item: any) => this.gameData1.set(item.name._, item.stats.rating.value) )
      console.log(this.collection1)
    });

    this.player2 = 'pasturemaster'
    this.bggService.getBoardGameCollection(this.player2).subscribe(data => {
      this.collection2 = data.items.item.filter(this.checkRating);;
      this.collection2.forEach((item: any) => this.gameData2.set( item.name._, item.stats.rating.value) )
      console.log(this.collection2)
      
    });
  }

  loadMatchingList() {
    this.gameData1.forEach((value1, key) => {
      if (this.gameData2.has(key)) {
        const value2 = this.gameData2.get(key);
        this.matchingList.push({ key, value1, value2 });
      }
    });
    console.log(this.matchingList)  
    
}
  private checkRating(item: any) : boolean{
      return item.stats.rating.value !== 'N/A' ;
  }
}