import { } from "class-validator";
import { EntityRepository, Repository } from "typeorm";
import { Cliente } from "../models/Cliente";

@EntityRepository(Cliente)
class ClienteRepository extends Repository<Cliente>{
    existeEmail(email: string) {
        return this.findOne({pessoaFisica:{pessoa:{email : email}}});
    }
    async buscaPor(pesquisa: string, atributo: string) {
        if (atributo === "nome") {
               return this.createQueryBuilder("cliente")
               .leftJoinAndSelect("cliente.pessoaFisica", "pessoaFisica")
               .leftJoinAndSelect("pessoaFisica.pessoa","pessoa")
                .where("pessoaFisica.nome like :nome", { nome: `%${pesquisa}%` })
                .getMany();
        } else if (atributo === "email") {
            return this.createQueryBuilder("cliente")
               .leftJoinAndSelect("cliente.pessoaFisica", "pessoaFisica")
               .leftJoinAndSelect("pessoaFisica.pessoa","pessoa")
                .where("pessoa.email like :email", { email: `%${pesquisa}%` })
                .getMany();
        } else if (atributo === "cpf") {
            return this.createQueryBuilder("cliente")
               .leftJoinAndSelect("cliente.pessoaFisica", "pessoaFisica")
               .leftJoinAndSelect("pessoaFisica.pessoa","pessoa")
                .where("pessoaFisica.cpf like :cpf", { cpf: `%${pesquisa}%` })
                .getMany();
        }
    }
    async buscaPorId(id: string){
        return this.findOne({id : id});
    }

}
export { ClienteRepository };