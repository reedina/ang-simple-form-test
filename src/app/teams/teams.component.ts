import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { Team } from './team';
import { TeamsService } from './teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teamForm: FormGroup;
  team:  Team = new Team();
  resp: any;
  constructor(private fb: FormBuilder, private teamService: TeamsService) { }

  ngOnInit() {
    this.teamForm = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3)]]
      });
  }

  save(): void {
    if (this.teamForm.dirty && this.teamForm.valid) {
      console.log('Saved: ' + JSON.stringify(this.teamForm.value))
      let t = Object.assign({}, this.team, this.teamForm.value);
      this.teamService.saveTeam(t)
        .subscribe(
           (r) => {console.log(`saved teh form officially: ${r.name}`);
            this.resp = r.name;}
        );
    }  else {
        console.log("FORM NOT DIRTY and VALID")
    }

}


}
