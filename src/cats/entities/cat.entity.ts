import { Breed } from "src/breeds/entities/breed.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne } from "typeorm";

@Entity()
export class Cat {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    name: string;
    
    @Column()
    age: number;

    @DeleteDateColumn()
    deletedAt: Date;

    @CreateDateColumn()
    createAt: Date;

    @ManyToOne(() => Breed, (breed) => breed.id, {
        eager: true // Para traer la raza en caso de un findOne
    })
    breed: Breed;

}
