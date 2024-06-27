import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const _PORT = 3000;

	var config = new DocumentBuilder()
		.setTitle("Api Blog-List")
		.setVersion("1.0")
		.build();

	var document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document)
  
  await app.listen(_PORT, () => {
		console.log(`Server started on port ${_PORT}`);
	});
}
bootstrap();
