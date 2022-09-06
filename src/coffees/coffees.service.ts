import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>
    ){}

    findAll(){
        return this.coffeeRepository.find({
            relations: ['flavors']
        });
    }

    async findOne(id: string){
        const coffee = await this.coffeeRepository.findOne({
            where: {id: +id}, 
            relations: ['flavors']
        });
        
        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found.`);
        }
        return coffee;
    
    }

    create(createCoffeeDto: CreateCoffeeDto){
        const coffee = this.coffeeRepository.create(createCoffeeDto);
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto){
        const coffee= await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto
        });
        if(!coffee){
            // Update
            return new NotFoundException(`Coffee ${id} not found.`) ;
        }
        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string){ // first, find the one, then remove.
        const coffee = await this.findOne(id); // find
        return this.coffeeRepository.remove(coffee);
    }
    
    
}

// This private coffees: Coffee[] is not needed after @InjectRepository() because it connects with datasource and no need 
    // to maintain mock data. 
    // So need to change below methods too.
    // private coffees: Coffee[] = [
    //     {
    //         id: 1,
    //         name: 'Shipwreck Roast',
    //         brand:'Buddy Brew',
    //         flavours: ['chocolate', 'vanilla']
    //     }
    // ];

    // findAll(){
    //     return this.coffees;
    // }

    // findOne(id: string){
    //     const coffee = this.coffees.find(item => item.id === +id); // +id == toInt(id)
    //     if(!coffee){
    //         throw new NotFoundException(`Coffee #${id} not found.`);
    //         //throw new HttpException(`Coffee #${id} not found.`, HttpStatus.NOT_FOUND);
    //     }
    //     return coffee;
    
    // }

    // create(createCoffeeDto: any){
    //     this.coffees.push(createCoffeeDto);
    // }

    // update(id: string, updateCoffeeDto: any){
    //     const existingCoffee= this.findOne(id);
    //     if(existingCoffee){
    //         // Update
    //         return existingCoffee;
    //     }
    // }

    // remove(id: string){
    //     const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
    //     if(coffeeIndex >=0){
    //         this.coffees.splice(coffeeIndex,1);
    //     }
    // }