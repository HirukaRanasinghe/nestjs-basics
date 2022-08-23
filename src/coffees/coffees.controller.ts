import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService){}
  @Get('flavours')
  findAll() {
    return this.coffeesService.findAll();
    // return 'This action returns all the coffees';
  }

  // @Get('flavours-with-status')
  // findAllCoffee(@Res() response){
  //   response.status(200).send('This action returns all the coffees');
  // }

  @Get(':id')
  findOne(@Param('id') id: string): Coffee | HttpException{
    return this.coffeesService.findOne(id);
    //return `This action returns #${id} coffee.`;
  }

  @Post('new-coffee')
  create(@Body() createCoffeDto: CreateCoffeeDto){
    return this.coffeesService.create(createCoffeDto);
    //return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto): Coffee{
    return this.coffeesService.update(id, updateCoffeeDto);
    // return `This action updates #${id} cofee`;
  }

  @Put(':id')
  updateByPut(@Param('id') id: string, @Body() body): string{
    return `This action Updates #${id} coffee via PUT`;
  }
  
  @Delete(':id')
  deleteCoffee(@Param('id') id: string): void{
    return this.coffeesService.remove(id);
    // return `This action deletes #${id} coffee`;
  }

  // @Post('new-with-status')
  // @HttpCode(HttpStatus.GONE) // This gives code 410.
  // createCoffee(@Body() body){
  //   return body;
  // }
  
  @Get()
  findAllCoffee(@Query() query): string{
    const {limit, offset} = query;
    return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
  }

}
