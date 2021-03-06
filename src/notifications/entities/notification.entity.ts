import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    title: string

    @Column({ default: '' })
    description: string

    @Column()
    linkAt: string

    @Column()
    origin: string

    @Column({ nullable: true })
    externalId: string;

    @Column()
    updatedAt: Date
}
