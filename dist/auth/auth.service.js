"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const roles_enum_1 = require("../enum/roles.enum");
const response_template_1 = require("../util/response-template");
let AuthService = exports.AuthService = class AuthService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.prisma = new client_1.PrismaClient();
    }
    async signUp(userSignup) {
        try {
            let { email, pass_word, full_name, birth_day, gender, phone } = userSignup;
            let checkEmail = await this.prisma.users.findFirst({
                where: {
                    email,
                }
            });
            if (checkEmail) {
                throw new common_1.BadRequestException((0, response_template_1.responseObject)(400, "Request is invalid", "Email already existed!"));
            }
            else {
                let newUser = {
                    email,
                    pass_word: bcrypt.hashSync(pass_word, 10),
                    full_name,
                    birth_day,
                    gender,
                    user_role: roles_enum_1.Roles.USER,
                    phone,
                };
                await this.prisma.users.create({
                    data: newUser,
                });
                return (0, response_template_1.responseObject)(200, "Signup successfully!", newUser);
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async login(userLogin) {
        try {
            const { email, pass_word } = userLogin;
            let checkUser = await this.prisma.users.findFirst({
                where: {
                    email,
                },
            });
            if (checkUser) {
                if (bcrypt.compareSync(pass_word, checkUser.pass_word)) {
                    checkUser = { ...checkUser, pass_word: '' };
                    let tokenGenerate = await this.jwtService.signAsync({ user_id: Number(checkUser.user_id), user_role: checkUser.user_role }, { secret: this.configService.get('KEY'), expiresIn: '60m' });
                    return (0, response_template_1.responseObject)(200, "Login successfully!", { userLogin: checkUser, token: tokenGenerate });
                }
                else {
                    throw new common_1.BadRequestException((0, response_template_1.responseObject)(400, "Request is invalid", "Password is incorrect!"));
                }
            }
            else {
                throw new common_1.BadRequestException((0, response_template_1.responseObject)(400, "Request is invalid", "Email or password is incorrect!"));
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map