import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/@core/infra/database/prisma.service';
import { User, UserEntity } from '../entities/users.entity';
import { users } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prismaClient: PrismaService) {}

  /**
   * Create a resgister of email in DB
   * @date 02/06/2023 - 08:20:55 AM
   *
   * @public
   * @async
   * @param {User} user
   * @param {Promise<emails>}
   */
  public async createUser(user: User): Promise<users> {
    try {
      const props = new UserEntity(user).props();

      console.log(props);

      const data = this.prismaClient.users.create({
        data: {
          code: props.code,
          name: props.name,
          email: props.email,
          password: props.password,
          movies_like: props.movies_like,
          created_at: props.created_at,
        },
      });

      return data;
    } catch (err) {
      throw new Error(`Error in 'createEmail' function : ${err}`);
    }
  }

  // /**
  //  * Get Many emails from BD
  //  * @date 02/06/2023 - 08:20:55 AM
  //  *
  //  * @public
  //  * @async
  //  * @constant {pag} number
  //  * @constant {qtd} number
  //  * @constant {withDeletedItems} boolean
  //  * @constant {search} string
  //  * @returns {Promise<emails>}
  //  */
  // public async getEmails(
  //   pag: number,
  //   qtd: number,
  //   withDeletedItems: boolean,
  //   search: string,
  // ): Promise<emails[]> {
  //   try {
  //     const getPage = (pag - 1 < 0 ? 0 : pag - 1) * qtd;
  //     if (withDeletedItems) {
  //       return await this.prismaClient.emails.findMany({
  //         skip: getPage,
  //         take: qtd,
  //         where: { eml_email: { contains: search, mode: 'insensitive' } },
  //       });
  //     } else {
  //       return await this.prismaClient.emails.findMany({
  //         skip: getPage,
  //         take: qtd,
  //         where: {
  //           eml_deleted_at: null,
  //           eml_email: { contains: search, mode: 'insensitive' },
  //         },
  //       });
  //     }
  //   } catch (err) {
  //     throw new Error(`Error in 'getEmails' function : ${err}`);
  //   }
  // }

  // /**
  //  * Get one Email from BD
  //  * @date 02/06/2023 - 08:20:55 AM
  //  *
  //  * @public
  //  * @async
  //  * @param {string} id
  //  * @returns {Promise<emails>}
  //  */
  // public async getOneEmail(id: string): Promise<emails> {
  //   try {
  //     const result = await this.prismaClient.emails.findFirst({
  //       where: { eml_id: id, eml_deleted_at: null },
  //     });
  //     if (!result) {
  //       return null;
  //     }

  //     return result;
  //   } catch (err) {
  //     throw new Error(`Error in 'getOneEmail' function : ${err}`);
  //   }
  // }

  // /**
  //  * Count all Emails from DB
  //  * @date 02/06/2023 - 08:20:55 AM
  //  *
  //  * @public
  //  * @async
  //  * @param {boolean} withDeletedItems
  //  * @param {string} search
  //  * @returns {Promise<number>}
  //  */
  // public async countEmails(
  //   withDeletedItems: boolean,
  //   search: string,
  // ): Promise<number> {
  //   try {
  //     if (withDeletedItems) {
  //       return await this.prismaClient.emails.count({
  //         where: { eml_email: { contains: search, mode: 'insensitive' } },
  //       });
  //     } else {
  //       return await this.prismaClient.emails.count({
  //         where: {
  //           eml_deleted_at: null,
  //           eml_email: { contains: search, mode: 'insensitive' },
  //         },
  //       });
  //     }
  //   } catch (err) {
  //     throw new Error(`Error in 'countEmails' function : ${err}`);
  //   }
  // }

  // /**
  //  * Update Emails in DB
  //  * @date 02/06/2023 - 08:20:55 AM
  //  *
  //  * @public
  //  * @async
  //  * @param {string} id
  //  * @param {Email} email
  //  * @returns {Promise<emails>}
  //  */
  // public async updateEmail(id: string, email: Email): Promise<emails> {
  //   try {
  //     const data = await this.prismaClient.emails.update({
  //       where: { eml_id: id },
  //       data: {
  //         eml_id: email.id,
  //         eml_nome: email.nome,
  //         eml_cod_fontes: email.cod_fontes,
  //         eml_email: email.email,
  //         eml_sector: email.sector,
  //         eml_is_active: email.is_active,
  //         eml_updeted_at: new Date(),
  //       },
  //     });
  //     return data;
  //   } catch (err) {
  //     throw new Error(`Error in 'updateEmail' function : ${err}`);
  //   }
  // }

  // /**
  //  * Remove Email from DB
  //  * @date 02/06/2023 - 08:20:55 AM
  //  *
  //  * @public
  //  * @async
  //  * @param {string} id
  //  * @returns {Promise<emails>}
  //  */
  // public async removeEmail(id: string): Promise<emails> {
  //   try {
  //     return await this.prismaClient.emails.update({
  //       where: { eml_id: id },
  //       data: { eml_deleted_at: new Date() },
  //     });
  //   } catch (err) {
  //     throw new Error(`Error in 'removeEmail' function : ${err}`);
  //   }
  // }

  // public async getEmalsToSend(): Promise<emails[]> {
  //   try {
  //     return await this.prismaClient.emails.findMany({
  //       where: { eml_deleted_at: null },
  //     });
  //   } catch (err) {
  //     throw new Error(`Error in 'getEmalsToSend' function : ${err}`);
  //   }
  // }
}
