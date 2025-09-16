import type { ReactNode } from "react";


export interface ISideBarItem {
    title:string;
    items:{
 title: string;
    url: string;
    Component: ReactNode;
    }
   
}

export interface IResponse <T>{
 statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ErrorSource{
  path: string;
  message: string;
}
type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};
export interface IErrorResponse{
  statusCode: number;
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
 err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}

export type TRole = "DRIVER" | "ADMIN" | "RIDER";