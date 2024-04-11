import { IsNotEmpty, IsString } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity';
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsString()
  @IsNotEmpty({ message: "name can't be empty" })
  name: string;

  @IsString()
  @IsNotEmpty({ message: "description can't be empty" })
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @ManyToOne(() => Project, (project) => project)
  project: Project;
}
