import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @IsPositive()
    offset: number;
}

// how to explicitly convert 
    // @IsOptional()
    // @IsPositive()
    // @Type(()=> Number) //parsed into Number because queryParams are sent as strings.
    // limit: number;