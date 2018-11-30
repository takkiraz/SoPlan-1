import { Component, OnInit } from '@angular/core';
import { Room, RoomSchema } from '@entity/_room/room.entity';
import { Classroom, ClassroomSchema } from '@entity/classroom/classroom.entity';
import { Event, EventSchema } from '@entity/event/event.entity';
import { Group, GroupSchema } from '@entity/group/group.entity';
import { SmartTableConfig } from '@models/componentInput.class';

@Component({
  selector: 'app-group-liste',
  templateUrl: './group-liste.component.html',
  styleUrls: ['./group-liste.component.scss']
})
export class GroupListeComponent implements OnInit {
  public st_config: SmartTableConfig = {
    settings: {
      header: 'Group',
      showCreateButton: true,
      createButtonText: 'Neue Bedroom'
    },
    slotUrls: {
      getUrl: 'get/group/all',
      postUrl: 'post/group',
      deleteUrl: 'delete/group',
      editorUrl: '/logged/event/group/editor/0/'
    },
    instanceMap: {
      '': new Group(),
      'event': new Event(),
      'classroom': new Classroom(),
      'room': new Room()
    },
    memberList: [
      {
        prefix: '',
        schema: GroupSchema,
        members: ['name', 'capacity']
      },
      {
        prefix: 'event@',
        schema: EventSchema,
        members: ['name'],
        extendedSettings: {
          name: {
            editable: false
          }
        }
      },
      {
        prefix: 'classroom@',
        schema: ClassroomSchema,
        members: ['identifier'],
        extendedSettings: {
          identifier: {
            editable: false
          }
        }
      }, {
        prefix: 'classroom@room@',
        schema: RoomSchema,
        members: ['floor', 'corridor', 'number', 'name'],
        extendedSettings: {
          floor: {
            editable: false
          },
          corridor: {
            editable: false
          },
          number: {
            editable: false
          },
          name: {
            editable: false
          }
        }
      }
    ]
  };
  constructor() { }

  ngOnInit() {
  }

}