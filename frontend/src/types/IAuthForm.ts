export interface ILoginForm {
    id: string;
}

export interface ICheckForm {
    id: string;
    mylike: number[];
    mytown: number[];
    townName: string;
    townId: number;
}

export interface IRegisterForm {
    id: string;
    town: string;
}