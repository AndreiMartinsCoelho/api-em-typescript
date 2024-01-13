import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const hash = 10;

export interface DadosEspeciais {
  cpf: string
  data_nascimento: Date
  idade: number
  sexo: string
}

export interface users extends Document {
  nome: string
  email: string
  senha: string
  dados_especiais: DadosEspeciais
}

const DadosEspeciaisSchema: Schema = new Schema(
  {
    cpf: { type: String, required: true },
    data_nascimento: { type: Date, required: true },
    idade: { type: Number, required: true },
    sexo: { type: String, required: true }
  },
  { _id: false }
)

const UsersSchema: Schema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  dados_especiais: { type: DadosEspeciaisSchema, required: true },
}, { versionKey: false })

UsersSchema.pre<users>('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.senha, hash)
    this.senha = hashedPassword
    next()
  } catch (error) {
    next()
  }
})

//Remove a SENHA na resposta da API
UsersSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.senha
  return userObject
}

export default mongoose.model<users>('users', UsersSchema)
