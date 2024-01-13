import { Request, Response } from 'express';
import Users, { users as User, DadosEspeciais } from '../Model/UserModel';

export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, email, senha, dados_especiais } = req.body

    //Verifique se dados foram fornecidos
    if(!nome || !email || !senha){
        res.status(400).json({ Erro: "A senha, email e nome são obrigatórios" })
        return
    }
    if (!dados_especiais) {
      res.status(400).json({ Erro: "Os dados_especiais são obrigatórios" })
      return
    }

    const { cpf, data_nascimento, idade, sexo } = dados_especiais

    const dadosEspeciais: DadosEspeciais = {
      cpf,
      data_nascimento,
      idade,
      sexo,
    }

    const newUser: User = new Users({ nome, email, senha, dados_especiais })

    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({ Erro: "Erro no servidor" })
  }
}
