import { IUser } from 'src/interfaces/user.interface';
import { BaseEntity, Column, Entity } from 'typeorm';
import { ROLES } from '../../enums/roles.enum';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;
}
