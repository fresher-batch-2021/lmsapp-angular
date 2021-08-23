import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchterm'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
    if(!items) return [];
    if(!searchTerm) return items;
    console.log('Category Pipe:' , searchTerm);
    return items.filter( it => {
     return it.doc.name.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1  ||
      it.doc.role.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) != -1;
    });
  }


}
