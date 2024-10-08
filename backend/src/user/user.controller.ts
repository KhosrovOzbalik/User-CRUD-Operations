import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    Query,
} from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
        try {
            const newUser = await this.userService.createUser(createUserDto);
            return response.status(HttpStatus.CREATED).json({
                message: "User has been created successfully",
                newUser,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: "Error: User not created!",
                error: "Bad Request",
            });
        }
    }
    @Put("/:id")
    async updateUser(
        @Res() response,
        @Param("id") userId: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        try {
            const existingUser = await this.userService.updateUser(
                userId,
                updateUserDto
            );
            return response.status(HttpStatus.OK).json({
                message: "User has been successfully updated",
                existingUser,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    @Get()
    async getUsers(@Res() response) {
        try {
            const userData = await this.userService.getAllUsers();
            return response.status(HttpStatus.OK).json({
                message: "All users data found successfully",
                userData,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get("/search")
    async getUsersByNameAndSurname(
        @Res() response,
        @Query("name") name: string,
        @Query("surname") surname: string
    ) {
        try {
            const users = await this.userService.findUsersByNameAndSurname(
                name,
                surname
            );
            return response.status(HttpStatus.OK).json({
                message: "Users found successfully",
                users,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: "Error: Users not found!",
                error: "Bad Request",
            });
        }
    }

    @Get("/:id")
    async getUser(@Res() response, @Param("id") userId: string) {
        try {
            const existingUser = await this.userService.getUser(userId);
            return response.status(HttpStatus.OK).json({
                message: "User found successfully",
                existingUser,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete("/:id")
    async deleteUser(@Res() response, @Param("id") userId: string) {
        try {
            const deletedUser = await this.userService.deleteUser(userId);
            return response.status(HttpStatus.OK).json({
                message: "User deleted successfully",
                deletedUser,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
