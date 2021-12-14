import { type } from "os";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from './flavor.entity';

@Entity() // Sql table === 'nestjs' // @Entity('drink')
export class Nest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    description: string;

    @Column()
    brand: string;

    @Column({default: 0})
    recommendations: number;
 
    @JoinTable()
    @ManyToMany(
        type => Flavor, 
        flavor => flavor.nest, 
        {
            cascade: true, //['insert']
        })
    flavors: Flavor[];

    
}