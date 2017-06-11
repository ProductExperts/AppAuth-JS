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
// Represents a Node application, that uses the AppAuthJS library.
var authorization_request_1 = require("../authorization_request");
var authorization_request_handler_1 = require("../authorization_request_handler");
var authorization_service_configuration_1 = require("../authorization_service_configuration");
var logger_1 = require("../logger");
var node_request_handler_1 = require("../node_support/node_request_handler");
var node_requestor_1 = require("../node_support/node_requestor");
var token_request_1 = require("../token_request");
var token_request_handler_1 = require("../token_request_handler");
/* the Node.js based HTTP client. */
var requestor = new node_requestor_1.NodeRequestor();
/* an example open id connect provider */
var openIdConnectUrl = 'https://accounts.google.com';
/* example client configuration */
var clientId = '511828570984-dhnshqcpegee66hgnp754dupe8sbas18.apps.googleusercontent.com';
var redirectUri = 'http://localhost:8000';
var scope = 'openid';
// TODO(rahulrav@): Figure out a way to get rid of this
var clientSecret = 'TyBOnDZtguEfaKDHAaZjRP7i';
var App = (function () {
    function App() {
        var _this = this;
        this.notifier = new authorization_request_handler_1.AuthorizationNotifier();
        this.authorizationHandler = new node_request_handler_1.NodeBasedHandler();
        this.tokenHandler = new token_request_handler_1.BaseTokenRequestHandler(requestor);
        // set notifier to deliver responses
        this.authorizationHandler.setAuthorizationNotifier(this.notifier);
        // set a listener to listen for authorization responses
        // make refresh and access token requests.
        this.notifier.setAuthorizationListener(function (request, response, error) {
            logger_1.log('Authorization request complete ', request, response, error);
            if (response) {
                _this.makeRefreshTokenRequest(_this.configuration, response.code)
                    .then(function (result) { return _this.makeAccessTokenRequest(_this.configuration, result.refreshToken); })
                    .then(function () { return logger_1.log('All done.'); });
            }
        });
    }
    App.prototype.fetchServiceConfiguration = function () {
        return authorization_service_configuration_1.AuthorizationServiceConfiguration.fetchFromIssuer(openIdConnectUrl, requestor)
            .then(function (response) {
            logger_1.log('Fetched service configuration', response);
            return response;
        });
    };
    App.prototype.makeAuthorizationRequest = function (configuration) {
        // create a request
        var request = new authorization_request_1.AuthorizationRequest(clientId, redirectUri, scope, authorization_request_1.AuthorizationRequest.RESPONSE_TYPE_CODE, undefined, /* state */ { 'prompt': 'consent', 'access_type': 'offline' });
        logger_1.log('Making authorization request ', configuration, request);
        this.authorizationHandler.performAuthorizationRequest(configuration, request);
    };
    App.prototype.makeRefreshTokenRequest = function (configuration, code) {
        // use the code to make the token request.
        var request = new token_request_1.TokenRequest(clientId, redirectUri, token_request_1.GRANT_TYPE_AUTHORIZATION_CODE, code, undefined, { 'client_secret': clientSecret });
        return this.tokenHandler.performTokenRequest(configuration, request).then(function (response) {
            logger_1.log("Refresh Token is " + response.refreshToken);
            return response;
        });
    };
    App.prototype.makeAccessTokenRequest = function (configuration, refreshToken) {
        var request = new token_request_1.TokenRequest(clientId, redirectUri, token_request_1.GRANT_TYPE_REFRESH_TOKEN, undefined, refreshToken, { 'client_secret': clientSecret });
        return this.tokenHandler.performTokenRequest(configuration, request).then(function (response) {
            logger_1.log("Access Token is " + response.accessToken);
            return response;
        });
    };
    return App;
}());
exports.App = App;
logger_1.log('Application is ready.');
var app = new App();
app.fetchServiceConfiguration()
    .then(function (configuration) {
    app.configuration = configuration;
    app.makeAuthorizationRequest(configuration);
    // notifier makes token requests.
})
    .catch(function (error) {
    logger_1.log('Something bad happened ', error);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9hcHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFFSCxrRUFBa0U7QUFFbEUsa0VBQThEO0FBQzlELGtGQUF1SjtBQUV2Siw4RkFBeUY7QUFDekYsb0NBQThCO0FBQzlCLDZFQUFzRTtBQUN0RSxpRUFBNkQ7QUFDN0Qsa0RBQXVHO0FBQ3ZHLGtFQUFzRjtBQUd0RixvQ0FBb0M7QUFDcEMsSUFBTSxTQUFTLEdBQUcsSUFBSSw4QkFBYSxFQUFFLENBQUM7QUFFdEMseUNBQXlDO0FBQ3pDLElBQU0sZ0JBQWdCLEdBQUcsNkJBQTZCLENBQUM7QUFFdkQsa0NBQWtDO0FBQ2xDLElBQU0sUUFBUSxHQUFHLDBFQUEwRSxDQUFDO0FBQzVGLElBQU0sV0FBVyxHQUFHLHVCQUF1QixDQUFDO0FBQzVDLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQztBQUN2Qix1REFBdUQ7QUFDdkQsSUFBTSxZQUFZLEdBQUcsMEJBQTBCLENBQUM7QUFFaEQ7SUFRRTtRQUFBLGlCQWdCQztRQWZDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxxREFBcUIsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLHVDQUFnQixFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLCtDQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNELG9DQUFvQztRQUNwQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLHVEQUF1RDtRQUN2RCwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxVQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSztZQUM5RCxZQUFHLENBQUMsaUNBQWlDLEVBQUUsT0FBTyxFQUFFLFFB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SSxDQUFDLFVBQUEsYUFBYTtJQUNqQixHQUFHLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNsQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUMsaUNBQWlDO0FBQ25DLENBQUMsQ0FBQztLQUNELEtBQUssQ0FBQyxVQUFBLEtBQUs7SUFDVixZQUFHLENBQUMseUJBQXlCLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLy8gUmVwcmVzZW50cyBhIE5vZGUgYXBwbGljYXRpb24sIHRoYXQgdXNlcyB0aGUgQXBwQXV0aEpTIGxpYnJhcnkuXG5cbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3R9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25Ob3RpZmllciwgQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyLCBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlLCBCVUlMVF9JTl9QQVJBTUVURVJTfSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3JlcXVlc3RfaGFuZGxlcic7XG5pbXBvcnQge0F1dGhvcml6YXRpb25SZXNwb25zZX0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXNwb25zZSc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQge05vZGVCYXNlZEhhbmRsZXJ9IGZyb20gJy4uL25vZGVfc3VwcG9ydC9ub2RlX3JlcXVlc3RfaGFuZGxlcic7XG5pbXBvcnQge05vZGVSZXF1ZXN0b3J9IGZyb20gJy4uL25vZGVfc3VwcG9ydC9ub2RlX3JlcXVlc3Rvcic7XG5pbXBvcnQge0dSQU5UX1RZUEVfQVVUSE9SSVpBVElPTl9DT0RFLCBHUkFOVF9UWVBFX1JFRlJFU0hfVE9LRU4sIFRva2VuUmVxdWVzdH0gZnJvbSAnLi4vdG9rZW5fcmVxdWVzdCc7XG5pbXBvcnQge0Jhc2VUb2tlblJlcXVlc3RIYW5kbGVyLCBUb2tlblJlcXVlc3RIYW5kbGVyfSBmcm9tICcuLi90b2tlbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHtUb2tlbkVycm9yLCBUb2tlblJlc3BvbnNlfSBmcm9tICcuLi90b2tlbl9yZXNwb25zZSc7XG5cbi8qIHRoZSBOb2RlLmpzIGJhc2VkIEhUVFAgY2xpZW50LiAqL1xuY29uc3QgcmVxdWVzdG9yID0gbmV3IE5vZGVSZXF1ZXN0b3IoKTtcblxuLyogYW4gZXhhbXBsZSBvcGVuIGlkIGNvbm5lY3QgcHJvdmlkZXIgKi9cbmNvbnN0IG9wZW5JZENvbm5lY3RVcmwgPSAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tJztcblxuLyogZXhhbXBsZSBjbGllbnQgY29uZmlndXJhdGlvbiAqL1xuY29uc3QgY2xpZW50SWQgPSAnNTExODI4NTcwOTg0LWRobnNocWNwZWdlZTY2aGducDc1NGR1cGU4c2JhczE4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJztcbmNvbnN0IHJlZGlyZWN0VXJpID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMCc7XG5jb25zdCBzY29wZSA9ICdvcGVuaWQnO1xuLy8gVE9ETyhyYWh1bHJhdkApOiBGaWd1cmUgb3V0IGEgd2F5IHRvIGdldCByaWQgb2YgdGhpc1xuY29uc3QgY2xpZW50U2VjcmV0ID0gJ1R5Qk9uRFp0Z3VFZmFLREhBYVpqUlA3aSc7XG5cbmV4cG9ydCBjbGFzcyBBcHAge1xuICBwcml2YXRlIG5vdGlmaWVyOiBBdXRob3JpemF0aW9uTm90aWZpZXI7XG4gIHByaXZhdGUgYXV0aG9yaXphdGlvbkhhbmRsZXI6IEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlcjtcbiAgcHJpdmF0ZSB0b2tlbkhhbmRsZXI6IFRva2VuUmVxdWVzdEhhbmRsZXI7XG5cbiAgLy8gc3RhdGVcbiAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm5vdGlmaWVyID0gbmV3IEF1dGhvcml6YXRpb25Ob3RpZmllcigpO1xuICAgIHRoaXMuYXV0aG9yaXphdGlvbkhhbmRsZXIgPSBuZXcgTm9kZUJhc2VkSGFuZGxlcigpO1xuICAgIHRoaXMudG9rZW5IYW5kbGVyID0gbmV3IEJhc2VUb2tlblJlcXVlc3RIYW5kbGVyKHJlcXVlc3Rvcik7XG4gICAgLy8gc2V0IG5vdGlmaWVyIHRvIGRlbGl2ZXIgcmVzcG9uc2VzXG4gICAgdGhpcy5hdXRob3JpemF0aW9uSGFuZGxlci5zZXRBdXRob3JpemF0aW9uTm90aWZpZXIodGhpcy5ub3RpZmllcik7XG4gICAgLy8gc2V0IGEgbGlzdGVuZXIgdG8gbGlzdGVuIGZvciBhdXRob3JpemF0aW9uIHJlc3BvbnNlc1xuICAgIC8vIG1ha2UgcmVmcmVzaCBhbmQgYWNjZXNzIHRva2VuIHJlcXVlc3RzLlxuICAgIHRoaXMubm90aWZpZXIuc2V0QXV0aG9yaXphdGlvbkxpc3RlbmVyKChyZXF1ZXN0LCByZXNwb25zZSwgZXJyb3IpID0+IHtcbiAgICAgIGxvZygnQXV0aG9yaXphdGlvbiByZXF1ZXN0IGNvbXBsZXRlICcsIHJlcXVlc3QsIHJlc3BvbnNlLCBlcnJvcik7XG4gICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5tYWtlUmVmcmVzaFRva2VuUmVxdWVzdCh0aGlzLmNvbmZpZ3VyYXRpb24hLCByZXNwb25zZS5jb2RlKVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHRoaXMubWFrZUFjY2Vzc1Rva2VuUmVxdWVzdCh0aGlzLmNvbmZpZ3VyYXRpb24hLCByZXN1bHQucmVmcmVzaFRva2VuISkpXG4gICAgICAgICAgICAudGhlbigoKSA9PiBsb2coJ0FsbCBkb25lLicpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZldGNoU2VydmljZUNvbmZpZ3VyYXRpb24oKTogUHJvbWlzZTxBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24+IHtcbiAgICByZXR1cm4gQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLmZldGNoRnJvbUlzc3VlcihvcGVuSWRDb25uZWN0VXJsLCByZXF1ZXN0b3IpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBsb2coJ0ZldGNoZWQgc2VydmljZSBjb25maWd1cmF0aW9uJywgcmVzcG9uc2UpO1xuICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBtYWtlQXV0aG9yaXphdGlvblJlcXVlc3QoY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uKSB7XG4gICAgLy8gY3JlYXRlIGEgcmVxdWVzdFxuICAgIGxldCByZXF1ZXN0ID0gbmV3IEF1dGhvcml6YXRpb25SZXF1ZXN0KFxuICAgICAgICBjbGllbnRJZCwgcmVkaXJlY3RVcmksIHNjb3BlLCBBdXRob3JpemF0aW9uUmVxdWVzdC5SRVNQT05TRV9UWVBFX0NPREUsXG4gICAgICAgIHVuZGVmaW5lZCwgLyogc3RhdGUgKi9cbiAgICAgICAgeydwcm9tcHQnOiAnY29uc2VudCcsICdhY2Nlc3NfdHlwZSc6ICdvZmZsaW5lJ30pO1xuXG4gICAgbG9nKCdNYWtpbmcgYXV0aG9yaXphdGlvbiByZXF1ZXN0ICcsIGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpO1xuICAgIHRoaXMuYXV0aG9yaXphdGlvbkhhbmRsZXIucGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpO1xuICB9XG5cbiAgbWFrZVJlZnJlc2hUb2tlblJlcXVlc3QoY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCBjb2RlOiBzdHJpbmcpIHtcbiAgICAvLyB1c2UgdGhlIGNvZGUgdG8gbWFrZSB0aGUgdG9rZW4gcmVxdWVzdC5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBUb2tlblJlcXVlc3QoXG4gICAgICAgIGNsaWVudElkLCByZWRpcmVjdFVyaSwgR1JBTlRfVFlQRV9BVVRIT1JJWkFUSU9OX0NPREUsIGNvZGUsIHVuZGVmaW5lZCxcbiAgICAgICAgeydjbGllbnRfc2VjcmV0JzogY2xpZW50U2VjcmV0fSk7XG5cbiAgICByZXR1cm4gdGhpcy50b2tlbkhhbmRsZXIucGVyZm9ybVRva2VuUmVxdWVzdChjb25maWd1cmF0aW9uLCByZXF1ZXN0KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIGxvZyhgUmVmcmVzaCBUb2tlbiBpcyAke3Jlc3BvbnNlLnJlZnJlc2hUb2tlbn1gKTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9KTtcbiAgfVxuXG4gIG1ha2VBY2Nlc3NUb2tlblJlcXVlc3QoY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCByZWZyZXNoVG9rZW46IHN0cmluZykge1xuICAgIGxldCByZXF1ZXN0ID0gbmV3IFRva2VuUmVxdWVzdChcbiAgICAgICAgY2xpZW50SWQsIHJlZGlyZWN0VXJpLCBHUkFOVF9UWVBFX1JFRlJFU0hfVE9LRU4sIHVuZGVmaW5lZCwgcmVmcmVzaFRva2VuLFxuICAgICAgICB7J2NsaWVudF9zZWNyZXQnOiBjbGllbnRTZWNyZXR9KTtcblxuICAgIHJldHVybiB0aGlzLnRva2VuSGFuZGxlci5wZXJmb3JtVG9rZW5SZXF1ZXN0KGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgbG9nKGBBY2Nlc3MgVG9rZW4gaXMgJHtyZXNwb25zZS5hY2Nlc3NUb2tlbn1gKTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9KTtcbiAgfVxufVxuXG5sb2coJ0FwcGxpY2F0aW9uIGlzIHJlYWR5LicpO1xuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuXG5hcHAuZmV0Y2hTZXJ2aWNlQ29uZmlndXJhdGlvbigpXG4gICAgLnRoZW4oY29uZmlndXJhdGlvbiA9PiB7XG4gICAgICBhcHAuY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb247XG4gICAgICBhcHAubWFrZUF1dGhvcml6YXRpb25SZXF1ZXN0KGNvbmZpZ3VyYXRpb24pO1xuICAgICAgLy8gbm90aWZpZXIgbWFrZXMgdG9rZW4gcmVxdWVzdHMuXG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgbG9nKCdTb21ldGhpbmcgYmFkIGhhcHBlbmVkICcsIGVycm9yKTtcbiAgICB9KTtcbiJdfQ==