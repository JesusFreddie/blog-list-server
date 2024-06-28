import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const _PORT = 3000;
	const app = await NestFactory.create(AppModule);

	var config = new DocumentBuilder()
		.setTitle("Api Blog-List")
		.setVersion("1.0")
		.build();

	var document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document)
  
	app.use(cookieParser())

  await app.listen(_PORT, () => {
		console.log(`Server started on port ${_PORT}`);
	});
}
bootstrap();