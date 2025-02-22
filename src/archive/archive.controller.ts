import { Roles } from 'src/decorator/roles.decorator';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { diskStorage } from 'multer';
import { ArchiveEntit } from './archive.entity';
import { extname } from 'path';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { CreateArchiveDto } from './dto/create_archive.dto';
import { AuditMiddleware } from 'src/logs/middlware/logs.middleware';
import { JwtAuthGuard } from 'src/AuthGuards/authguard.guard';
import { RolesGuard } from 'src/AuthGuards/RolesGuards.guard';
import { UserType } from 'src/utils/enum';


@Controller('archive')
export class ArchiveController {
  constructor(
    private archiveService: ArchiveService,
  ) {}

  @Get()
  public GetData() {
    return this.archiveService.GetAllData();
  }

  //seach avanced
  @Get('search/advanced')
  advancedSearch(@Query() queryParams: any): Promise<ArchiveEntit[]> {
    return this.archiveService.advancedSearchWithParams(queryParams);
  }

  //seache by keywords
  @Get('search')
  async searchArchives(@Query('query') query: string): Promise<ArchiveEntit[]> {
    return this.archiveService.searchByKeywords(query);
  }

  //code of create
  @Post('/add')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './storages/archives',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(pdf|PDF|docx|DOCX)$/)) {
          return callback(new Error('Only PDF files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async create(
    @Body() formData: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      // Construct archive data from form-data
      const archiveData: CreateArchiveDto = {
        title: formData.title,
        description: formData.description,
        keywords: Array.isArray(formData.keywords)
          ? formData.keywords
          : [formData.keywords],
        date_created: new Date(formData.date_created),
        location: {
          site: formData['location.site'],
          locale: formData['location.locale'],
          armoires: formData['location.armoires'],
          etageres: formData['location.etageres'],
        },
        file_url: file ? `uploads/archives/${file.filename}` : undefined,
        code_barre: formData.code_barre,
        metadata: {
          auteur: formData['metadata.auteur'],
          duree_conservation_ans: parseInt(
            formData['metadata.duree_conservation_ans'],
          ),
        },
        classification: {
          serie: formData['classification.serie'],
          dossier: formData['classification.dossier'],
          sous_dossier: formData['classification.sous_dossier'],
          entite_source: formData['classification.entite_source'],
        },
        access_restriction: formData.access_restriction,
      };

      return await this.archiveService.create(archiveData);
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la création de l'archive: ${error.message}`,
      );
    }
  }
  //end

  //start import code here

  @Post('/import')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'files', maxCount: 10 }],
      {
        storage: diskStorage({
          destination: './uploads/archives',
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
        fileFilter: (req, file, callback) => {
          if (!file.originalname.match(/\.(pdf|PDF|docx|DOCX)$/)) {
            return callback(new Error('Only PDF and DOCX files are allowed!'), false);
          }
          callback(null, true);
        },
        limits: {
          fileSize: 5 * 1024 * 1024, // 5MB per file
        },
      },
    ),
  )
  async importBulk(
    @Body() formData: any,
    @UploadedFiles() files: { files: Express.Multer.File[] },
  ) {
    try {
      // Get the number of archives to create from the form data
      const count = parseInt(formData.count || '0');
      if (count <= 0) {
        throw new BadRequestException('Invalid count of archives to import');
      }

      const uploadedFiles = files?.files || [];
      const archiveDataArray: CreateArchiveDto[] = [];

      // Process each archive from the form data
      for (let i = 0; i < count; i++) {
        const prefix = `archives[${i}]`;
        
        // Find the associated file for this archive if any
        const fileIndex = parseInt(formData[`${prefix}.fileIndex`] || '-1');
        const file = fileIndex >= 0 && fileIndex < uploadedFiles.length 
          ? uploadedFiles[fileIndex] 
          : null;

        const archiveData: CreateArchiveDto = {
          title: formData[`${prefix}.title`],
          description: formData[`${prefix}.description`],
          keywords: this.parseKeywords(formData[`${prefix}.keywords`]),
          date_created: formData[`${prefix}.date_created`] 
            ? new Date(formData[`${prefix}.date_created`])
            : new Date(),
          location: {
            site: formData[`${prefix}.location.site`],
            locale: formData[`${prefix}.location.locale`],
            armoires: formData[`${prefix}.location.armoires`],
            etageres: formData[`${prefix}.location.etageres`],
          },
          file_url: file ? `uploads/archives/${file.filename}` : undefined,
          code_barre: formData[`${prefix}.code_barre`],
          metadata: {
            auteur: formData[`${prefix}.metadata.auteur`],
            duree_conservation_ans: parseInt(
              formData[`${prefix}.metadata.duree_conservation_ans`] || '0',
            ),
          },
          classification: {
            serie: formData[`${prefix}.classification.serie`],
            dossier: formData[`${prefix}.classification.dossier`],
            sous_dossier: formData[`${prefix}.classification.sous_dossier`],
            entite_source: formData[`${prefix}.classification.entite_source`],
          },
          access_restriction: formData[`${prefix}.access_restriction`],
        };

        archiveDataArray.push(archiveData);
      }

      // Call the service to create all archives
      const result = await this.archiveService.createBulk(archiveDataArray);
      return {
        message: `${result.length} archives importées avec succès.`,
        imported: result,
      };
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de l'importation des archives: ${error.message}`,
      );
    }
  }

  //end code of import 

  private parseKeywords(keywordsInput: string | string[]): string[] {
    if (!keywordsInput) return [];
    if (Array.isArray(keywordsInput)) return keywordsInput;
    
    // If it's a comma-separated string
    if (typeof keywordsInput === 'string' && keywordsInput.includes(',')) {
      return keywordsInput.split(',').map(k => k.trim());
    }
    
    // Single keyword as string
    return [keywordsInput];
  }

  //end

  @Get('conservation')
  async getConservationStats() {
    return this.archiveService.getConservationStats();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<ArchiveEntit>,
  ) {
    return await this.archiveService.updateArch(id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(UserType.ADMIN,UserType.NORMAL_USER)
  @UseInterceptors(AuditMiddleware)
  async delete(@Param('id') id: string) {
    return await this.archiveService.DeleteArch(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(UserType.ADMIN,UserType.NORMAL_USER)
  @UseInterceptors(AuditMiddleware)
  async GetCurrentID(@Param('id') id: string) {
    return await this.archiveService.GetCurrentId(id);
  }
}
