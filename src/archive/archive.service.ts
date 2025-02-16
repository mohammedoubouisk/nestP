import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArchiveEntit } from './archive.entity'; // Ensure correct path
import { CreateArchiveDto } from './dto/create_archive.dto';

@Injectable()
export class ArchiveService {
    constructor(
      @InjectRepository(ArchiveEntit) 
      private readonly archiveRepository: Repository<ArchiveEntit>,
    ) {}


    async GetAllData(){
        return await this.archiveRepository.find()
    }
    
    // search by id 
    async GetCurrentId(id: string){
        const arche = await this.archiveRepository.findOne({where:{id}})
        if(!arche){
            return new BadRequestException("archive of this user not found")
        }
        return arche
    }


    //end
  
    // dans ici update Data ooo
    async updateArch(id: string, updateData: Partial<ArchiveEntit>): Promise<{ id: string; message: string }> {
        // Vérifie si l'archive existe
        const archive = await this.archiveRepository.findOne({ where: { id } });
        if (!archive) {
          throw new NotFoundException(`Archive avec l'ID ${id} non trouvée.`);
        }
    
        await this.archiveRepository.update(id, updateData);
    
        return { id, message: 'Archive mise à jour avec succès.' };
      }
    //end
    async create(archiveData: Partial<ArchiveEntit>): Promise<{id:string, message:string}> {
        const archive = this.archiveRepository.create(archiveData);
        await this.archiveRepository.save(archive);
        return {id:archive.id, message: "Archive créée avec succès."}
      }



      //delete l'archive
      async DeleteArch(id:string):Promise<{id:string, message:string}>{
        const datas = await this.archiveRepository.findOne({where:{id}})
        if(!datas)
            throw new NotFoundException(`Archive avec l'ID ${id} non trouvée.`)
        const archiveId = datas.id;
        await this.archiveRepository.remove(datas)
        return {id:archiveId, message: "Archive supprimée avec succès."}
        
      }

      //end

      //search by keywords
      async searchByKeywords(keywords: string): Promise<ArchiveEntit[]> {
        return this.archiveRepository
          .createQueryBuilder('archives')
          .where('archives.keywords LIKE :keyword', { keyword: `%${keywords}%` })
          .getMany();
      }
      //end


      // start code of search advanced

      async advancedSearchWithParams(queryParams: any): Promise<ArchiveEntit[]> {
        const queryBuilder = this.archiveRepository.createQueryBuilder('archive');
        let hasCondition = false;
    
        // Handle simple fields
        if (queryParams.title) {
          queryBuilder.andWhere('archive.title LIKE :title', { title: `%${queryParams.title}%` });
          hasCondition = true;
        }
        
        if (queryParams.description) {
          queryBuilder.andWhere('archive.description LIKE :description', 
            { description: `%${queryParams.description}%` });
          hasCondition = true;
        }
        
        if (queryParams.keywords) {
          const keywords = Array.isArray(queryParams.keywords) 
            ? queryParams.keywords 
            : queryParams.keywords.split(',').map(k => k.trim());
          
          keywords.forEach((keyword, index) => {
            queryBuilder.andWhere(`archive.keywords LIKE :keyword${index}`, 
              { [`keyword${index}`]: `%${keyword}%` });
          });
          hasCondition = true;
        }
        
        if (queryParams.date_created) {
          queryBuilder.andWhere('archive.date_created = :date_created', 
            { date_created: queryParams.date_created });
          hasCondition = true;
        }
        
        if (queryParams.code_barre) {
          queryBuilder.andWhere('archive.code_barre = :code_barre', 
            { code_barre: queryParams.code_barre });
          hasCondition = true;
        }
        
        if (queryParams.access_restriction) {
          queryBuilder.andWhere('archive.access_restriction = :access_restriction', 
            { access_restriction: queryParams.access_restriction });
          hasCondition = true;
        }
        
        // Handle nested fields with bracket notation: location[site], classification[serie], etc.
        
        // Handle location fields
        for (const key in queryParams) {
          if (key.startsWith('location[') && key.endsWith(']')) {
            const field = key.substring(9, key.length - 1);
            queryBuilder.andWhere(`JSON_EXTRACT(archive.location, '$.${field}') LIKE :${key.replace(/\[|\]/g, '_')}`, 
              { [key.replace(/\[|\]/g, '_')]: `%${queryParams[key]}%` });
            hasCondition = true;
          }
        }
        
        // Handle classification fields

        //the role of this /\[|\]/g is to replace any [or ] with _
        for (const key in queryParams) {
          if (key.startsWith('classification[') && key.endsWith(']')) {
            const field = key.substring(15, key.length - 1);
            queryBuilder.andWhere(`JSON_EXTRACT(archive.classification, '$.${field}') LIKE :${key.replace(/\[|\]/g, '_')}`, 
              { [key.replace(/\[|\]/g, '_')]: `%${queryParams[key]}%` });
            hasCondition = true;
          }
        }
        
        // Handle metadata fields
        for (const key in queryParams) {
          if (key.startsWith('metadata[') && key.endsWith(']')) {
            const field = key.substring(9, key.length - 1);
            if (field === 'duree_conservation_ans') {
              queryBuilder.andWhere(`JSON_EXTRACT(archive.metadata, '$.${field}') = :${key.replace(/\[|\]/g, '_')}`, 
                { [key.replace(/\[|\]/g, '_')]: queryParams[key] });
            } else {
              queryBuilder.andWhere(`JSON_EXTRACT(archive.metadata, '$.${field}') LIKE :${key.replace(/\[|\]/g, '_')}`, 
                { [key.replace(/\[|\]/g, '_')]: `%${queryParams[key]}%` });
            }
            hasCondition = true;
          }
        }
        
        // If no conditions were added, return all records
        if (!hasCondition) {
          return this.archiveRepository.find();
        }
        
        return queryBuilder.getMany();
      }

  }