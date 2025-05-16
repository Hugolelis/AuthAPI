// types
import { AccessLevel } from "../types/AcessLevel";

export interface RootGiveAcessForm {
    emailUser: string;
    acessUser: AccessLevel;
    passwordRoot: string;
    confirmPasswordRoot: string;
}