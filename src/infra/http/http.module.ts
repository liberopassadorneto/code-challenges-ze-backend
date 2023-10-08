import { Module } from '@nestjs/common';

@Module({
  imports: [
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   sortSchema: true,
    //   playground: false,
    //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
    // }),
  ],
})
export class HttpModule {}
