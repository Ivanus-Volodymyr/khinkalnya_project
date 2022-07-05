import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma.service';
import { TokenPair, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async saveToken(token, id: number): Promise<TokenPair> {
    return this.prismaService.tokenPair.create({
      data: {
        access_token: token.access,
        refresh_token: token.refresh,
        authorId: id,
      },
    });
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };

    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'ACCESS',
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(payload, {
        secret: 'REFRESH',
        expiresIn: '20d',
      }),
    ]);

    const tokenPair = await this.saveToken({ access, refresh }, user.id);

    return {
      user,
      tokenPair,
    };
  }

  async deleteTokenPair(id: number) {
    return this.prismaService.tokenPair.delete({ where: { authorId: id } });
  }

  async getTokenPairByUserId(id: number): Promise<TokenPair> {
    return this.prismaService.tokenPair.findUnique({ where: { authorId: id } });
  }

  public verifyToken(token, tokenType = 'ACCESS') {
    let secret = 'ACCESS';

    if (tokenType === 'REFRESH') {
      secret = 'REFRESH';
    }
    if (tokenType === 'ACTION') {
      secret = 'ACTION';
    }
    return this.jwtService.verify(token, { secret: secret });
  }
}
