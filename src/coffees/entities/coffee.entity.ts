import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // sql table name will be coffee. always starts with simple case.
export class Coffee{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column('json', {nullable: true}) // Flavours should store arrays as JSON and it is optional 
    flavours: string[];
}