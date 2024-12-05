import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AddBlockItemDto, BlockItemDto, BlockListDto, BlockListQueryDto } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';
import { BlockListService } from './block-list.service';

@Controller('block-list')
@UseGuards(AuthGuard)
export class BlockListController {

	constructor(
		private readonly blockListService: BlockListService
	) {}

	@Get()
	@ApiOkResponse({
		type: BlockListDto
	})
	getList(
		@Query() query: BlockListQueryDto, 
		@SessionInfo() session: GetSessionInfoDto
	) {
		return this.blockListService.getByUserId(session.id, query);
	}

	@Post('item')
	@ApiCreatedResponse({
		type: BlockItemDto
	})
	addBlockListItem(
		@Body() body: AddBlockItemDto,
		@SessionInfo() session: GetSessionInfoDto
	) {
		return this.blockListService.addItem(session.id, body);
	}

	@Delete('item/:id')
	@ApiBadRequestResponse({
		description: "BlockItem is not exsist"
	})
	@ApiOkResponse({
		type: BlockItemDto
	})
	async removeBlockItem(
		@Param('id', ParseIntPipe) id: number,
		@SessionInfo() session: GetSessionInfoDto
	) {
		try {
			return await this.blockListService.removeItem(session.id, id);
		} catch(err) {
			if (err instanceof BadRequestException) {
				throw new BadRequestException("BlockItem is not exsist")
			}
		}
	}

}
