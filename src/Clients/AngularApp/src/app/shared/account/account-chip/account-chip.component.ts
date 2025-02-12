import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'oidc-client-ts';

@Component({
  selector: 'app-account-chip',
  templateUrl: './account-chip.component.html',
  styleUrl: './account-chip.component.scss'
})
export class AccountChipComponent implements OnInit {
  private _authorNameSurname: string = 'Anonimous';
  currentUser: User | null = null;
  @Input()
  get authorNameSurname(): string {
    return this._authorNameSurname!;
  }
  set authorNameSurname(value: string) {
    if (value && value.length > 0) {
      var isNameOnly = !value.includes(' ');
      this.shortAuthorName = isNameOnly ? 
        value.split(' ').map(word => word[0].toUpperCase()).join('') :
        value[0].toUpperCase() + value[1].toUpperCase();
      this._authorNameSurname = value; 
    }
  }
  shortAuthorName: string = 'A';
  constructor(private router: Router) {
  }
  ngOnInit(): void {
    
  }
  toMasterAccount(){
    if(this.authorNameSurname == 'Mikalai Sabaleuski'){
      this.router.navigate(['/master-account']);
    }
   }
}
