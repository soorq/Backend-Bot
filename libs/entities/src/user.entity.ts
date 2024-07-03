import { Entity, PrimaryColumn, Column } from 'typeorm';
import { EnumRole } from '@app/entities/lib/enum';

@Entity('user')
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  tg_id: string;

  @Column({type: 'varchar',  enum: EnumRole, default: EnumRole.USER })
  role: EnumRole;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'updated_at' })
  updatedAt: string;
}
