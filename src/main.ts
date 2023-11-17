import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'

const logger = new Logger()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: true,
    credentials: true
  })
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  await app.listen(port)
  logger.log(`App started at port: ${port}`)
}
bootstrap()
