import { AuditLog} from './logs.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntit } from 'src/userdoc/userdoc.entity';

@Injectable()
export class LogsService {
    
    constructor(
        @InjectRepository(AuditLog) 
        private readonly auditLogRepository : Repository<AuditLog>){}

    async GetLogsAll(){
        return await this.auditLogRepository.find()
    }
}