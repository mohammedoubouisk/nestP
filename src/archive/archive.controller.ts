import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ArchiveService } from './archive.service';

import { ArchiveEntit } from './archive.entity';

@Controller('archive')
export class ArchiveController {
    constructor(
        private readonly archiveService : ArchiveService
    ){}


    @Get()
    public GetData(){
        return this.archiveService.GetAllData()
    }

    @Get('search/advanced')
  advancedSearch(@Query() queryParams: any): Promise<ArchiveEntit[]> {
    return this.archiveService.advancedSearchWithParams(queryParams);
  }


    @Get('search')
    async searchArchives(@Query('query') query: string): Promise<ArchiveEntit[]> {
      return this.archiveService.searchByKeywords(query);
    }

    @Post('/add')
     async create(@Body() archiveData: Partial<ArchiveEntit>){
    return this.archiveService.create(archiveData);
    }

    @Put(":id")
    async update(@Param("id") id:string, @Body() updateData:Partial<ArchiveEntit>){
        return await this.archiveService.updateArch(id,updateData)
    }
    @Delete(':id')
    async delete(@Param("id") id:string){
        return await this.archiveService.DeleteArch(id)
    }

    @Get(':id')
    async GetCurrentID(@Param('id') id: string) {
        return await this.archiveService.GetCurrentId(id); 
    }
    

}
