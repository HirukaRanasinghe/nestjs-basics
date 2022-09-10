import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // sql table name will be coffee. always starts with simple case.
export class Coffee{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @JoinTable()
    @ManyToMany(
        type => Flavor,
        flavor => flavor.coffees,
        {
            cascade: true // automatically insert/update records that are not in Flavors table.
        }
    )
    flavors: Flavor[]
    // @Column('json', {nullable: true}) // Flavours should store arrays as JSON and it is optional 
    // flavours: string[];
}