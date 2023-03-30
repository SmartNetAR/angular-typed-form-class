import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RoleDto, UserDto, UserSaveDto, UserUpdateDto } from './models';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly newUser$ = of(
    <UserSaveDto>new UserSaveDto({
      firstName: 'New',
      // lastName: 'User',
      password: '',
      // passwordConfirmation: '',
      // contact: { email: 'john@doe.com' },
      // friends: [],
      roles: [],
      roles2: [],
      permissions: ['one', 'two'],
    })
  );

  readonly newUser2$ = of(<UserSaveDto>new UserSaveDto());

  readonly user$ = of(
    <UserUpdateDto>new UserUpdateDto({
      id: '123',
      firstName: 'John',
      // lastName: 'Doe',
      // contact: { email: 'john@doe.com' },
      // friends: [{ name: 'Jane Doe' }],
      roles: [
        new RoleDto({ id: '123', name: 'admin' }),
        new RoleDto({ id: '345', name: 'operator' }),
      ],
      roles2: [
        new RoleDto({ id: '123', name: 'admin' }),
        new RoleDto({ id: '345', name: 'operator' }),
      ],
      permissions: ['create', 'update', 'delete'],
    })
  ).pipe(delay(300));

  readonly roles$ = of(<RoleDto[]>[
    new RoleDto({ id: '123', name: 'admin' }),
    new RoleDto({ id: '345', name: 'operator' }),
    new RoleDto({ id: '679', name: 'basics' }),
  ]);

  userSaved(user: UserDto) {
    alert('Saving user:\n\n' + JSON.stringify(user));
  }
}
