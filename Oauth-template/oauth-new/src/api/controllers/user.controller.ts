import { Request, Response } from "express";
import { logIn } from "../../services/user.service";

export const loginUser = async (rq: Request, rs: Response) => {
    try {
        const {email, name} = rq.params;
        const data = await logIn(name, email);
        rs.cookie()
    } catch (error) {
        
    }
}