import { Component, OnInit } from '@angular/core';
import { Communication, CommunicationSchema } from '@entity/_communication/communicaton.entity';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { Person, PersonSchema } from '@entity/person/person.entity';
import { SmartTableConfig } from '@models/componentInput.class';

@Component({
  selector: 'app-person-liste',
  templateUrl: './person-liste.component.html',
  styleUrls: ['./person-liste.component.scss']
})
export class PersonListeComponent implements OnInit {

  public st_config: SmartTableConfig = {
    settings: {
      header: 'Personenliste',
      showCreateButton: true,
      createButtonText: 'Neue Person'
    },
    slotUrls: {
      getUrl: 'get/person/all',
      postUrl: 'post/person',
      deleteUrl: 'delete/person',
      editorUrl: '/logged/person/editor/'
    },
    instanceMap: {
      '': new Person(),
      'location': new Location(),
      'communication': new Communication()
    },
    memberList: [
      {
        prefix: '',
        schema: PersonSchema,
        members: [
          'firstname',
          'surname',
          'gender',
          'birthDate'
        ],
        extendedSettings: {
          gender: {
            width: '10px'
          }
        }
      },
      {
        prefix: 'location@',
        schema: LocationSchema,
        members: ['city']
      },
      {
        prefix: 'communication@',
        schema: CommunicationSchema,
        members: ['mail']
      },
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
