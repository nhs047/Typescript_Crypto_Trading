import { BaseModelVm } from "src/shared/base.model";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { EnumToArray } from "src/shared/utilities/enum-to-array";
import { UserRole } from "../user-role.enum";

export class UserVm extends BaseModelVm {
    @ApiModelProperty() username: string;
    @ApiModelPropertyOptional() firstName?: string;
    @ApiModelPropertyOptional() lastName?: string;
    @ApiModelPropertyOptional() fullName?: string;
    @ApiModelPropertyOptional({enum: EnumToArray(UserRole)}) 
    role?: UserRole;
}