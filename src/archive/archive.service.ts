import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArchiveEntit } from './archive.entity'; // Ensure correct path
import { CreateArchiveDto } from './dto/create_archive.dto';
import * as fs from 'fs';
import * as path from 'path';

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
        const archive = await this.archiveRepository.findOne({ where: { id } });
        if (!archive) {
          throw new NotFoundException(`Archive avec l'ID ${id} non trouvée.`);
        }
    
        await this.archiveRepository.update(id, updateData);
    
        return { id, message: 'Archive mise à jour avec succès.' };
      }
    //end

    //code of create 
    async create(archiveData: CreateArchiveDto): Promise<{ id: string; message: string }> {
        try {

          this.validateArchiveData(archiveData);

          const archive = this.archiveRepository.create({
            ...archiveData,
            created_at: new Date(),
            updated_at: new Date()
          });

    
          const savedArchive = await this.archiveRepository.save(archive);
    
          return {
            id: savedArchive.id,
            message: "Archive créée avec succès."
          };

        } catch (error) {
          // If save fails and we have a file, clean it up
          // fs.unlinkSync( this remove file the specified path.
          if (archiveData.file_url) {
            try {
              fs.unlinkSync(archiveData.file_url);
            } catch (unlinkError) {
              console.error('Error removing file:', unlinkError);
            }
          }
    
          throw new BadRequestException(
            `Erreur lors de la création de l'archive: ${error.message}`
          );
        }
      }
    

    //import bulk

    
    async createBulk(archivesData: CreateArchiveDto[]): Promise<ArchiveEntit[]> {
      // Create transaction for bulk operation
      const queryRunner = this.archiveRepository.manager.connection.createQueryRunner();
      await queryRunner.connect(); //connect to db
      await queryRunner.startTransaction();//It allows you to execute multiple database operations within a single transaction, ensuring that they either all succeed or all fail together. and also if there is eror , undoing from any changes make during transactions

      const createdArchives: ArchiveEntit[] = [];
      const filesToDelete: string[] = []; //this one remove files in storage if operations failed 
      
      try {
        for (const archiveData of archivesData) {
          // Validate each archive data
          this.validateArchiveData(archiveData);
          
          // Track file URL for cleanup in case of failure
          if (archiveData.file_url) {
            filesToDelete.push(archiveData.file_url);
          }
          
          // Create archive entity
          const archive = this.archiveRepository.create({
            ...archiveData,
            created_at: new Date(),
            updated_at: new Date(),
          });
          //role of manager is By using queryRunner.manager, all save operations are grouped under the same transaction, allowing for proper rollback if needed.
          const savedArchive = await queryRunner.manager.save(archive);
          createdArchives.push(savedArchive);
        }
        
        // Commit transaction if all archives were saved successfully
        await queryRunner.commitTransaction();
        return createdArchives;
        
      } catch (error) {
        // Rollback transaction in case of error
        await queryRunner.rollbackTransaction();
        
        // Clean up uploaded files if transaction failed
        this.cleanupFiles(filesToDelete);
        
        throw new BadRequestException(
          `Erreur lors de la création d'archives en masse: ${error.message}`
        );
      } finally {
        // Release query runner
        await queryRunner.release();
      }
    }
    
    private validateArchiveData(data: CreateArchiveDto): void {
      if (!data.title || data.title.trim() === '') {
        throw new BadRequestException('Le titre est obligatoire et ne peut pas être vide.');
      }
    
      if (data.description && data.description.trim() === '') {
        throw new BadRequestException("La description ne peut pas être vide si elle est fournie.");
      }
    
      if (!Array.isArray(data.keywords) || data.keywords.some(keyword => typeof keyword !== 'string')) {
        throw new BadRequestException("Les mots-clés doivent être un tableau de chaînes de caractères.");
      }
    
      if (data.date_created && !(data.date_created instanceof Date)) {
        throw new BadRequestException("La date de création doit être une instance de Date valide.");
      }
    
      if (!data.location || 
          !data.location.site || 
          !data.location.locale || 
          !data.location.armoires || 
          !data.location.etageres) {
        throw new BadRequestException("L'emplacement doit inclure les champs 'site', 'locale', 'armoires' et 'etageres'.");
      }
    
      if (data.file_url && typeof data.file_url !== 'string') {
        throw new BadRequestException("L'URL du fichier doit être une chaîne de caractères valide.");
      }
    
      if (!data.code_barre || data.code_barre.trim() === '') {
        throw new BadRequestException("Le code-barres est obligatoire et ne peut pas être vide.");
      }
    
      if (!data.metadata || 
          !data.metadata.auteur || 
          typeof data.metadata.duree_conservation_ans !== 'number' || 
          data.metadata.duree_conservation_ans <= 0) {
        throw new BadRequestException("Les métadonnées doivent inclure 'auteur' (chaîne de caractères) et 'duree_conservation_ans' (nombre positif).");
      }
    
      if (!data.classification || 
          !data.classification.serie || 
          !data.classification.dossier || 
          !data.classification.sous_dossier || 
          !data.classification.entite_source) {
        throw new BadRequestException("La classification doit inclure les champs 'serie', 'dossier', 'sous_dossier' et 'entite_source'.");
      }
    
      const allowedAccessRestrictions = ['public', 'restreint', 'confidentiel'];

      // Normalize the input value (trim whitespace and convert to lowercase)
      const normalizedAccessRestriction = data.access_restriction.trim().toLowerCase();

      // Check if the normalized value is allowed
      if (!allowedAccessRestrictions.includes(normalizedAccessRestriction)) {
        throw new BadRequestException(
          `La restriction d'accès doit être l'une des valeurs suivantes: ${allowedAccessRestrictions.join(', ')}.`
        );
      }
    }
    

    private cleanupFiles(filePaths: string[]): void {
      for (const path of filePaths) {
        try {
          if (fs.existsSync(path)) { // check if existe file 
            fs.unlinkSync(path);    // remove path
          }
        } catch (error) {
          console.error(`Error removing file ${path}:`, error);
        }
      }
    }
  
    
  
    //end code of import
    

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
        
       
        for (const key in queryParams) {
          if (key.startsWith('location[') && key.endsWith(']')) {
            const field = key.substring(9, key.length - 1);
            queryBuilder.andWhere(`JSON_EXTRACT(archive.location, '$.${field}') LIKE :${key.replace(/\[|\]/g, '_')}`, 
              { [key.replace(/\[|\]/g, '_')]: `%${queryParams[key]}%` });
            hasCondition = true;
          }
        }
        


 
        //handle classification
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


      //retourne des statistique sur la conservation des archives 
      async getConservationStats() {
        const archivesData = await this.archiveRepository
          .createQueryBuilder('archive')
          .select('archive.metadata')
          .getMany();
    
        const stats = {
          archives_par_duree: {
            '5_ans': 0,
            '10_ans': 0,
            'permanent': 0
          }
        };

    
        archivesData.forEach(archive => {
          const duree = archive.metadata.duree_conservation_ans;
          
          if (duree >= 1 && duree <= 5) {
            stats.archives_par_duree['5_ans']++;
          } else if (duree > 5 && duree <= 10) {
            stats.archives_par_duree['10_ans']++;
          } else if (duree === -1 || duree > 10) {
            // Assuming -1 or any value > 10 indicates permanent conservation
            stats.archives_par_duree['permanent']++;
          }
        });
    
        return stats;
      }



  }