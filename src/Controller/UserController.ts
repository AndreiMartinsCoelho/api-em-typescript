import { Request, Response } from 'express';
import Users, { users as User, DadosEspeciais } from '../Model/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const SECRET_KEY = process.env.SECRET_KEY || "api"

//Função para cadastrar um novo usuario...
export const cadastro = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, email, senha, confirmSenha, cpf, dados_especiais } = req.body
        const userExist = await Users.findOne({cpf, email, nome})
        //Verifique se dados foram fornecidos
        if (!nome || !email || !senha || !cpf) {
            res.status(400).json({ Erro: "A Senha, Email, CPF e Nome são obrigatórios!"})
            return
        }
        else if (!dados_especiais) {
            res.status(400).json({ Erro: "Data de Nascimento, Idade e Sexo são dados obrigatórios!"})
            return
        }
        else if(senha !== confirmSenha){
            res.status(400).json({ Erro: "As senhas estão diferentes!"})
            return
        }
        else if(userExist){
            console.log(userExist)
            res.status(400).json({ Erro: "Email, Cpf ou Nome já estão cadastrados!"})
            return
        }

        const { data_nascimento, idade, sexo } = dados_especiais

        const dadosEspeciais: DadosEspeciais = {
            data_nascimento,
            idade,
            sexo,
        }

        const newUser: User = new Users({ nome, email, senha, cpf, dados_especiais })

        const savedUser = await newUser.save()
        res.status(201).json({Msg:"Registrado com sucesso!", savedUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({ Erro: "Erro no servidor!"})
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const {cpf, senha} = req.body

        const user = await Users.findOne({cpf})

        if(!user){
            res.status(401).json({ Erro:"CPF informado está errado!"})
            return
        }
        
        const senhaValida = await bcrypt.compare(senha, user.senha)

        if (!senhaValida) {
            res.status(401).json({ Erro:"Senha informado está errada!"})
            return
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: '28800000' }) //Token expirando em 8h...
        res.status(200).json({ Msg: "Login feito com exito!", user, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({Erro: "Erro no servidor!"})
    }
}
