import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { PreferencesService } from 'src/app/shared/services/preferences.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {

  //images = ['../../../assets/Images/Preferences/s1.png', '../../../assets/Images/Preferences/l1.jpg', '../../../assets/Images/Preferences/c1.jpg']
  loveImages = ['../../../assets/Images/Preferences/love/jedzenie.jpg','../../../assets/Images/Preferences/love/rzezba.jpg',
                '../../../assets/Images/Preferences/love/kino.jpg','../../../assets/Images/Preferences/love/film.jpg',
                '../../../assets/Images/Preferences/love/rower.jpg','../../../assets/Images/Preferences/love/spacer.jpg',]

  sportImage = ['../../../assets/Images/Preferences/sport/basen.jpg','../../../assets/Images/Preferences/sport/aerobik.jpg',
                '../../../assets/Images/Preferences/sport/relaks.jpg','../../../assets/Images/Preferences/sport/rower.jpg',
                '../../../assets/Images/Preferences/sport/spacer.jpg','../../../assets/Images/Preferences/sport/nordic.jpg',
                '../../../assets/Images/Preferences/sport/rolki.jpg','../../../assets/Images/Preferences/sport/bieg.jpg',
                '../../../assets/Images/Preferences/sport/silownia.jpg',
                ]

  cultureImage = ['../../../assets/Images/Preferences/culture/film.jpg','../../../assets/Images/Preferences/culture/gry.jpg',
                  '../../../assets/Images/Preferences/culture/impreza.jpg','../../../assets/Images/Preferences/culture/koncert.jpg',
                  '../../../assets/Images/Preferences/culture/ksiazka.jpg','../../../assets/Images/Preferences/culture/sluchawki.jpg',
                  '../../../assets/Images/Preferences/culture/teatr.jpg',
                  ]

 area = [true, true, true]
 form!: FormGroup;

 constructor(
  public Preferences: PreferencesService, 
  public fb: FormBuilder
) { }

  selectedDetails: number[] = [];
  option1 = 1;
  option2 = 2;
  option3 = 3;
  option4 = 4;
  option5 = 5;
  option6 = 6;
  option7 = 7;
  option8 = 8;
  option9 = 9;
  option10 = 10;
  option11 = 11;
  option12 = 12;
  option13 = 13;
  option14 = 14;
  option15 = 15;
  option16 = 16;
  option17 = 17;
  option18 = 18;
  option19 = 19;
  option20 = 20;
  option21 = 21;
  option22 = 22;

  ngOnInit(): void {
    this.selectedDetails = new Array<number>();

    this.form = this.fb.group({
      Categories : [''],
    })
   
  }

  

  onSubmit() {
    const detailsObserver = {
       next: x => {
         console.log('Details OK');
      },
      error: err => {
         console.log(err);
       }
     };
    
     this.form.patchValue({Categories : this.selectedDetails})
     this.Preferences.details(this.form.value).subscribe(detailsObserver);
   }
  
   getDetailId(e:any, id:number)
   {
     if(e.target.checked)
     {
       this.selectedDetails.push(id);
     }
     else{
       this.selectedDetails = this.selectedDetails.filter(m=>m!=id);
     }
     return this.selectedDetails;
   }
}
