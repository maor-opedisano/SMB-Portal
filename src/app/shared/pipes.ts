/**
* Created by if_found_call_0586288454 on 27/04/2017 ap. J.-C..
*/
import { Pipe, PipeTransform, Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Pipe({ name: 'DictionaryIteratorPipe', pure: false })
export class DictionaryIteratorPipe implements PipeTransform {
  transform(value: any, showKeyAndValue?: boolean): any {
    if (showKeyAndValue) {
      const arr = [];
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          arr.push({ 'key': key, 'value': value[key] });
        }
      };
      return arr;
    } else {
      return Object.keys(value).map(key => value[key]);
    }
  }
}

@Pipe({ name: 'getPercentage' })
export class GetPercentagePipe implements PipeTransform {
  transform(value: number, total: number, args: number[]): any {
    if (!value || total < 1) {
      return value;
    }
    return Math.round((value / total) * 100);
  }
}

@Pipe({ name: 'ArrayLength' })
export class ArrayLengthPipe implements PipeTransform {

  transform(arr: any[]): number {
    if (!arr) {
      return 0;
    }
    return arr.length;
  }
}
@Pipe({ name: 'RemainingItems' })
export class RemainingItemsInArrayPipe implements PipeTransform {

  transform(arr: any[], substractor: number): number {
    if (!(arr && substractor)) {
      return 0;
    }
    return (arr.length - substractor);
  }
}

