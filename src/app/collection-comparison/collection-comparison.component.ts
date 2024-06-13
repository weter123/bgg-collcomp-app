import { Component } from '@angular/core';
import { Ratingpair } from '../ratingpair';
import { BoardgameService } from '../boardgame.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collection-comparison',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './collection-comparison.component.html',
  styleUrl: './collection-comparison.component.css'
})
export class CollectionComparisonComponent {

  boardGame: any;
  collection1 :any;
  collection2: any;
  gameData1: Map<string,string>;
  gameData2: Map<string,string>;
  matchingList:  Ratingpair[] = [];
  player1: string = '';
  player2: string ='';



  constructor(private bggService: BoardgameService) { 
    this.gameData1 = new Map<string,string>();
    this.gameData2 = new Map<string,string>();

  }

  async ngOnInit(): Promise<void> {
   
  }

  loadMatchingList() {
    console.log(this.player1)
    if (!this.player1 || !this.player2) {
      console.error('Both player names are required');
      return;
    }
    this.bggService.getBoardGameCollection(this.player1).subscribe((data : any) => {
      this.collection1 = data.items.item.filter(this.checkRating);
      this.collection1.forEach((item: any) => this.gameData1.set(item.name._, item.stats.rating.value));
      console.log(this.collection1);
      
      this.bggService.getBoardGameCollection(this.player2).subscribe((data : any) => {
        this.collection2 = data.items.item.filter(this.checkRating);
        this.collection2.forEach((item: any) => this.gameData2.set( item.name._, item.stats.rating.value) )
        console.log(this.collection2)
        
      });
    });
    setTimeout( () => {
      this.gameData1.forEach((P1Rating, GameName) => {
        if (this.gameData2.has(GameName)) {
          const P2Rating = this.gameData2.get(GameName);
          this.matchingList.push({ GameName, P1Rating, P2Rating });
        }
      });
      console.log(this.matchingList)  
    },500)
    
}
  private checkRating(item: any) : boolean{
      return item.stats.rating.value !== 'N/A' ;
  }
}
