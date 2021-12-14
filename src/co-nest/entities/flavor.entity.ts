import { Nest } from './nest.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { type } from 'os';

@Entity('flavors')
export class Flavor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Nest, nest => nest.flavors)
    nest: Nest[];
}
