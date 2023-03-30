import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ContactDto,
  FriendDto,
  UserUpdateDto,
  UserSaveDto,
  RoleDto,
} from '../models';
import {
  FormUtilsService,
  FormGroupOf,
  ControlsOf,
} from '../shared/services/form-utils.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  id?: string;
  @Input()
  set user(value: UserUpdateDto | UserSaveDto) {
    if (value) {
      this.form.reset(value);
      this.id = (value as UserUpdateDto)?.id;
      if (value instanceof UserUpdateDto) {
        this.form.removeControl('password');
        // this.form.removeControl('passwordConfirmation');
      }
      // v?.friends?.forEach((friend) => this.addFriend(friend));
      value.permissions.forEach((permission) => this.addPermission(permission));
      value.roles.forEach((role) => this.addRole(role));
    }
  }
  @Input()
  roleList: RoleDto[] = [];

  @Output()
  readonly saved = new EventEmitter<UserSaveDto | UserUpdateDto>();

  readonly form: FormGroup<FormGroupOf<Omit<UserSaveDto, 'fullName'>>>;
  // readonly form: FormGroup<ControlsOf<UserSaveDto>>;
  // readonly form: FormGroup<ControlsOf<Omit<UserSaveDto, 'fullName'>>>;

  constructor(
    private readonly fb: FormBuilder,
    private formService: FormUtilsService
  ) {
    this.form = this.fb.group<ControlsOf<Omit<UserSaveDto, 'fullName'>>>({
      firstName: this.formService.makeNonNullableFormControl(''),
      // lastName: this.formService.makeNonNullableFormControl(''),
      password: this.fb.control<string>(''),
      // contact: this.formService.makeNonNullableFormControl(''),
      // friends: this.formService.makeNonNullableFormControl(''),
      // permissions: new FormArray<FormControl<string>>([]), //OK
      permissions: this.fb.control<string[]>([]), //OK

      // roles: new FormArray<FormGroup<FormGroupOf<RoleDto>>>([
      //   this.fb.group({
      //     id: 'abcTest',
      //     name: new FormControl('ABC TEST'),
      //   }),
      // ]), //OK

      //roles: this.fb.array<FormGroup<FormGroupOf<RoleDto>>>([]), //OK
      roles: this.fb.control<string[]>([]), //OK
      // roles:this.formBuilder.array(this.formService.makeNonNullableFormControl(''))
    });
  }

  addPermission(permission?: string) {
    this.form.controls.permissions.push(this.fb.control(permission || ''));
  }

  addFriend(friend?: FriendDto) {
    // this.form.controls.friends.push(
    //   new FormGroup<FormGroupOf<FriendDto>>({
    //     name: new FormControl(friend?.name || ''),
    //   })
    // );
  }

  addRole(role?: RoleDto) {
    this.form.controls.roles.push(
      this.fb.group<FormGroupOf<RoleDto>>({
        id: this.fb.control(role?.id || String(Math.ceil(Math.random() * 100))),
        name: this.fb.control(role?.name || ''),
      })
    );
  }

  save() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.saved.emit(new UserSaveDto(this.form.getRawValue()));
    }
  }
}
