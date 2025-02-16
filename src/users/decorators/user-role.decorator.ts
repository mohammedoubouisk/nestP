import { SetMetadata } from "@nestjs/common";
import { UserType } from "src/utils/enum";

export const roles = (...roles:UserType[])=>SetMetadata('roles',roles)

// role of this are to store UserType [admin, normal_user] = roles