// import { CurrentUserReq } from './decorators/current-user.decorator';
// import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { RegisterDto } from './dto/register.dto';
// import { LoginDto } from './dto/login.dto';
// import { AuthGuard } from './guards/auth.guard';
// import { JwtPayloadType } from 'src/utils/types';

// import { roles } from './decorators/user-role.decorator';
// import { UserType } from 'src/utils/enum';
// import { AuthRoleGuard } from './guards/auth-roles.guard';

// @Controller('api/users')
// export class UsersController {
//     constructor(private readonly usersService:UsersService,
// ){}



//    @Get()
//     @roles(UserType.ADMIN) // we specified that we need just admin  @roles(UserType.admin);
//    @UseGuards(AuthRoleGuard)    
//      public AllUsers(){
//         return this.usersService.GetAllUsers()  ;     
//      }

//      @Get(':id')
//      @UseGuards(AuthGuard)
//      public GetCurrentUser(@Param("id", ParseIntPipe) id:number , @CurrentUserReq() payloas: JwtPayloadType){
//         if (id !== payloas.id) {
//             throw new ForbiddenException("the id used in param not exist in mysql");
//         }
//       return this.usersService.CurrentUser(payloas.id)
//      }

//      @Post('/register')
//      public register(@Body() registerdto:RegisterDto){
//          return this.usersService.register(registerdto)
//      }


//      @Post('/login')
//      @HttpCode(HttpStatus.OK)
//      public login(@Body() loginDto:LoginDto){
//          return this.usersService.login(loginDto)
//      }


//      @Delete(':id')
//      @roles(UserType.ADMIN, UserType.NORMAL_USER)
//      @UseGuards(AuthRoleGuard)
//      public  Dlt(@Param('id', ParseIntPipe) id: number,
//      @CurrentUserReq() payload: JwtPayloadType){
//         return this.usersService.deleteUser(id, payload);
//      }
     
// }
