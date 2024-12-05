import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AddBlockItemDto, BlockListDto, BlockListQueryDto } from './dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BlockListService {

	constructor(
		private readonly db: DbService
	) {}

	create(userId: number) {
		return this.db.blockList.create({
			data: {ownerId: userId}
		})
	}

	getByUserId(userId: number, query: BlockListQueryDto) {
		return this.db.blockList.findUniqueOrThrow({
			where: { ownerId: userId },
			include: {
				items: {
					where: { data: { contains: query.q, mode: 'insensitive' } },
					orderBy: { createdAt: 'desc' }
				}
			}
		})
	}

	async addItem(userId, data: AddBlockItemDto) {
		
		const blockList = await this.db.blockList.findUniqueOrThrow({
			where: { ownerId: userId }
		})

		return this.db.blockItem.create({
			data: { blockListId: blockList.id, ...data }
		})
	}

	async removeItem(userId: number, itemId: number) {
		const blockList = await this.db.blockList.findUniqueOrThrow({
			where: { ownerId: userId }
		})

		const blockItemExsist = await this.db.blockItem.findUnique({ where: { 
			blockListId: blockList.id,
			id: itemId
		}})
		 
		if (!blockItemExsist) {
			throw new BadRequestException("BlockItem is not exsist")
		}

		return this.db.blockItem.delete({ where: { 
			blockListId: blockList.id,
			id: itemId
		 } })
	}

}
