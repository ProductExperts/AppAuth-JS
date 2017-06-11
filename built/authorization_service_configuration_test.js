"use strict";
/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var authorization_service_configuration_1 = require("./authorization_service_configuration");
var xhr_1 = require("./xhr");
describe('Authorization Service Configuration Tests', function () {
    var authorizationEndpoint = 'authorization://endpoint';
    var tokenEndpoint = 'token://endpoint';
    it('Initialization should work', function () {
        var configuration = new authorization_service_configuration_1.AuthorizationServiceConfiguration(authorizationEndpoint, tokenEndpoint);
        expect(configuration).toBeTruthy();
        expect(configuration.authorizationEndpoint).toBe(authorizationEndpoint);
        expect(configuration.tokenEndpoint).toBe(tokenEndpoint);
    });
    it('Conversion to Json and back should work', function () {
        var configuration = new authorization_service_configuration_1.AuthorizationServiceConfiguration(authorizationEndpoint, tokenEndpoint);
        var json = configuration.toJson();
        var newConfiguration = authorization_service_configuration_1.AuthorizationServiceConfiguration.fromJson(json);
        expect(newConfiguration).toBeTruthy();
        expect(newConfiguration.authorizationEndpoint).toBe(configuration.authorizationEndpoint);
        expect(newConfiguration.tokenEndpoint).toBe(configuration.tokenEndpoint);
    });
    describe('Tests with dependencies', function () {
        it('Fetch from issuer tests should work', function (done) {
            var configuration = new authorization_service_configuration_1.AuthorizationServiceConfiguration(authorizationEndpoint, tokenEndpoint);
            var promise = Promise.resolve(configuration.toJson());
            var requestor = new xhr_1.TestRequestor(promise);
            authorization_service_configuration_1.AuthorizationServiceConfiguration.fetchFromIssuer('some://endpoint', requestor)
                .then(function (result) {
                expect(result).toBeTruthy();
                expect(result.authorizationEndpoint).toBe(configuration.authorizationEndpoint);
                expect(result.tokenEndpoint).toBe(configuration.tokenEndpoint);
                done();
            });
        });
        it('Fetch from issuer tests should work', function (done) {
            var promise = Promise.reject(new Error('Something bad happened.'));
            var requestor = new xhr_1.TestRequestor(promise);
            authorization_service_configuration_1.AuthorizationServiceConfiguration.fetchFromIssuer('some://endpoint', requestor)
                .catch(function (result) {
                expect(result).toBeTruthy();
                var error = result;
                expect(error.message).toBe('Something bad happened.');
                done();
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb25fdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbl90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsNkZBQStIO0FBRS9ILDZCQUFvQztBQUVwQyxRQUFRLENBQUMsMkNBQTJDLEVBQUU7SUFFcEQsSUFBTSxxQkFBcUIsR0FBRywwQkFBMEIsQ0FBQTtJQUN4RCxJQUFNLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQztJQUV6QyxFQUFFLENBQUMsNEJBQTRCLEVBQUU7UUFDL0IsSUFBSSxhQUFhLEdBQUcsSUFBSSx1RUFBaUMsQ0FBQyxxQkFBcUIsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUVoRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHlDQUF5QyxFQUFFO1FBQzVDLElBQUksYUFBYSxHQUFHLElBQUksdUVBQWlDLENBQUMscUJBQXFCLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFaEcsSUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xDLElBQUksZ0JBQWdCLEdBQUcsdUVBQWlDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN6RixNQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzRSxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyx5QkFBeUIsRUFBRTtRQUVsQyxFQUFFLENBQUMscUNBQXFDLEVBQUUsVUFBQyxJQUFZO1lBQ3JELElBQUksYUFBYSxHQUNiLElBQUksdUVBQWlDLENBQUMscUJBQXFCLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDaEYsSUFBSSxPQUFPLEdBQ1AsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLFNBQVMsR0FBRyxJQUFJLG1CQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsdUVBQWlDLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLFNBQVMsQ0FBQztpQkFDMUUsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDVixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQy9FLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxFQUFFLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHFDQUFxQyxFQUFFLFVBQUMsSUFBWTtZQUNyRCxJQUFJLE9BQU8sR0FDUCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztZQUN6RCxJQUFJLFNBQVMsR0FBRyxJQUFJLG1CQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFM0MsdUVBQWlDLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLFNBQVMsQ0FBQztpQkFDMUUsS0FBSyxDQUFDLFVBQUEsTUFBTTtnQkFDWCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzVCLElBQUksS0FBSyxHQUFHLE1BQXNCLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7Z0JBQ3RELElBQUksRUFBRSxDQUFDO1lBQ1QsQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sIEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbkpzb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtBcHBBdXRoRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7VGVzdFJlcXVlc3Rvcn0gZnJvbSAnLi94aHInO1xuXG5kZXNjcmliZSgnQXV0aG9yaXphdGlvbiBTZXJ2aWNlIENvbmZpZ3VyYXRpb24gVGVzdHMnLCAoKSA9PiB7XG5cbiAgY29uc3QgYXV0aG9yaXphdGlvbkVuZHBvaW50ID0gJ2F1dGhvcml6YXRpb246Ly9lbmRwb2ludCdcbiAgY29uc3QgdG9rZW5FbmRwb2ludCA9ICd0b2tlbjovL2VuZHBvaW50JztcblxuICBpdCgnSW5pdGlhbGl6YXRpb24gc2hvdWxkIHdvcmsnLCAoKSA9PiB7XG4gICAgbGV0IGNvbmZpZ3VyYXRpb24gPSBuZXcgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uKGF1dGhvcml6YXRpb25FbmRwb2ludCwgdG9rZW5FbmRwb2ludCk7XG5cbiAgICBleHBlY3QoY29uZmlndXJhdGlvbikudG9CZVRydXRoeSgpO1xuICAgIGV4cGVjdChjb25maWd1cmF0aW9uLmF1dGhvcml6YXRpb25FbmRwb2ludCkudG9CZShhdXRob3JpemF0aW9uRW5kcG9pbnQpO1xuICAgIGV4cGVjdChjb25maWd1cmF0aW9uLnRva2VuRW5kcG9pbnQpLnRvQmUodG9rZW5FbmRwb2ludCk7XG4gIH0pO1xuXG4gIGl0KCdDb252ZXJzaW9uIHRvIEpzb24gYW5kIGJhY2sgc2hvdWxkIHdvcmsnLCAoKSA9PiB7XG4gICAgbGV0IGNvbmZpZ3VyYXRpb24gPSBuZXcgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uKGF1dGhvcml6YXRpb25FbmRwb2ludCwgdG9rZW5FbmRwb2ludCk7XG5cbiAgICBsZXQganNvbiA9IGNvbmZpZ3VyYXRpb24udG9Kc29uKCk7XG4gICAgbGV0IG5ld0NvbmZpZ3VyYXRpb24gPSBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24uZnJvbUpzb24oanNvbik7XG4gICAgZXhwZWN0KG5ld0NvbmZpZ3VyYXRpb24pLnRvQmVUcnV0aHkoKTtcbiAgICBleHBlY3QobmV3Q29uZmlndXJhdGlvbi5hdXRob3JpemF0aW9uRW5kcG9pbnQpLnRvQmUoY29uZmlndXJhdGlvbi5hdXRob3JpemF0aW9uRW5kcG9pbnQpO1xuICAgIGV4cGVjdChuZXdDb25maWd1cmF0aW9uLnRva2VuRW5kcG9pbnQpLnRvQmUoY29uZmlndXJhdGlvbi50b2tlbkVuZHBvaW50KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ1Rlc3RzIHdpdGggZGVwZW5kZW5jaWVzJywgKCkgPT4ge1xuXG4gICAgaXQoJ0ZldGNoIGZyb20gaXNzdWVyIHRlc3RzIHNob3VsZCB3b3JrJywgKGRvbmU6IERvbmVGbikgPT4ge1xuICAgICAgbGV0IGNvbmZpZ3VyYXRpb24gPVxuICAgICAgICAgIG5ldyBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24oYXV0aG9yaXphdGlvbkVuZHBvaW50LCB0b2tlbkVuZHBvaW50KTtcbiAgICAgIGxldCBwcm9taXNlOiBQcm9taXNlPEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbkpzb24+ID1cbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoY29uZmlndXJhdGlvbi50b0pzb24oKSk7XG4gICAgICBsZXQgcmVxdWVzdG9yID0gbmV3IFRlc3RSZXF1ZXN0b3IocHJvbWlzZSk7XG4gICAgICBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24uZmV0Y2hGcm9tSXNzdWVyKCdzb21lOi8vZW5kcG9pbnQnLCByZXF1ZXN0b3IpXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQuYXV0aG9yaXphdGlvbkVuZHBvaW50KS50b0JlKGNvbmZpZ3VyYXRpb24uYXV0aG9yaXphdGlvbkVuZHBvaW50KTtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQudG9rZW5FbmRwb2ludCkudG9CZShjb25maWd1cmF0aW9uLnRva2VuRW5kcG9pbnQpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ0ZldGNoIGZyb20gaXNzdWVyIHRlc3RzIHNob3VsZCB3b3JrJywgKGRvbmU6IERvbmVGbikgPT4ge1xuICAgICAgbGV0IHByb21pc2U6IFByb21pc2U8QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uSnNvbj4gPVxuICAgICAgICAgIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignU29tZXRoaW5nIGJhZCBoYXBwZW5lZC4nKSk7XG4gICAgICBsZXQgcmVxdWVzdG9yID0gbmV3IFRlc3RSZXF1ZXN0b3IocHJvbWlzZSk7XG5cbiAgICAgIEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbi5mZXRjaEZyb21Jc3N1ZXIoJ3NvbWU6Ly9lbmRwb2ludCcsIHJlcXVlc3RvcilcbiAgICAgICAgICAuY2F0Y2gocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGxldCBlcnJvciA9IHJlc3VsdCBhcyBBcHBBdXRoRXJyb3I7XG4gICAgICAgICAgICBleHBlY3QoZXJyb3IubWVzc2FnZSkudG9CZSgnU29tZXRoaW5nIGJhZCBoYXBwZW5lZC4nKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9KTtcbiAgICB9KTtcblxuICB9KTtcblxufSk7XG4iXX0=