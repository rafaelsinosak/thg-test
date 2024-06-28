import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment';

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({ uri: environment.graphqlEndpoint }),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
