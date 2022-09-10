import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService){}
  @Get('flavours')
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery);
    // return 'This action returns all the coffees';
  }

  // @Get('flavours-with-status')
  // findAllCoffee(@Res() response){
  //   response.status(200).send('This action returns all the coffees');
  // }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.coffeesService.findOne(id);
    //return `This action returns #${id} coffee.`;
  }

  @Post('new-coffee')
  create(@Body() createCoffeDto: CreateCoffeeDto){
    console.log(createCoffeDto instanceof CreateCoffeeDto); // Displays false.
    return this.coffeesService.create(createCoffeDto);
    //return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto){
    return this.coffeesService.update(id, updateCoffeeDto);
    // return `This action updates #${id} cofee`;
  }

  @Put(':id')
  updateByPut(@Param('id') id: string, @Body() body): string{
    return `This action Updates #${id} coffee via PUT`;
  }
  
  @Delete(':id')
  deleteCoffee(@Param('id') id: string){
    return this.coffeesService.remove(id);
    // return `This action deletes #${id} coffee`;
  }

  // @Post('new-with-status')
  // @HttpCode(HttpStatus.GONE) // This gives code 410.
  // createCoffee(@Body() body){
  //   return body;
  // }
  
  @Get()
  findAllCoffee(@Query() paginationQuery: PaginationQueryDto){
    const {limit, offset} = paginationQuery;
    return this.coffeesService.findAll(paginationQuery); 
    // return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
  }

}
