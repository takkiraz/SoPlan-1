import { Component, OnInit } from '@angular/core';
import { Bedroom } from '@entity/bedroom/bedroom.entity';
import { Classroom } from '@entity/classroom/classroom.entity';
import { Event } from '@entity/event/event.entity';
import { Group } from '@entity/group/group.entity';
import { Participant, ParticipantRole } from '@entity/participant/participant.entity';
import { PersonGender } from '@entity/person/person.entity';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /***** Age Chart******/
  public ageChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public ageChartLabels = [];
  public ageChartLegend = true;
  public ageChartData = [];
  /********************/

  /******* Grade Chart *******/
  public gradeChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public gradeChartLabels = [];
  public gradeChartLegend = true;
  public gradeChartData = [];
  /***************************/

  /***** Gender Chart *****/
  public genderChartLabels = [];
  public genderChartData = [];
  /************************/

  /***** Role Chart *****/
  public roleChartLabels = [];
  public roleChartData = [];
  /************************/

  /******CHART TYPES ********/
  public pieChartType: string;
  public lineChartType: string;
  public barChartType: string;
  public doughnutChartType: string;

  /************************* */

  /***Current Event Mangament***/
  public currentEvent: Event = null;
  public showHelp = true;
  /***************************/


  /*STATISTICS FOR DASHBOARD*/
  public stat_num_participants: number = null;
  public stat_num_groups: number = null;
  public stat_num_bedrooms: number = null;
  public stat_num_classrooms: number = null;
  public stat_num_gender_f: number = null;
  public stat_num_gender_m: number = null;
  public stat_num_gender_d: number = null;
  public stat_num_role_s: number = null;
  public stat_num_role_d: number = null;
  public stat_num_role_sd: number = null;
  /**************************/
  /***Verknüpfte Enittäten vom aktuellen Event***/
  public participants: Participant[] = [];
  public groups: Group[] = [];
  public classrooms: Classroom[] = [];
  public bedrooms: Bedroom[] = [];
  /****************************************/

  /***********Data for Charts***********/
  public agearr: number[] = [];
  public gradearr: number[] = [];
  public age_stats = new Object;
  public grade_stats = new Object;
  /*****************************************/

  private initialize_Age(): void {
    this.age_stats = new Object;
    this.grade_stats = new Object;
    this.participants.forEach(participant => {
      const date = new Date();
      const participantDate = participant.person.birthDate.toString();

      const age = date.getFullYear() - new Date(participantDate).getFullYear();

      if (!this.age_stats[age]) {
        this.age_stats[age] = 1;
      } else {
        this.age_stats[age]
          = this.age_stats[age] + 1;
      }
      const grade = participant.grade;
      if (!this.grade_stats[grade]) {
        this.grade_stats[grade] = 1;
      } else {
        this.grade_stats[grade] = this.grade_stats[grade] + 1;
      }
    });

  }
  //

  /***Chart Related Functions */
  public genderChartClicked(e: any): void {
    console.log(e);
  }

  public genderChartHovered(e: any): void {
    console.log(e);
  }

  public roleChartClicked(e: any): void {
    console.log(e);
  }

  public roleChartHovered(e: any): void {
    console.log(e);
  }
  /*********************************** */

  /*STATISTIC METHODS*/

  private initalize_gender_numbers(): void {

    this.stat_num_gender_f = 0;
    this.stat_num_gender_m = 0;
    this.stat_num_gender_d = 0;
    this.stat_num_role_s = 0;
    this.stat_num_role_d = 0;
    this.stat_num_role_sd = 0;

    this.participants.forEach(participant => {
      if (participant.role === ParticipantRole.DOZENT) {
        this.stat_num_role_d++;
      } else
        if (participant.role === ParticipantRole.SCHUELER) {
          this.stat_num_role_s++;
        } else
          if (participant.role === ParticipantRole.SCHUELERDOZENT) {
            this.stat_num_role_sd++;
          }

      if (participant.person.gender === PersonGender.FEMALE) {
        this.stat_num_gender_f++;
      } else
        if (participant.person.gender === PersonGender.MALE) {
          this.stat_num_gender_m++;
        } else
          if (participant.person.gender === PersonGender.DIVERSE) {
            this.stat_num_gender_d++;
          }
    });
  }
  /****************************************************************** */






  constructor(private currentEventService: CurrentEventService, private ipc: IpcRendererService) {
    this.currentEventService.currentEventChanged.subscribe((newEvent: Event) => {
      this.setEvent(newEvent);
    });
    this.setEvent(this.currentEventService.getEvent());

  }

  ngOnInit() {

    /***   Initialize Basic Chart Parameters, that never Change  ***/
    this.ageChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
    };
    this.lineChartType = 'line';
    this.doughnutChartType = 'doughnut';
    this.barChartType = 'bar';
    this.pieChartType = 'pie';
    this.genderChartLabels = ['Female', 'Male', 'Diverse'];
    this.roleChartLabels = ['Schüler', 'Dozent', 'Schülerdozent'];
    /************************************************************* */


  }

  setEvent(ev: Event): void {
    if (ev !== null && ev.id != null) {
      this.currentEvent = ev;
      /******* Nested Get IPC Renderer Methods, so that ShowHelp won't be false before every Chart is initialized ******* */
      this.ipc.get('get/event/participants', { id: this.currentEvent.id }).
        then((result: Participant[]) => {
          this.participants = result;
          this.stat_num_participants = result.length;
          this.initalize_gender_numbers();
          this.initialize_Age();
          this.agearr = [];
          this.gradearr = [];
          this.genderChartData = [this.stat_num_gender_f, this.stat_num_gender_m, this.stat_num_gender_d];
          this.roleChartData = [this.stat_num_role_s, this.stat_num_role_d, this.stat_num_role_sd];
          for (const year of Object.keys(this.age_stats)) {
            this.agearr.push(this.age_stats[year]);
          }

          this.ageChartLabels = Object.keys(this.age_stats);
          this.ageChartLegend = true;
          this.ageChartData = [{
            data: this.agearr, label: 'Age'
          },

          ];

          for (const grade of Object.keys(this.grade_stats)) {
            this.gradearr.push(this.grade_stats[grade]);
          }

          this.gradeChartLabels = Object.keys(this.age_stats);
          this.gradeChartLegend = true;
          this.gradeChartData = [{
            data: this.gradearr, label: 'Grade'
          },
          ];

          this.ipc.get('get/event/groups', { id: this.currentEvent.id }).
            then((resultA: Group[]) => {
              this.groups = resultA;
              this.stat_num_groups = this.groups.length;
              this.ipc.get('get/event/bedrooms', { id: this.currentEvent.id }).
                then((resultB: Bedroom[]) => {
                  this.bedrooms = resultB;
                  this.stat_num_bedrooms = this.bedrooms.length;
                  this.ipc.get('get/event/classrooms', { id: this.currentEvent.id }).
                    then((resultC: Classroom[]) => {
                      this.classrooms = resultC;
                      this.stat_num_classrooms = this.classrooms.length;
                      this.showHelp = false;
                    });
                });
            });


        });
      /**************************** */
    } else {
      this.showHelp = true;

    }
  }
}
