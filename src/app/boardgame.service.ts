import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { bufferCount, concatMap, delay, map, mergeMap } from 'rxjs/operators';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class BoardgameService {
  private boardGameUrl = 'https://www.boardgamegeek.com/xmlapi2/thing?id=';
  private collectionUrl = 'https://api.geekdo.com/xmlapi/collection/';
  constructor(private http: HttpClient) { }

  getBoardGame(id: string): Observable<any> {
    return this.http.get(`${this.boardGameUrl}${id}`, { responseType: 'text' })
      .pipe(
        map(response => this.parseXML(response))
      );
  }

  getBoardGameCollection(userName: string): Observable<any> {
    return this.http.get(`${this.collectionUrl}${userName}`, { responseType: 'text' })
      .pipe(
        map(response => this.parseXML(response))
      );
  }

  private parseXML(data: string): any {
    let parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
    let result;
    parser.parseString(data, (err, res) => {
      result = res;
    });
    return result;
  }
}
