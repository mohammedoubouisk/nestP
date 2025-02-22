import { LogsService } from './../logs.service';
import { AuditAction, AuditLog } from './../logs.entity';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuditMiddleware implements NestInterceptor {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const archiveId = request.params.id;

    // ddetermine the action based on the HTTP method
    let action: AuditAction;
    switch (request.method) {
      case 'GET':
        action = AuditAction.READ;
        break;
      case 'POST':
        action = AuditAction.CREATE;
        break;
      case 'PUT':
      case 'PATCH':
        action = AuditAction.UPDATE;
        break;
      case 'DELETE':
        action = AuditAction.DELETE;
        break;
      default:
        action = AuditAction.OTHER;
    }

    //and here we use tap operator tolog after successful response
    return next.handle().pipe(
      tap(async (data) => {
        if (data) {
          let finalArchiveId;

          switch (action) {
            case AuditAction.DELETE:
              // For delete, use the ID from response if available
              finalArchiveId = data.id ? data.id : archiveId;
              break;

            case AuditAction.CREATE:
              // For create, use the ID from the newly created archive
              finalArchiveId = data.id;
              break;

            case AuditAction.READ:
              // For read, use either the ID from response or request params
              finalArchiveId = data.id;
              break;

            case AuditAction.UPDATE:
              // For update, use either the ID from response or request params
              finalArchiveId = data.id ? data.id : archiveId;
              break;

            default:
              finalArchiveId = archiveId;
          }

          // Only create log if we have a valid archive ID
          if (finalArchiveId) {
            const auditLog = this.auditLogRepository.create({
              user_id: user?.id || null,
              action,
              archive_id: finalArchiveId,
            });

            await this.auditLogRepository.save(auditLog);
          }
        }
      }),
    );
  }
}
